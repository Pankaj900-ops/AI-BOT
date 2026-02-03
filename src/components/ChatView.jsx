import { useState } from "react";
import getAIResponse from "../aiResponses";
import "./ChatView.css";

const SAVED_CONVERSATIONS_KEY = "savedConversations";

const ChatView = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    const aiMsg = { sender: "ai", text: getAIResponse(message) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setMessage("");
  };

  const handleSave = () => {
    if (messages.length === 0) return;
    const saved =
      JSON.parse(localStorage.getItem(SAVED_CONVERSATIONS_KEY)) || [];
    saved.push({ messages: [...messages] });
    localStorage.setItem(SAVED_CONVERSATIONS_KEY, JSON.stringify(saved));
  };

  return (
    <div className="chat-view">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Message Bot AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={handleSave}>
          Save
        </button>
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
