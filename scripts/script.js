document.addEventListener('DOMContentLoaded', () => {
    const tapImage = document.getElementById('tapImage');
    const balanceDisplay = document.getElementById('balance');
    
    // Replace user ID retrieval for testing (hardcoded or through URL if in production)
    const userId = 'someUserId'; // Replace with dynamic ID retrieval if testing live

    // Fetch initial balance
    fetch(`/api/balance?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            balanceDisplay.textContent = `Balance: ${data.balance} coins`;
        });

    // Tap action
    tapImage.addEventListener('click', () => {
        fetch(`/api/tap?user_id=${userId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                balanceDisplay.textContent = `Balance: ${data.newBalance} coins`;
            })
            .catch(error => console.error('Error with tapping action:', error));
    });
});
