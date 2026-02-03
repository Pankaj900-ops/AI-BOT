import aiResponses from "../aiResponses";

const STORAGE_KEY = "conversations";

// --------------------
// AI RESPONSE HANDLER
// --------------------
export const getAIResponse = (question) => {
  const key = question.toLowerCase().trim();
  return (
    aiResponses[key] ||
    "Sorry, Did not understand your query!"
  );
};

// --------------------
// LOCAL STORAGE HELPERS
// --------------------
export const getConversations = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveConversation = (conversation) => {
  const conversations = getConversations();
  conversations.push(conversation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
};

export const deleteConversation = (id) => {
  const updated = getConversations().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
