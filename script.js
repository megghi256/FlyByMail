// Global variable to store the current email address
let currentEmail = '';

// When the DOM is fully loaded, attach event listeners to the buttons
document.addEventListener('DOMContentLoaded', () => {
  const generateEmailButton = document.getElementById('generateEmail');
  const refreshInboxButton = document.getElementById('refreshInbox');

  generateEmailButton.addEventListener('click', generateEmail);
  refreshInboxButton.addEventListener('click', refreshInbox);
});

// Function to generate a new email and fetch its inbox
async function generateEmail() {
  try {
    // Fetch a new email from the server
    const response = await fetch('http://localhost:3000/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    const data = await response.json();
    // Update the current email address with the new one
    currentEmail = data.email;
    // Display the new email on the webpage
    document.getElementById('emailDisplay').textContent = currentEmail;
    // Fetch the inbox for the new email
    getInboxMessages(currentEmail);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to get inbox messages for the current email
async function getInboxMessages(email) {
  try {
    // Fetch the inbox messages from the server for the given email
    const response = await fetch(`http://localhost:3000/messagebox/${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    const messages = await response.json();
    // Display the inbox messages on the webpage
    displayMessages(messages);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to refresh the inbox for the current email
function refreshInbox() {
  if (currentEmail) {
    // Call getInboxMessages if there is a current email
    getInboxMessages(currentEmail);
  } else {
    console.log('No email address generated yet.');
  }
}

// Function to display messages in the inbox on the webpage
function displayMessages(messages) {
  const inbox = document.getElementById('inboxMessages');
  inbox.innerHTML = ''; // Clear previous messages
  if (messages.length === 0) {
    inbox.textContent = 'No messages in the inbox.';
  } else {
    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = `From: ${message.from}, Subject: ${message.subject}`;
      inbox.appendChild(messageDiv);
    });
  }
}
