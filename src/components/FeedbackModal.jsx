import React, { useState } from "react";
import "./FeedbackModal.css";

const FeedbackModal = ({ setShowFeedback, setConversations, conversations }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    const updated = [...conversations];
    updated[updated.length - 1].feedback = { rating, comments };
    setConversations(updated);
    localStorage.setItem("conversations", JSON.stringify(updated)); // Persist feedback
    setShowFeedback(false);
  };

  return (
    <div className="feedback-modal">
      <h3>Provide Feedback</h3>

      <div className="rating">
        {[1, 2, 3, 4, 5].map((r) => (
          <span
            key={r}
            className={r <= rating ? "selected" : ""}
            onClick={() => setRating(r)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Enter your comments..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <div className="feedback-buttons">
        <button onClick={handleSubmit}>Submit Feedback</button>
        <button onClick={() => setShowFeedback(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default FeedbackModal;
