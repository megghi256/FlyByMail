document.getElementById('generateEmail').addEventListener('click', generateEmail);

async function generateEmail() {
  try {
    const response = await fetch('/');
    const email = await response.json();
    document.getElementById('emailDisplay').textContent = email;
    getInboxMessages(email);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getInboxMessages(email) {
  try {
    const response = await fetch(`/messagebox/${email}`);
    const messages = await response.json();
    displayMessages(messages);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayMessages(messages) {
  const inbox = document.getElementById('inboxMessages');
  inbox.innerHTML = '<h2>Inbox</h2>'; // Clear previous messages
  messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `From: ${message.from}, Subject: ${message.subject}`;
    inbox.appendChild(messageDiv);
  });
}
