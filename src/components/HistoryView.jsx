import React, { useState, useEffect } from 'react';
import { getConversations, deleteConversation } from '../Utils/helpers';
import './HistoryView.css';

function HistoryView() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = () => {
    const data = getConversations();
    setConversations(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const updated = deleteConversation(id);
      setConversations(updated.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      if (selectedConversation?.id === id) {
        setSelectedConversation(null);
      }
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.messages.some(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="history-view">
      <div className="history-header">
        <h2>Past Conversations</h2>
      </div>

      <div className="history-content">
        <div className="conversations-sidebar">
          <div className="search-container">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="empty-conversations">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" />
                </svg>
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                  onClick={() => handleSelectConversation(conv)}
                >
                  <div className="conversation-info">
                    <h4>{conv.title}</h4>
                    <p className="conversation-date">{formatDate(conv.timestamp)}</p>
                    <p className="conversation-preview">
                      {conv.messages.length} messages
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(conv.id);
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="conversation-detail">
          {selectedConversation ? (
            <>
              <div className="detail-header">
                <div>
                  <h3>{selectedConversation.title}</h3>
                  <p className="detail-date">
                    {new Date(selectedConversation.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="messages-container">
                {selectedConversation.messages.map((msg) => (
                  <div key={msg.id} className={`history-message ${msg.sender}`}>
                    <div className="message-avatar">
                      {msg.sender === 'ai' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                      )}
                    </div>
                    <div className="message-content">
                      <p>{msg.text}</p>
                      {msg.feedback && (
                        <div className="feedback-badge">
                          {msg.feedback === 'like' ? '👍' : '👎'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" />
              </svg>
              <h3>Select a Conversation</h3>
              <p>Choose a conversation from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryView;