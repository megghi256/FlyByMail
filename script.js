const express = require('express');
const app = express();
const port = 5500; // Specify the port here

app.get('/generate-email', (req, res) => {
    // Your route logic here
});

app.listen(port, () => console.log(`Server running on port ${port}`));

function generateEmail() {
    fetch('http://localhost:3000/generate-email')
        .then(response => response.json())
        .then(data => {
            document.getElementById('email-address').textContent = data.email;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to generate a new email. Please try again.');
        });
}

function getInbox(email) {
    fetch(`http://localhost:3000/proxy-messagebox/${email}`)
        .then(response => response.json())
        .then(data => {
            // Update your DOM based on the response
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to refresh inbox. Please try again.');
        });
}
const cors = require('cors');
app.use(cors());
