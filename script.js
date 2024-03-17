document.addEventListener('DOMContentLoaded', function () {
  const emailDropdown = document.getElementById('email-address-dropdown');
  const generateEmailButton = document.getElementById('generate-email');
  const refreshInboxButton = document.getElementById('refresh-inbox');
  const copyEmailButton = document.getElementById('copy-email');
  const messagesList = document.getElementById('messages-list');

  generateEmailButton.addEventListener('click', () => generateEmail(1));
  copyEmailButton.addEventListener('click', copyEmailToClipboard);
  refreshInboxButton.addEventListener('click', () => refreshInbox(emailDropdown.value));

  emailDropdown.addEventListener('change', () => {
    refreshInbox(emailDropdown.value);
  });

  setInterval(() => {
    if (emailDropdown.value) {
      refreshInbox(emailDropdown.value);
    }
  }, 120000); // 15 seconds

  function generateEmail(count = 1) {
    fetch(`https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=${count}`)
      .then(response => response.json())
      .then(data => {
        data.forEach((email, index) => {
          const newOption = new Option(email, email);
          emailDropdown.add(newOption);
          if (index === data.length - 1) {
            newOption.selected = true;
          }
        });
        refreshInbox(emailDropdown.value);
      })
      .catch(error => {
        console.error('Failed to generate new emails:', error);
        alert('Failed to generate new emails. Please try again.');
      });
  }

  function refreshInbox(email) {
    if (!email) {
      alert("Please select an email address first.");
      return;
    }
    const [login, domain] = email.split('@');
    fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
      .then(response => response.json())
      .then(messages => {
        messagesList.innerHTML = '';
        if (messages.length === 0) {
          messagesList.innerHTML = '<div class="message empty">No new messages.</div>';
          return;
        }
        messages.forEach(message => {
          displayMessage(login, domain, message);
        });
      })
      .catch(error => {
        console.error('Failed to fetch inbox messages:', error);
        alert('Failed to refresh inbox. Please try again.');
      });
  }

  function displayMessage(login, domain, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
      <div class="message-header">
        <span><strong>From:</strong> ${message.from}</span>
        <span><strong>Subject:</strong> ${message.subject}</span>
        <button class="view-button">View</button>
        <button class="hide-button">Hide</button>
      </div>
      <div class="message-body" id="message-body-${message.id}" style="display: none;"></div>`;
    messagesList.appendChild(messageDiv);

    messageDiv.querySelector('.view-button').addEventListener('click', () => {
      toggleMessageBody(message.id, login, domain);
    });

    messageDiv.querySelector('.hide-button').addEventListener('click', () => hideMessage(message.id));
  }

  function toggleMessageBody(id, login, domain) {
    const messageBodyDiv = document.getElementById(`message-body-${id}`);
    if (messageBodyDiv.style.display === 'none') {
      fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`)
        .then(response => response.json())
        .then(message => {
          messageBodyDiv.innerHTML = `<p>Date: ${message.date}</p><p>${message.textBody || message.htmlBody}</p>`;
          messageBodyDiv.style.display = 'block';
        })
        .catch(error => {
          console.error('Failed to read the message:', error);
          messageBodyDiv.innerHTML = `<p>Failed to load message.</p>`;
        });
    } else {
      messageBodyDiv.style.display = 'none';
    }
  }

  function hideMessage(id) {
    const messageDiv = document.getElementById(`message-body-${id}`).parentNode;
    messageDiv.style.display = 'none';
  }

  function copyEmailToClipboard() {
    const email = emailDropdown.value;
    if (email) {
      navigator.clipboard.writeText(email)
        .then(() => alert('Email address copied to clipboard.'))
        .catch(err => console.error('Could not copy text: ', err));
    } else {
      alert('No email address to copy.');
    }
  }
});
