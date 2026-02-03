import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onNewChat }) => {
  return (
    <div className="sidebar">
      <Link to="/" onClick={onNewChat}>
        New Chat
      </Link>
      <Link to="/history">Past Conversations</Link>
    </div>
  );
};

export default Sidebar;
