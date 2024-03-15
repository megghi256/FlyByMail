document.addEventListener('DOMContentLoaded', function () {
    const generateEmailButton = document.getElementById('generate-email');
    const refreshInboxButton = document.getElementById('refresh-inbox');
    const emailDisplay = document.getElementById('email-address');
    const messagesList = document.getElementById('messages-list');

    generateEmailButton.addEventListener('click', generateEmail);
    refreshInboxButton.addEventListener('click', function() {
        const currentEmail = emailDisplay.textContent;
        // Make sure the placeholder text isn't treated as an email
        if (currentEmail && currentEmail !== 'No email generated yet.') {
            getInbox(currentEmail);
        } else {
            alert("Please generate an email address first.");
        }
    });
});

function generateEmail() {
    fetch('http://localhost:5500/')
        .then(response => response.json())
        .then(email => {
            document.getElementById('email-address').textContent = email;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to generate a new email. Please try again.');
        });
}

function getInbox(email) {
    fetch(`http://localhost:5500/messagebox/${email}`)
        .then(response => response.json())
        .then(messages => {
            messagesList.innerHTML = ''; // Clear the current messages
            if (messages.length > 0) {
                messages.forEach(message => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message';
                    messageDiv.innerHTML = `
                        <strong>From:</strong> ${message.from}<br>
                        <strong>Subject:</strong> ${message.subject}<br>
                        <p>${message.body}</p>
                    `;
                    messagesList.appendChild(messageDiv);
                });
            } else {
                messagesList.innerHTML = '<p>No new messages.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to refresh inbox. Please try again.');
        });
}
