document.addEventListener('DOMContentLoaded', () => {
    let socket;
    let reconnectInterval = 1000; // Time between reconnection attempts (in milliseconds)
    let heartbeatInterval = 30000; // Time between heartbeat messages (in milliseconds)
    let pingInterval;
    let pongTimeout;

    let username = '';
    let currentListeners = 0; // Track the number of live listeners

    // Prompt for the username
    function askForUsername() {
        username = prompt("Enter your username:");
        if (!username) {
            username = 'Anonymous'; // Default to 'Anonymous' if no username is provided
        }
        console.log(`Username set to: ${username}`);
    }

    function connectWebSocket() {
        socket = new WebSocket('wss://websocket.foxxie.space/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
            startHeartbeat();
            // Send the username to the server after connecting
            socket.send(JSON.stringify({ type: 'setUsername', username }));
            // Increment live listeners count
            currentListeners++;
            updateCounter(currentListeners);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);

                if (data.type === 'pong') {
                    console.log('Pong received');
                    clearTimeout(pongTimeout); // Clear the pong timeout on receiving pong
                } else if (data.count !== undefined) {
                    // If the count is received, update it
                    currentListeners = data.count;
                    updateCounter(currentListeners);
                } else {
                    console.log('Message received:', data);
                    displayMessage(data);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed', event.reason);
            stopHeartbeat();
            // Decrement the listener count by 1 when the connection closes
            currentListeners = Math.max(0, currentListeners - 1);  // Ensure the count doesn't go negative
            updateCounter(currentListeners);
            // Attempt to reconnect
            setTimeout(connectWebSocket, reconnectInterval);
        };
    }

    function startHeartbeat() {
        pingInterval = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: "heartbeat" }));
                console.log('Ping Sent');
                clearTimeout(pongTimeout); // Clear the previous timeout before setting a new one
                pongTimeout = setTimeout(() => {
                    console.log('No pong received in time, closing connection');
                    socket.close();
                }, heartbeatInterval);
            }
        }, heartbeatInterval);
    }

    function stopHeartbeat() {
        clearInterval(pingInterval);
        clearTimeout(pongTimeout);
    }

    function updateCounter(newCount) {
        const finalCount = Math.max(0, newCount);  // Ensure count doesn't go negative
        const counterElement = document.getElementById('userCount');
        if (counterElement) {
            const newText = `Live Listeners: ${finalCount}`;
            let index = 0;

            function updateText() {
                if (index < newText.length) {
                    counterElement.textContent = newText.substring(0, index + 1);
                    index++;
                    setTimeout(updateText, 50); // Adjust speed of the letter-by-letter update here
                } else {
                    counterElement.textContent = newText; // Ensure complete text is set
                }
            }

            updateText();
        } else {
            console.error('Counter element not found');
        }
    }

    // Send a message through the WebSocket connection
    function sendMessage(message) {
        if (socket.readyState === WebSocket.OPEN) {
            const messageData = {
                type: 'chat',
                message: message
            };

            socket.send(JSON.stringify(messageData));
            console.log('Message sent:', message);
        } else {
            console.error('WebSocket is not open, cannot send message');
        }
    }

    // Display incoming messages
    function displayMessage(data) {
        console.log(`${data.username}: ${data.message}`);
        // You can implement this function to display the message in your UI
    }

    // Handle sending messages when the user presses the Enter key
    connectWebSocket();
});
