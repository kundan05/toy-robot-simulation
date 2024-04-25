document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const executeButton = document.getElementById('executeButton');
    const outputDiv = document.getElementById('output');

    executeButton.addEventListener('click', () => {
        const command = commandInput.value.trim();
        if (command) {
            sendCommand(command);
            commandInput.value = '';
        }
    });

    function sendCommand(command) {
        fetch('/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        })
        .then(response => response.json())
        .then(data => {
            outputDiv.innerText = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
