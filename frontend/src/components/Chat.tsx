import React, { useState } from 'react';

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
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const aiMsg: Message = { sender: 'ai', text: data.reply || '...' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Error occurred' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80vw] h-[80vh] mx-auto mt-[4vh] mb-[2vh] flex flex-col justify-between border border-gray-300 rounded-[2vh] p-[2vh] bg-white shadow-md">

  {/* הודעות */}
  <div className="flex flex-col flex-1 overflow-y-auto space-y-[1vh]">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`w-fit max-w-[50vw] px-4 py-2 rounded-[1vw] shadow-md text-[2vh] break-words ${
          msg.sender === 'user'
            ? 'bg-blue-200 self-end'
            : 'bg-gray-200 self-start'
        }`}
      >
        {msg.text}
      </div>
    ))}
    {loading && (
      <div className="text-[1.4vh] text-gray-400 italic animate-pulse">AI is typing...</div>
    )}
  </div>

  {/* קלט */}
  <div className="flex items-center gap-[2vw] mt-[2vh]">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type..."
      className="flex-1 h-[4.5vh] text-[2.5vh] pl-[2vw] rounded-[1.5vh] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
    />
    <button
      onClick={handleSend}
      disabled={loading || !input.trim()}
      className="w-[12vw] h-[4.5vh] text-[2.5vh] bg-blue-600 text-white rounded-[1.5vh] hover:bg-blue-700 disabled:opacity-50"
    >
      Send
    </button>
  </div>

</div>

  );
};

export default ChatUI;
