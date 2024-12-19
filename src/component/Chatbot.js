'use client'; // This directive is required for React hooks in Next.js

import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      // Call the Next.js API route which forwards the request to the Flask backend
      const response = await fetch('/api/chatbot.py', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123', message: input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      setMessages([
        ...messages,
        userMessage,
        { sender: 'bot', text: data.reply || 'No response from the bot.' },
      ]);
    } catch (error) {
      console.error('Failed to fetch response:', error);
      setMessages([
        ...messages,
        userMessage,
        { sender: 'bot', text: 'Failed to fetch response. Please try again.' },
      ]);
    }

    setInput('');
  };

  return (
    <div>
      {/* Toggle Chatbot */}
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Chat with SolAI'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            border: '1px solid #ccc',
            padding: '10px',
            background: '#fff',
            maxWidth: '300px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              maxHeight: '300px',
              overflowY: 'scroll',
              marginBottom: '10px',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  margin: '5px 0',
                }}
              >
                <p
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    background: msg.sender === 'user' ? '#007bff' : '#f1f1f1',
                    color: msg.sender === 'user' ? '#fff' : '#000',
                    maxWidth: '70%',
                  }}
                >
                  <strong>
                    {msg.sender === 'user' ? 'You' : 'SolAI'}:
                  </strong>{' '}
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              width: '75%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginRight: '10px',
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: '8px 12px',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
