import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatView from "./components/ChatView";
import HistoryView from "./components/HistoryView";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />

        <Routes>
          <Route path="/" element={<ChatView />} />
          <Route path="/history" element={<HistoryView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
