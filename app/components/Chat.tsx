'use client';
import { useChat } from 'ai/react'
import { useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { Bot } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';


const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
      keepLastMessageOnError: true,
      api: '/api/chat',
    });

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const scroll = () => {
        if (chatContainerRef.current) {
            const { offsetHeight, scrollHeight, scrollTop } = chatContainerRef.current;
            if(scrollHeight >= scrollTop + offsetHeight){
                chatContainerRef.current.scrollTo(0, scrollHeight);
            }
    }
}

    useEffect(() => {
        scroll();
    }, [messages]);

    const renderResponse = () => {
        return (
            <div className='p-10'>
            {messages.map((message, index) => (
                <div 
                key={message.id}
                className={`chat-line ${message.role === 'user' ? 'user-chat' : 'ai-chat'} flex items-center justify-center mb-4`}>
                {message.role === 'user' ? <User className='w-4 h-4 mr-2' /> : <Bot className='w-4 h-4 mr-2' />}
                <div className='ml-4 w-11/12'>
                    <p className={`message p-3 rounded-lg  ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}>{message.content}</p>
                    {index < messages.length - 1 && (
                <div className="horizontal-line my-2" />
              )}
                </div>
                </div>
            ))}
            </div>
        );
    }

  
    return (
        <div className="chat flex flex-col h-full p-10">
        {/* Chat messages container with overflow handling */}
        <div
          ref={chatContainerRef}
          className="flex-grow p-4 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 150px)' }} // Adjust height as needed
        >
          {renderResponse()}
        </div>
  
        {/* Input field fixed at the bottom */}
        <form
          onSubmit={handleSubmit}
          className="chat-form flex items-center bg-gray-800 p-3 rounded-full mx-4 mb-4"
        >   
          <input
            name="input-field"
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="How can I help?"
            className="flex-grow bg-transparent border-none text-white placeholder-gray-500 focus:outline-none px-3"
            autoComplete="off"
          />
          <div className="relative absolute left-0 mt-0 w-30 md:w-[150px] bg-gray-800 text-white rounded-md shadow-lg mx-4">

            </div>
            <button type="submit">
            <SendHorizontal className='w-4 h-4' />
          </button>
        </form>
      </div>
    );
  }


export default Chat;
