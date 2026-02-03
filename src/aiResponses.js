const responses = {
  hello: "Hi! How can I help you?",
  hi: "Hello! What can I do for you?",
  help: "Sure, let me know what you need help with.",
};

function getAIResponse(message) {
  if (!message) return "Sorry, Did not understand your query!";

  const key = message.toLowerCase().trim();
  return responses[key] || "Sorry, Did not understand your query!";
}

// ✅ BOTH exports (named + default)
export { getAIResponse };
export default getAIResponse;
