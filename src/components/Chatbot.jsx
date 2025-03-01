import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [chat]);

  const getResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
  
    // ✅ Appointment Queries
    if (lowerCaseMessage.includes("book appointment")) {
      return "To book an appointment, visit DocQueue and select a doctor and time slot.";
    } else if (lowerCaseMessage.includes("doctor availability")) {
      return "You can check doctor availability on the DocQueue app.";
    } else if (lowerCaseMessage.includes("cancel appointment")) {
      return "To cancel, go to 'My Appointments' in DocQueue.";
  
    // ✅ DocQueue AI Scheduling Queries
    } else if (lowerCaseMessage.includes("how does docqueue work")) {
      return "DocQueue is an AI-powered scheduling system that optimizes doctor-patient appointments.";
    } else if (lowerCaseMessage.includes("dynamic scheduling")) {
      return "Dynamic scheduling in DocQueue ensures optimal doctor allocation based on real-time patient demand.";
    } else if (lowerCaseMessage.includes("priority-based scheduling")) {
      return "Priority-based scheduling uses AI to allocate appointments based on urgency, medical condition, and availability.";
    } else if (lowerCaseMessage.includes("how does ai improve scheduling")) {
      return "AI optimizes scheduling by analyzing real-time data, predicting appointment durations, and balancing doctor workload.";
    } else if (lowerCaseMessage.includes("what is integer linear programming")) {
      return "Integer Linear Programming (ILP) is a mathematical optimization method used in DocQueue to efficiently allocate medical resources.";
    } else if (lowerCaseMessage.includes("what is genetic algorithm")) {
      return "Genetic Algorithms (GA) in DocQueue improve scheduling by finding optimal doctor-patient matches through evolutionary computation.";
    } else if (lowerCaseMessage.includes("real-time updates")) {
      return "DocQueue provides real-time updates on doctor availability, appointment status, and resource utilization.";
    } else if (lowerCaseMessage.includes("is docqueue cloud-based")) {
      return "Yes, DocQueue is a cloud-based platform that provides 24/7 access to scheduling and doctor availability.";
    } else if (lowerCaseMessage.includes("how does docqueue reduce waiting time")) {
      return "DocQueue reduces waiting time using AI to analyze schedules, minimize overlaps, and dynamically adjust appointments.";
  
    // ✅ Hospital-Related Queries
    } else if (lowerCaseMessage.includes("hospital timings")) {
      return "Our hospital is open from 8 AM to 8 PM, Monday to Saturday.";
    } else if (lowerCaseMessage.includes("emergency contact")) {
      return "For emergencies, call our helpline at +91 9876543210.";
    } else if (lowerCaseMessage.includes("insurance accepted")) {
      return "We accept most major health insurance plans.";
    } else if (lowerCaseMessage.includes("nearest pharmacy")) {
      return "You can find the nearest pharmacy using Google Maps or ask our hospital reception.";
    } else if (lowerCaseMessage.includes("ambulance service")) {
      return "Yes, we have 24/7 ambulance services. Call +91 9999999999 for immediate assistance.";
  
    // ✅ Disease & Treatment Queries
    } else if (lowerCaseMessage.includes("symptoms of covid")) {
      return "COVID-19 symptoms include fever, cough, shortness of breath, and loss of taste/smell.";
    } else if (lowerCaseMessage.includes("treatment for diabetes")) {
      return "Diabetes treatment includes medication, insulin therapy, and lifestyle changes like diet and exercise.";
    } else if (lowerCaseMessage.includes("heart attack symptoms")) {
      return "Symptoms include chest pain, shortness of breath, and pain in the left arm.";
    } else if (lowerCaseMessage.includes("dengue fever treatment")) {
      return "Dengue fever treatment involves hydration, pain relievers, and monitoring platelet count.";
    } else if (lowerCaseMessage.includes("cancer treatment options")) {
      return "Cancer treatments include chemotherapy, radiation therapy, surgery, and immunotherapy.";
    } else if (lowerCaseMessage.includes("stroke symptoms")) {
      return "Stroke symptoms include sudden numbness, confusion, difficulty speaking, and loss of balance.";
    } else if (lowerCaseMessage.includes("flu prevention")) {
      return "Prevent flu by washing hands regularly, getting vaccinated, and maintaining a healthy diet.";
    } else if (lowerCaseMessage.includes("migraine relief")) {
      return "Migraine relief includes rest, hydration, avoiding bright lights, and taking prescribed pain relievers.";
  
    // Default Response
    } else {
      return "I'm sorry, I didn't understand that.";
    }
  };

  const handleSend = () => {
    if (message.trim() === "") return;

    const userMessage = message;
    const botResponse = getResponse(userMessage);

    setChat([...chat, { sender: "You", text: userMessage }, { sender: "Bot", text: botResponse }]);
    setMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        💬
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-lg p-4 border">
          <h2 className="text-lg font-bold text-center text-blue-600">DocQueue Chatbot</h2>
          <div ref={chatContainerRef} className="h-64 overflow-y-auto border p-4 bg-gray-50 rounded-md mt-2">
            {chat.map((msg, index) => (
              <p key={index} className={`mb-2 ${msg.sender === "You" ? "text-right text-blue-500" : "text-left text-green-600"}`}>
                <strong>{msg.sender}: </strong> {msg.text}
              </p>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              className="w-full p-2 border rounded-md"
            />
            <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;