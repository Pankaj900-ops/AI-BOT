import React, { useState, useEffect } from 'react';
import { getAllFeedback } from '../Utils/helpers';
import './FeedbackView.css';

function FeedbackView() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');

  useEffect(() => {
    loadFeedback();
  }, []);

  useEffect(() => {
    filterFeedback();
  }, [feedbackList, selectedRating]);

  const loadFeedback = () => {
    const data = getAllFeedback();
    setFeedbackList(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const filterFeedback = () => {
    if (selectedRating === 'all') {
      setFilteredFeedback(feedbackList);
    } else {
      const rating = parseInt(selectedRating);
      setFilteredFeedback(feedbackList.filter(f => f.rating === rating));
    }
  };

  const getRatingStats = () => {
    const stats = {
      total: feedbackList.length,
      average: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };

    if (feedbackList.length === 0) return stats;

    let sum = 0;
    feedbackList.forEach(f => {
      sum += f.rating;
      stats.distribution[f.rating]++;
    });

    stats.average = (sum / feedbackList.length).toFixed(1);
    return stats;
  };

  const stats = getRatingStats();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={i < rating ? '#fbbf24' : 'none'}
        stroke="#fbbf24"
        strokeWidth="2"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="feedback-view">
      <div className="feedback-header">
        <h2>Feedback Overview</h2>
      </div>

      <div className="feedback-content">
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Feedback</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{stats.average}</h3>
              <p>Average Rating</p>
            </div>
          </div>

          <div className="rating-distribution">
            <h4>Rating Distribution</h4>
            <div className="distribution-bars">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = stats.distribution[rating];
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={rating} className="distribution-row">
                    <span className="rating-label">{rating} ⭐</span>
                    <div className="bar-container">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="rating-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="feedback-list-section">
          <div className="filter-controls">
            <label htmlFor="rating-filter">Filter by Rating:</label>
            <select
              id="rating-filter"
              className="rating-filter"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="feedback-list">
            {filteredFeedback.length === 0 ? (
              <div className="empty-feedback">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeWidth="2" />
                </svg>
                <h3>No Feedback Yet</h3>
                <p>Feedback will appear here once conversations are saved</p>
              </div>
            ) : (
              filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="feedback-card">
                  <div className="feedback-card-header">
                    <div className="rating-stars">
                      {renderStars(feedback.rating)}
                    </div>
                    <span className="feedback-date">{formatDate(feedback.timestamp)}</span>
                  </div>
                  
                  {feedback.feedback && (
                    <div className="feedback-text">
                      <p>{feedback.feedback}</p>
                    </div>
                  )}

                  <div className="feedback-meta">
                    <span className="meta-label">Conversation ID:</span>
                    <span className="meta-value">{feedback.conversationId}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackView;