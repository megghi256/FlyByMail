// Function to generate a random email address
function generateEmail() {
    fetch('https://tempmailapi--vikashkhati.repl.co/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Display the email in the HTML
        })
        .catch(error => console.error('Error:', error));
}

// Function to get inbox messages
function getInbox(email) {
    fetch("https://tempmailapi--vikashkhati.repl.co/messagebox/${email}")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Display the messages in the HTML
        })
        .catch(error => console.error('Error:', error));
}

// Call these functions when appropriate (e.g., on button click)