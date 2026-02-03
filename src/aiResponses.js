const responses = {
  hello: "Hi! How can I help you?",
  hi: "Hello! What can I do for you?",
  help: "Sure, let me know what you need help with.",
  "hi, what is the weather?": "I don't have access to real-time weather data. You can check a weather website or app for the current forecast.",
  "can you explain restful apis?":
    "RESTful APIs are designed around the REST (Representational State Transfer) architecture, which uses HTTP requests to access and manipulate data. They follow a stateless, client-server, cacheable communications protocol.",
};

function getAIResponse(message) {
  if (!message) return "Sorry, Did not understand your query!";

  const key = message.toLowerCase().trim();
  return responses[key] || "Sorry, Did not understand your query!";
}

// ✅ BOTH exports (named + default)
export { getAIResponse };
export default getAIResponse;
