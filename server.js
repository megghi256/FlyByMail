const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000; // Use the same port number in the frontend fetch requests

// Helper function to get a list of active domains from 1secmail.com
async function getActiveDomains() {
  try {
    const response = await axios.get("https://www.1secmail.com/api/v1/?action=getDomainList");
    return response.data; // The API returns an array of domains
  } catch (error) {
    console.error('Error fetching active domains:', error);
    throw error;
  }
}

// Generate a random email address using one of the active domains
async function getRandomEmail() {
  try {
    const domains = await getActiveDomains();
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomUsername = Math.random().toString(36).substring(2, 15); // Generate a random string for the username
    return `${randomUsername}@${randomDomain}`;
  } catch (error) {
    console.error('Error generating random email:', error);
    throw error;
  }
}

// Endpoint to generate a random email address
app.get("/generate-email", async (req, res) => {
  try {
    const email = await getRandomEmail();
    res.json({ email: email }); // Return the email address in JSON format
  } catch (error) {
    console.error('Error on generating email:', error);
    res.status(500).send('An error occurred while generating the email');
  }
});

// Endpoint to get messages from a specific mailbox
app.get('/messagebox/:login/:domain', async (req, res) => {
  const { login, domain } = req.params;

  try {
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`);
    res.json(response.data); // The API returns the messages in JSON format
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('An error occurred while fetching messages');
  }
});
// Endpoint to delete a message from a specific mailbox
app.get('/delete-message/:login/:domain/:id', async (req, res) => {
  const { login, domain, id } = req.params;

  try {
    // Send a request to the 1secmail API to delete the message
    await axios.get(`https://www.1secmail.com/api/v1/?action=deleteMessage&login=${login}&domain=${domain}&id=${id}`);
    // If successful, send a confirmation back to the client
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting the message:', error);
    res.status(500).send('An error occurred while deleting the message');
  }
});


// Listen for requests
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
