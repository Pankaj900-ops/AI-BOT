// src/Utils/helpers.js
import aiResponses from '../components/aiResponses.js';

export const getAIResponse = (question) => {
  const lowerQuestion = question.toLowerCase().trim();

  for (const key in aiResponses) {
    if (lowerQuestion.includes(key)) {
      return aiResponses[key];
    }
  }

  return "Sorry, did not understand your query!";
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

export const getAllFeedback = () => {
  const data = localStorage.getItem("feedback");
  return data ? JSON.parse(data) : [];
};

export const getConversations = () => {
  const data = localStorage.getItem("conversations");
  return data ? JSON.parse(data) : [];
};

export const deleteConversation = (id) => {
  const conversations = getConversations();
  const updated = conversations.filter(c => c.id !== id);
  localStorage.setItem("conversations", JSON.stringify(updated));
  return updated;
};

export const saveConversation = (conversation) => {
  const conversations = getConversations();
  localStorage.setItem("conversations", JSON.stringify([...conversations, conversation]));
};

export const saveFeedback = (feedbackData) => {
  const feedback = getAllFeedback();
  localStorage.setItem("feedback", JSON.stringify([...feedback, feedbackData]));
};