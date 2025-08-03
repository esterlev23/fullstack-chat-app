import React, { useState } from 'react';
import { ArrowUpCircle } from 'lucide-react';
import MarkedReact from 'marked-react';
import DOMPurify from 'dompurify';

import { ChatRequest } from '../interfaces/chat';
import { sendChatMessage } from '../services/chatApi';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const ChatUI: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {

    if (!input.trim()) return;

    const userMsg: Message = { sender: 'user', text: input };
    const chatReq: ChatRequest = { message: input }

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await sendChatMessage(chatReq).then(data => {
      const aiMsg: Message = { sender: 'ai', text: data.response || '...' };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    })
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        setInput((prev) => prev + '\n');
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  return (
    <div className="w-[80vw] h-[80vh] mx-auto mt-[4vh] mb-[2vh] flex flex-col justify-between border border-gray-300 rounded-[2vh] p-[2vh] bg-white shadow-md">
      <div className="flex flex-col flex-1 overflow-y-auto space-y-[1vh]">
        {messages.map((msg, i) => {
          const cleanText = DOMPurify.sanitize(msg.text)
          return (
            <div
              key={i}
              className={`prose max-w-[85vw] sm:max-w-[60vw] px-4 py-2 rounded-[1vw] shadow-md text-[2vh] break-words
               ${msg.sender === 'user' ?
                  'bg-blue-100 self-end' :
                  'bg-gray-200 self-start'
                }`}
            >
              <MarkedReact>{cleanText}</MarkedReact>
            </div>
          );
        })}
        {loading && (
          <div className="text-[1.4vh] text-gray-400 italic animate-pulse">AI is typing...</div>
        )}
      </div>
      <div className="flex items-center gap-[2vw] mt-[2vh]">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type markdown here..."
          onKeyDown={handleKeyDown}
          rows={3}
          className="flex-1 min-h-[4.5vh] max-h-[30vh] bg-gray-50 text-[2.2vh] pl-[2vw] py-[1.2vh] rounded-[1.5vh] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-inner transition duration-200"
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="w-[6vh] h-[6vh] bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 transition duration-200"
        >
          <ArrowUpCircle className="w-[3vh] h-[3vh]" />
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
