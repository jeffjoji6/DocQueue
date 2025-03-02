import React, { useState } from "react";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getResponse = async (message) => {
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Chatbot error:", error);
      return "Error communicating with the chatbot.";
    }
  };

  const handleSend = async () => {
    if (message.trim() === "") return;

    const userMessage = message;
    const botResponse = await getResponse(userMessage);

    setChat([...chat, { sender: "You", text: userMessage }, { sender: "Bot", text: botResponse }]);
    setMessage("");
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-white border rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Chatbot</h3>
          <div className="h-60 overflow-y-scroll border p-2">
            {chat.map((msg, index) => (
              <div key={index} className={msg.sender === "You" ? "text-right" : "text-left"}>
                <strong>{msg.sender}: </strong>{msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full border rounded p-2 mt-2"
          />
          <button
            onClick={handleSend}
            className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default Chatbot;