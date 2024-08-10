    document.addEventListener('DOMContentLoaded', () => {
        const socket = new WebSocket('wss://server-foxxie.replit.app');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            try {
                // Log raw message for debugging
                console.log('Received message:', event.data);

                // Parse the message
                const data = JSON.parse(event.data);

                // Check if data has the count property
                if (data && typeof data.count === 'number') {
                    // Update UI
                    document.getElementById('userCount').textContent = `Live Users: ${data.count}`;
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

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    });