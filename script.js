document.addEventListener('DOMContentLoaded', function () {
    // Get elements from the DOM
    const generateEmailButton = document.getElementById('generate-email');
    const refreshInboxButton = document.getElementById('refresh-inbox');
    const emailAddressDisplay = document.getElementById('email-address');
    const messagesList = document.getElementById('messages-list');
    
    // Event listener to generate a new email
    generateEmailButton.addEventListener('click', function() {
        generateEmail();
    });

    // Event listener to refresh inbox for the current email
    refreshInboxButton.addEventListener('click', function() {
        const currentEmail = emailAddressDisplay.textContent;
        if (currentEmail.includes('@')) {
            getInbox(currentEmail);
        }
    });

    function generateEmail() {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(email => {
                emailAddressDisplay.textContent = email; // Display the email
                getInbox(email); // Fetch the inbox for the new email
            })
            .catch(error => console.error('Error:', error));
    }

    function getInbox(email) {
        fetch(`http://localhost:3000/messagebox/${email}`)
            .then(response => response.json())
            .then(messages => {
                messagesList.innerHTML = ''; // Clear previous messages
                if (messages.length === 0) {
                    messagesList.innerHTML = '<p>Your inbox is empty.</p>';
                } else {
                    messages.forEach(message => {
                        const messageDiv = document.createElement('div');
                        messageDiv.className = 'message';
                        messageDiv.innerHTML = `
                            <h3>${message.subject}</h3>
                            <p>From: ${message.from}</p>
                            <p>Date: ${new Date(message.date).toLocaleString()}</p>
                            <p>${message.body}</p>
                        `;
                        messagesList.appendChild(messageDiv);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });
