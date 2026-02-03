import { useEffect, useState } from "react";
import "./HistoryView.css";

const SAVED_CONVERSATIONS_KEY = "savedConversations";

const HistoryView = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(SAVED_CONVERSATIONS_KEY)) || [];
    setConversations(saved);
  }, []);

  return (
    <div className="history-view">
      <div className="history-content">
        <div>Past Conversations</div>
        <div className="conversations-list">
          {conversations.length === 0 && (
            <p className="no-history">No past conversations.</p>
          )}
          {conversations.map((conv, idx) => {
            const firstUserMessage = conv.messages?.find(
              (m) => m.sender === "user"
            );
            const title = firstUserMessage?.text || "Conversation";
            return (
              <div key={idx} className="conversation-card">
                <div>{title}</div>
                {conv.messages?.map((msg, i) => (
                  <div key={i} className="history-message">
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryView;