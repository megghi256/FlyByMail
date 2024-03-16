let currentEmail = ''; // Global variable to store the current email

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('generateEmail').addEventListener('click', generateEmail);
  document.getElementById('refreshInbox').addEventListener('click', function() {
    if (currentEmail) {
      getInboxMessages(currentEmail);
    } else {
      console.log('No email address to refresh.');
    }
  });
});

async function generateEmail() {
  try {
    const response = await fetch('http://localhost:3000/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    currentEmail = data.email;
    document.getElementById('emailDisplay').textContent = currentEmail;
    getInboxMessages(currentEmail);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getInboxMessages(email) {
  try {
    const response = await fetch(`http://localhost:3000/messagebox/${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayMessages(messages) {
  const inbox = document.getElementById('inboxMessages');
  inbox.innerHTML = ''; // Clear the inbox first
  if (messages.length === 0) {
    inbox.innerHTML = '<p>No messages in the inbox.</p>';
  } else {
    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = `From: ${message.from}, Subject: ${message.subject}`;
      inbox.appendChild(messageDiv);
    });
  }
}
