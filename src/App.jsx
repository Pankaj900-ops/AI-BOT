import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ChatView from "./components/ChatView";
import HistoryView from "./components/HistoryView";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [chatKey, setChatKey] = useState(0);

  return (
    <div className="App">
      <header>
        <h1>Bot AI</h1>
      </header>
      <Sidebar onNewChat={() => setChatKey((k) => k + 1)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ChatView key={chatKey} />} />
          <Route path="/history" element={<HistoryView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
