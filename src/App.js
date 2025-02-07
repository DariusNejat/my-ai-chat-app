// src/App.js
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (messageText) => {
    // Add the user message
    const userMessage = { text: messageText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate an AI response (to be replaced with your backend integration)
    setTimeout(() => {
      const aiMessage = { text: "This is a dummy AI response.", sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
