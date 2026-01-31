import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavButton from './NavButton';
import './Sidebar.css';

function Sidebar({ isOpen, onToggle, currentView, onViewChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, view) => {
    navigate(path);
    onViewChange(view);
  };

  const handleNewChat = () => {
    navigate('/');
    onViewChange('chat');
    window.dispatchEvent(new Event('newChat'));
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 9V23L16 30L28 23V9L16 2Z" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="4" y1="2" x2="28" y2="30">
                    <stop stopColor="#6366f1" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="logo-text">Bot AI</h1>
          </div>
          <button className="close-btn" onClick={onToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Chat
        </button>

        <nav className="sidebar-nav">
          <NavButton
            icon="chat"
            label="Chat with Bot"
            isActive={location.pathname === '/'}
            onClick={() => handleNavigation('/', 'chat')}
          />
          <NavButton
            icon="history"
            label="Past Conversations"
            isActive={location.pathname === '/history'}
            onClick={() => handleNavigation('/history', 'history')}
          />
          <NavButton
            icon="feedback"
            label="Feedback"
            isActive={location.pathname === '/feedback'}
            onClick={() => handleNavigation('/feedback', 'feedback')}
          />
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span className="user-name">User</span>
          </div>
        </div>
      </aside>

      <button className="hamburger-btn" onClick={onToggle}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </>
  );
}

export default Sidebar;