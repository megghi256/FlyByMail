const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Proxy endpoint for generating emails
app.get("/generate-email", async (req, res) => {
  try {
    const emailResponse = await axios.get("https://tempmailapi--vikashkhati.repl.co/");
    res.json(emailResponse.data);
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).send('An error occurred');
  }
});

// Proxy endpoint for getting inbox messages
app.get('/proxy-messagebox/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const messagesResponse = await axios.get(`https://tempmailapi--vikashkhati.repl.co/messagebox/${email}`);
    res.json(messagesResponse.data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => console.log('Server is running on PORT 3000'));
