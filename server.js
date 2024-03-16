const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000; // Use the same port number in the frontend fetch requests

async function getEmailValue() {
  try {
    const response = await axios.get("https://tempmailapi--vikashkhati.repl.co/");
    return response.data[0]; // Assuming the API returns an array with one email
  } catch (error) {
    console.error('Error fetching random email:', error);
    throw error;
  }
}

app.get("/generate-email", async (req, res) => {
  try {
    const email = await getEmailValue();
    res.json({ email: email }); // Make sure to return a JSON object
  } catch (error) {
    console.error('Error on generating email:', error);
    res.status(500).send('An error occurred');
  }
});

app.get('/messagebox/:email', async (req, res) => {
  const { email } = req.params;
  const [localPart, domainPart] = email.split('@');

  try {
    const response = await axios.get(`https://tempmailapi--vikashkhati.repl.co/messagebox/${email}`);
    console.log(response.data); // Log the response here
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
