document.addEventListener('DOMContentLoaded', () => {
    const tapForm = document.getElementById('tapForm');
    const balanceDisplay = document.getElementById('balance');

    // Get user ID from URL
    const userId = new URLSearchParams(window.location.search).get('user_id');

    // Fetch balance on load
    fetch(`/api/balance?user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            balanceDisplay.textContent = `Balance: ${data.balance} coins`;
        });

    tapForm.addEventListener('submit', (event) => {
        event.preventDefault();
        fetch(`/api/tap?user_id=${userId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                balanceDisplay.textContent = `Balance: ${data.newBalance} coins`;
            });
    });
});
