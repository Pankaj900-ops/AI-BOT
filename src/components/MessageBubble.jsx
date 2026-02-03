import React from "react";
import "./MessageBubble.css";

function MessageBubble({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      {message.sender === "ai" && (
        <span className="ai-name">Soul AI</span>
      )}

      {message.sender === "ai" ? (
        <p>{message.text}</p>
      ) : (
        <div>{message.text}</div>
      )}
    </div>
  );
}

export default MessageBubble;
