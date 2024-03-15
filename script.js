document.addEventListener('DOMContentLoaded', function () {
    const generateEmailButton = document.getElementById('generate-email');
    const refreshInboxButton = document.getElementById('refresh-inbox');
    const emailDisplay = document.getElementById('email-address');
    const messagesList = document.getElementById('messages-list');

    generateEmailButton.addEventListener('click', generateEmail);
    refreshInboxButton.addEventListener('click', function() {
        const currentEmail = emailDisplay.textContent;
        if (currentEmail && currentEmail !== 'No email generated yet.') {
            getInbox(currentEmail);
        } else {
            alert("Please generate an email address first.");
        }
    });
});

function generateEmail() {
    // Notice the endpoint now points to your own server
    fetch('/generate-email')
        .then(response => response.json())
        .then(data => {
            const email = data.email;
            document.getElementById('email-address').textContent = email;
            // Optionally, you could automatically refresh the inbox here
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to generate a new email. Please try again.');
        });
}

function getInbox(email) {
    // Notice the endpoint now points to your own server
    fetch(`/proxy-messagebox/${email}`)
        .then(response => response.json())
        .then(data => {
            messagesList.innerHTML = ''; // Clear the current messages
            if (data.messages && data.messages.length > 0) {
                data.messages.forEach(message => {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message';
                    messageDiv.innerHTML = `<strong>From:</strong> ${message.from}<br>
                                            <strong>Subject:</strong> ${message.subject}<br>
                                            <p>${message.body}</p>`;
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
