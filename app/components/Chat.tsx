'use client';
import { useState } from 'react';
import { User, Bot, SendHorizontal } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Internship support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');

  // Function to handle sending messages
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!message.trim()) return; // Prevent sending empty messages

    const userMessage = { role: 'user', content: message };

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage(''); // Clear input field

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.body) throw new Error('Response body is null');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      // Read and process response stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        // Update last assistant message with new content
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessageIndex = updatedMessages.length - 1;
          updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            content: result,
          };
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            {message.role === 'user' ? <User className="w-4 h-4 mr-2" /> : <Bot className="w-4 h-4 mr-2" />}
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="input-field"
        />
        <button type="submit" className="send-button">
          <SendHorizontal className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
