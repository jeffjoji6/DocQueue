require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cohere = require("cohere-ai");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Cohere API
cohere.init(process.env.COHERE_API_KEY);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await cohere.generate({
      model: "command-r", // Use 'command' for free version
      prompt: message,
      max_tokens: 100,
    });

    res.json({ reply: response.body.generations[0].text });
  } catch (error) {
    console.error("Cohere API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () =>
  console.log(`🚀 Cohere Chatbot running on port ${port}`)
);
