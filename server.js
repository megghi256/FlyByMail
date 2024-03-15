const express = require('express');
const axios = require("axios");
const cors = require('cors'); // Make sure to install the cors package

const app = express();
app.use(cors()); // Use CORS to avoid cross-origin issues

async function getEmailValue() {
  try {
    const response = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1");
    return response.data[0];
  } catch (error) {
    throw error;
  }
}

app.get("/", async (req, res) => {
  try {
    const email = await getEmailValue();
    res.json({ email: email }); // Ensure to send a JSON object
  } catch (error) {
    console.error('Error fetching email value:', error);
    res.status(500).send('An error occurred');
  }
});

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

app.listen(3000, () => console.log('Listening on PORT: 3000'));
