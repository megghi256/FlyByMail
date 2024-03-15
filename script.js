document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners after the DOM has loaded
    document.getElementById('generate-email').addEventListener('click', function() {
        generateEmail();
    });
});

// Function to generate a random email address and update the DOM
function generateEmail() {
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(email => {
            // Update the email address in the HTML
            document.getElementById('email-address').textContent = email;
            // Now fetch the inbox for the new email
            getInbox(email);
        })
        .catch(error => console.error('Error:', error));
}

// Function to get inbox messages for the generated email
function getInbox(email) {
    fetch(`http://localhost:3000/messagebox/${email}`)
        .then(response => response.json())
        .then(messages => {
            const messagesList = document.getElementById('messages-list');
            // Clear the messages list
            messagesList.innerHTML = '';
            // Iterate over each message and append it to the list
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = `From: ${message.from} - Subject: ${message.subject}`;
                messagesList.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Error:', error));
}
