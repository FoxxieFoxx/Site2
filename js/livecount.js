document.addEventListener('DOMContentLoaded', () => {
    const socket = new WebSocket('wss://server-foxxie.replit.app');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        try {
            console.log('Received message:', event.data);
            const data = JSON.parse(event.data);
            if (data && typeof data.count === 'number') {
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

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    function updateCounter(newCount) {
        const counterElement = document.getElementById('userCount');
        const currentText = counterElement.textContent;
        const newText = `Live Users: ${newCount}`;
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
    }
});