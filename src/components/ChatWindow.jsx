import React, { useEffect, useRef } from "react";

function ChatWindow({ messages, isLoading = false }) { // default isLoading to false
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]); // dependency array always has 2 items

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <div className={`message-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="message ai">
          <div className="message-bubble ai">Generating response...</div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;
