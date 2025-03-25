const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Store chat history for each session (in production, use a proper database)
const chatHistory = new Map();

router.post('/chat', async (req, res) => {
  try {
    const { message, disease, priority } = req.body;
    const sessionId = req.session.id;

    // Get or initialize chat history for this session
    if (!chatHistory.has(sessionId)) {
      chatHistory.set(sessionId, [
        {
          role: 'system',
          content: `You are a helpful AI healthcare assistant. The patient is experiencing ${disease} with a priority level of ${priority}. 
          Provide appropriate medical guidance while being clear that you are an AI and cannot replace professional medical advice. 
          For serious symptoms, always recommend seeking immediate medical attention.`
        }
      ]);
    }

    // Add user message to history
    chatHistory.get(sessionId).push({
      role: 'user',
      content: message
    });

    // Get completion from OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory.get(sessionId),
      max_tokens: 150,
      temperature: 0.7,
    });

    const aiResponse = completion.data.choices[0].message.content;

    // Add AI response to history
    chatHistory.get(sessionId).push({
      role: 'assistant',
      content: aiResponse
    });

    // Keep only last 10 messages to manage context window
    if (chatHistory.get(sessionId).length > 11) { // 1 system message + 10 conversation messages
      chatHistory.set(sessionId, [
        chatHistory.get(sessionId)[0],
        ...chatHistory.get(sessionId).slice(-10)
      ]);
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in AI doctor chat:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
});

module.exports = router; 