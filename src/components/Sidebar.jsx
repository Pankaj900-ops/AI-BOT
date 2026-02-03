import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href="/">New Chat</a>
      <a href="/history">Past Conversations</a>
    </div>
  );
};

export default Sidebar;
