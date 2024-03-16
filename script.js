document.addEventListener('DOMContentLoaded', function () {
  const generateEmailButton = document.getElementById('generate-email');
  const refreshInboxButton = document.getElementById('refresh-inbox');
  const emailDropdown = document.getElementById('email-address-dropdown');
  const copyEmailButton = document.getElementById('copy-email');
  const messagesList = document.getElementById('messages-list');

  generateEmailButton.addEventListener('click', generateEmail);
  copyEmailButton.addEventListener('click', copyEmailToClipboard);
  refreshInboxButton.addEventListener('click', () => refreshInbox(emailDropdown.value));

  emailDropdown.addEventListener('change', () => refreshInbox(emailDropdown.value));

  function generateEmail() {
    fetch('http://localhost:3000/generate-email')
      .then(response => response.json())
      .then(data => {
        const newOption = new Option(data.email, data.email);
        emailDropdown.add(newOption);
        emailDropdown.value = data.email;
        refreshInbox(data.email);
      })
      .catch(error => {
        console.error('Failed to generate a new email:', error);
        alert('Failed to generate a new email. Please try again.');
      });
  }

  function refreshInbox(email) {
    if (email) {
      getInbox(email);
    } else {
      alert("Please generate an email address first.");
    }
  }

  function getInbox(email) {
    const encodedEmail = encodeURIComponent(email);
    fetch(`http://localhost:3000/messagebox/${encodedEmail}`)
      .then(response => response.json())
      .then(messages => {
        messagesList.innerHTML = '';
        if (messages && messages.length > 0) {
          messages.forEach(message => {
            displayMessage(message);
          });
        } else {
          messagesList.textContent = 'No new messages.';
        }
      })
      .catch(error => {
        console.error('Failed to fetch inbox messages:', error);
        alert('Failed to refresh inbox. Please try again.');
      });
  }

  function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
      <strong>From:</strong> ${message.from}<br>
      <strong>Subject:</strong> ${message.subject}<br>
      <p>${message.body || 'No content'}</p>`;
    messagesList.appendChild(messageDiv);
  }

  function copyEmailToClipboard() {
    const email = emailDropdown.value;
    if(email) {
      navigator.clipboard.writeText(email).then(() => {
        alert('Email address copied to clipboard.');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    } else {
      alert('No email address to copy.');
    }
  }
});
