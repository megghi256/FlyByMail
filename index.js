const express = require('express');
const axios = require("axios");

const app = express();

async function getEmailValue() {
  try {
    const response = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
    return response.data[0];
  } catch (error) {
    throw error;
  }
}

// Route handler for root endpoint ("/")
app.get("/", async (req, res) => {
  try {
    const email = await getEmailValue();
    res.json(email);
  } catch (error) {
    console.error('Error fetching email value:', error);
    res.status(500).send('An error occurred');
  }
});

// Route handler for messagebox endpoint ("/messagebox/:email")
app.get('/messagebox/:email', async (req, res) => {
  const { email } = req.params;
  const [localPart, domainPart] = email.split('@');

  try {
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${localPart}&domain=${domainPart}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(5500, () => console.log('Listening on PORT: 3000'));
