import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import FeedbackModal from './FeedbackModal';
import { getAIResponse } from '../Utils/helpers';
import './ChatView.css';

function ChatView() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    startNewConversation();

    const handleNewChat = () => {
      startNewConversation();
    };
    window.addEventListener('newChat', handleNewChat);

    return () => {
      window.removeEventListener('newChat', handleNewChat);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId(Date.now());
    setInputValue('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        feedback: null,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleFeedback = (messageId, feedbackType) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, feedback: msg.feedback === feedbackType ? null : feedbackType }
          : msg
      )
    );
  };

  const handleSaveConversation = () => {
    if (messages.length === 0) {
      alert('No messages to save!');
      return;
    }

    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    const conversation = {
      id: currentConversationId,
      messages: messages,
      timestamp: new Date().toISOString(),
      title: messages[0]?.text.substring(0, 50) + '...' || 'New Conversation',
    };

    const existingConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    localStorage.setItem('conversations', JSON.stringify([...existingConversations, conversation]));

    const feedbackEntry = {
      id: Date.now(),
      conversationId: currentConversationId,
      ...feedbackData,
      timestamp: new Date().toISOString(),
    };

    const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    localStorage.setItem('feedback', JSON.stringify([...existingFeedback, feedbackEntry]));

    setShowFeedbackModal(false);
    alert('Conversation saved successfully!');
    startNewConversation();
  };

  return (
    <div className="chat-view">
      <div className="chat-header">
        <div className="header-content">
          <h2>Chat with <span className="bot-name">Soul AI</span></h2>
          <button 
            className="save-btn" 
            type="button"
            onClick={handleSaveConversation}
            disabled={messages.length === 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 21v-8H7v8M7 3v5h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Start a Conversation</h3>
            <p>Ask me anything! I'm here to help.</p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onFeedback={handleFeedback}
          />
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-bubble">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Message Bot AI…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="send-btn"
            disabled={!inputValue.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

      {showFeedbackModal && (
        <FeedbackModal
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}

export default ChatView;