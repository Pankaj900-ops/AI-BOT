import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import HistoryView from './components/HistoryView';
import FeedbackView from './components/FeedbackView';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('chat');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={toggleSidebar}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<ChatView />} />
            <Route path="/history" element={<HistoryView />} />
            <Route path="/feedback" element={<FeedbackView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;