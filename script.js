document.getElementById('generateEmail').addEventListener('click', generateEmail);

async function generateEmail() {
  try {
    const response = await fetch('http://localhost:3000/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const email = data.email; // Ensure you're accessing the 'email' property of the JSON object.
    document.getElementById('emailDisplay').textContent = email;
    getInboxMessages(email);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getInboxMessages(email) {
  try {
    const response = await fetch(`http://localhost:3000/messagebox/${email}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    console.error('Error:', error);
  } let currentEmail = '';

  document.getElementById('generateEmail').addEventListener('click', generateEmail);
  // Add event listener for the Refresh Inbox button
  document.getElementById('refreshInbox').addEventListener('click', function() {
    if (currentEmail) {
      getInboxMessages(currentEmail);
    } else {
      console.log('No email address available to refresh.');
    }
  });
  
  async function generateEmail() {
    // ... (the rest of your generateEmail function) ...
    currentEmail = data.email; // Update the currentEmail variable
    // ... (the rest of your generateEmail function) ...
  }
  
}

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
