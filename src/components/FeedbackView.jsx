import React, { useEffect, useState } from "react";
import "./HistoryView.css";

function HistoryView() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("conversations")) || [];
    setConversations(data);
  }, []);

  const handleSelect = (conv) => {
    setSelectedConversation(conv);
  };

  const handleDelete = (index) => {
    const updated = conversations.filter((_, i) => i !== index);
    setConversations(updated);
    localStorage.setItem("conversations", JSON.stringify(updated));
    setSelectedConversation(null);
  };

  return (
    <div className="history-view">
      <h2>Past Conversations</h2>

      {conversations.length === 0 && <p>No conversations found</p>}

      {conversations.map((conv, index) => (
        <div key={index} className="history-item">
          <button onClick={() => handleSelect(conv)}>
            Conversation {index + 1}
          </button>

          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}

      {selectedConversation && (
        <div className="conversation-details">
          <h3>Conversation Details</h3>

          {selectedConversation.messages?.map((msg, i) => (
            <p key={i}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryView;
