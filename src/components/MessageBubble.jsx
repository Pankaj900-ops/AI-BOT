import React, { useState } from 'react';
import './MessageBubble.css';

function MessageBubble({ message, onFeedback }) {
  const [showActions, setShowActions] = useState(false);

  const handleFeedback = (type) => {
    if (message.sender === 'ai') {
      onFeedback(message.id, type);
    }
  };

  return (
    <div className={`message-container ${message.sender}`}>
      {message.sender === 'ai' && (
        <div className="message-avatar ai">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
          </svg>
        </div>
      )}

      <div
        className={`message-bubble ${message.sender}`}
        onMouseEnter={() => message.sender === 'ai' && setShowActions(true)}
        onMouseLeave={() => message.sender === 'ai' && setShowActions(false)}
      >
        {message.sender === 'ai' ? (
          <p>{message.text}</p>
        ) : (
          <div className="user-message-text">{message.text}</div>
        )}

        {message.sender === 'ai' && showActions && (
          <div className="message-actions">
            <button
              className={`action-btn ${message.feedback === 'like' ? 'active' : ''}`}
              onClick={() => handleFeedback('like')}
              title="Like"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`action-btn ${message.feedback === 'dislike' ? 'active' : ''}`}
              onClick={() => handleFeedback('dislike')}
              title="Dislike"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        <div className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {message.sender === 'user' && (
        <div className="message-avatar user">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export default MessageBubble;