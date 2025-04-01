const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/docQueueChat');

// Store chat history for each session (in production, use a proper database)
const chatHistory = new Map();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const sessionId = req.session.id;

    // Get or initialize chat history for this session
    if (!chatHistory.has(sessionId)) {
      chatHistory.set(sessionId, [
        {
          role: 'system',
          content: 'You are a helpful DocQueue AI assistant. You can help users with questions about our healthcare platform, including booking appointments, features, and general information.'
        }
      ]);
    }

    // Add user message to history
    chatHistory.get(sessionId).push({
      role: 'user',
      content: message
    });

    // Generate response
    const response = await generateResponse(message);

    // Add AI response to history
    chatHistory.get(sessionId).push({
      role: 'assistant',
      content: response
    });

    // Keep only last 10 messages to manage context window
    if (chatHistory.get(sessionId).length > 11) { // 1 system message + 10 conversation messages
      chatHistory.set(sessionId, [
        chatHistory.get(sessionId)[0],
        ...chatHistory.get(sessionId).slice(-10)
      ]);
    }

    res.json({ response });
  } catch (error) {
    console.error('Error in DocQueue chat:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
});

module.exports = router; 