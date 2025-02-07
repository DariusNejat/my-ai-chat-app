// src/components/ChatMessage.jsx
import React from 'react';

const ChatMessage = ({ message }) => {
  const messageClass = message.sender === 'user' ? 'message user' : 'message ai';
  return (
    <div className={messageClass}>
      <div className="message-text">{message.text}</div>
    </div>
  );
};

export default ChatMessage;
