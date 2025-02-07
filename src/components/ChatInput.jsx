// src/components/ChatInput.jsx
import React, { useState } from "react";
import "./ChatInput.css";

function ChatInput({ onSendMessage, disabled }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    onSendMessage(inputText);
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "Please wait..." : "Type a message..."}
        className="chat-input-field"
      />
      <button type="submit" className="send-button" disabled={disabled}>
        {/* Inline SVG for a send icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
}

export default ChatInput;
