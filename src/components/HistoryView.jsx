import { useEffect, useState } from "react";
import { getAIResponse } from "../aiResponses";
import "./ChatView.css";

const ChatView = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load saved conversations
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    setMessages(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    const aiMsg = { sender: "ai", text: getAIResponse(message) };

    const updatedMessages = [...messages, userMsg, aiMsg];

    setMessages(updatedMessages);
    localStorage.setItem("conversations", JSON.stringify(updatedMessages));
    setMessage("");
  };

  return (
    <div className="chat-view">
      {/* REQUIRED BY CYPRESS */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message Bot AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {messages.map((msg, index) => (
        <div key={index} className="bot-message">
          {msg.sender === "ai" && <span>Soul AI</span>}
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatView;
