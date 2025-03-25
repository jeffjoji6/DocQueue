const { HfInference } = require('@huggingface/inference');

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// Medical knowledge base for common symptoms and treatments
const medicalKnowledge = {
  fever: {
    symptoms: ['temperature', 'chills', 'sweating', 'headache', 'body aches'],
    treatments: [
      'Rest and stay hydrated',
      'Take over-the-counter fever reducers',
      'Monitor temperature regularly',
      'Seek medical attention if fever persists or exceeds 103°F'
    ],
    questions: [
      'What is your current temperature?',
      'How long have you had the fever?',
      'Are you experiencing any other symptoms?'
    ]
  },
  headache: {
    symptoms: ['pain', 'sensitivity to light', 'nausea', 'dizziness'],
    treatments: [
      'Rest in a quiet, dark room',
      'Stay hydrated',
      'Take over-the-counter pain relievers',
      'Apply cold or warm compress'
    ],
    questions: [
      'How severe is your headache?',
      'Is it a constant or throbbing pain?',
      'Are you sensitive to light or sound?'
    ]
  },
  chestPain: {
    symptoms: ['pressure', 'tightness', 'shortness of breath', 'pain radiating to arms'],
    treatments: [
      'Seek immediate medical attention',
      'Stop any physical activity',
      'Take prescribed medications if available',
      'Call emergency services if severe'
    ],
    questions: [
      'Where exactly is the pain located?',
      'Is the pain constant or intermittent?',
      'Does it worsen with movement?'
    ]
  },
  diarrhea: {
    symptoms: ['loose stools', 'abdominal cramps', 'nausea', 'dehydration'],
    treatments: [
      'Stay hydrated with water and electrolyte solutions',
      'Rest and avoid solid foods temporarily',
      'Take over-the-counter anti-diarrheal medications',
      'Seek medical attention if symptoms persist'
    ],
    questions: [
      'How long have you had diarrhea?',
      'Are you experiencing any abdominal pain?',
      'Have you been able to keep fluids down?'
    ]
  }
};

const generateResponse = async (userMessage, disease, score) => {
  try {
    // Get relevant medical information based on the disease
    const diseaseInfo = medicalKnowledge[disease.toLowerCase()] || {
      symptoms: [],
      treatments: [],
      questions: []
    };

    // Create a context-aware prompt
    const prompt = `As a medical AI assistant, I understand you're experiencing ${disease} with a severity score of ${score}. 
    ${userMessage}
    
    Based on your symptoms, here are some recommendations:
    ${diseaseInfo.treatments.map((treatment, index) => `${index + 1}. ${treatment}`).join('\n')}
    
    Would you like me to ask you more specific questions about your condition?`;

    // Get response from the model
    const modelResponse = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_length: 200,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false
      }
    });

    // Combine the model response with medical knowledge
    let response = modelResponse.generated_text;

    // Add severity-based advice
    if (score < 3) {
      response += "\n\nYour symptoms appear to be mild. Continue monitoring and seek medical attention if they worsen.";
    } else if (score >= 3 && score <= 5) {
      response += "\n\nYour symptoms are moderate. Consider scheduling a doctor's appointment if they persist.";
    } else {
      response += "\n\nYour symptoms are severe. Please seek immediate medical attention.";
    }

    // Add a disclaimer
    response += "\n\nNote: I am an AI assistant and cannot replace professional medical advice. If your symptoms worsen or you have concerns, please seek medical attention.";

    return response;
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Fallback response with medical knowledge
    const diseaseInfo = medicalKnowledge[disease.toLowerCase()] || {
      treatments: ['Rest and monitor your symptoms', 'Stay hydrated', 'Seek medical attention if symptoms worsen']
    };

    return `I understand you're experiencing ${disease}. Here are some general recommendations:
    ${diseaseInfo.treatments.map((treatment, index) => `${index + 1}. ${treatment}`).join('\n')}
    
    Please note that I am an AI assistant and cannot replace professional medical advice. If your symptoms worsen or you have concerns, please seek medical attention.`;
  }
};

module.exports = {
  generateResponse
}; 