document.addEventListener('DOMContentLoaded', () => {
    let socket;
    let reconnectInterval = 1000; // Time between reconnection attempts (in milliseconds)
    let heartbeatInterval = 30000; // Time between heartbeat messages (in milliseconds)
    let pingInterval;
    let pongTimeout;

    function connectWebSocket() {
        socket = new WebSocket('wss://websocket.foxxie.space/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
            startHeartbeat();
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);

                if (data.type === 'pong') {
                    console.log('Pong received');
                    clearTimeout(pongTimeout); // Clear the pong timeout on receiving pong
                } else if (data.count !== undefined) {
                    updateCounter(data.count);
                } else {
                    console.error('Invalid message format:', data);
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
            // Attempt to reconnect
            setTimeout(connectWebSocket, reconnectInterval);
        };
    }

    function startHeartbeat() {
        pingInterval = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: "heartbeat" }));
                console.log('Ping Sent');
                pongTimeout = setTimeout(() => {
                    console.error('No pong response, closing connection');
                    socket.close(); // Close the connection if no pong received
                }, heartbeatInterval);
            }
        }, heartbeatInterval);
    }

    function stopHeartbeat() {
        clearInterval(pingInterval);
        clearTimeout(pongTimeout);
    }

    function updateCounter(newCount) {
        const counterElement = document.getElementById('userCount');
        if (counterElement) {
            const currentText = counterElement.textContent;
            const newText = `Live Listeners: ${newCount}`;
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

    connectWebSocket();
});
