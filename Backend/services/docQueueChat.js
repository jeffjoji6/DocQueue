const { HfInference } = require('@huggingface/inference');

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// DocQueue knowledge base for FAQs and general information
const docQueueKnowledge = {
  general: {
    questions: [
      'What is DocQueue?',
      'How do I book an appointment?',
      'What are the payment options?',
      'How do I cancel my appointment?',
      'What documents do I need?'
    ],
    answers: {
      'What is DocQueue?': 'DocQueue is a healthcare platform for booking doctor appointments and managing medical records.',
      'How do I book an appointment?': 'Search for a hospital/doctor, select a time slot, and complete the booking process.',
      'What are the payment options?': 'We accept cards, net banking, and digital wallets through our secure payment gateway.',
      'How do I cancel my appointment?': 'Cancel through your dashboard or contact support. Policies vary by hospital.',
      'What documents do I need?': 'Valid ID proof and relevant medical records. Requirements may vary by hospital.'
    }
  },
  features: {
    questions: [
      'What is the AI Doctor feature?',
      'How does the emergency care system work?',
      'What is the assessment quiz?',
      'How do I track my appointment status?'
    ],
    answers: {
      'What is the AI Doctor feature?': 'AI Doctor provides preliminary medical guidance based on your symptoms.',
      'How does the emergency care system work?': 'Our assessment quiz identifies urgent cases and directs to emergency care when needed.',
      'What is the assessment quiz?': 'A quick quiz that evaluates symptoms to recommend appropriate care level.',
      'How do I track my appointment status?': 'Track appointments in real-time through your dashboard.'
    }
  }
};

const generateResponse = async (userMessage) => {
  try {
    // Create a concise prompt for DocQueue FAQs
    const prompt = `As a DocQueue AI assistant, provide a brief, direct response to: ${userMessage}
    Keep responses under 2-3 sentences.`;

    // Get response from the model with shorter length
    const modelResponse = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_length: 100, // Reduced from 200
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false
      }
    });

    // Check if the user's message matches any predefined FAQ
    const userMessageLower = userMessage.toLowerCase();
    for (const category in docQueueKnowledge) {
      for (const question in docQueueKnowledge[category].answers) {
        if (userMessageLower.includes(question.toLowerCase())) {
          return docQueueKnowledge[category].answers[question];
        }
      }
    }

    // If no FAQ match, return the model's response
    return modelResponse.generated_text;
  } catch (error) {
    console.error('Error generating DocQueue chat response:', error);
    return "I'm having trouble processing your request. Please try again.";
  }
};

module.exports = {
  generateResponse
}; 