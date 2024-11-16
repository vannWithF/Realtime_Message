import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Smile, Paperclip, Menu } from 'lucide-react';

const socket: Socket = io('https://h1l3rq2k-8000.asse.devtunnels.ms/');

const MessagePages: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        socket.on('chat message', (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            socket.emit('chat message', input);
            setInput('');
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto h-screen flex flex-col">
                <div className="flex-1 flex flex-col md:flex-row gap-4 p-2 sm:p-4">
                    {/* Sidebar - Only visible on larger screens */}
                    <div className="hidden md:flex flex-col w-64 bg-white rounded-xl shadow-lg p-4 space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Chats</h2>
                        {/* Add sidebar content here */}
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                            <h1 className="text-white text-lg sm:text-xl font-bold">Real-Time Chat</h1>
                            {/* Mobile menu button */}
                            <button 
                                className="md:hidden p-2 rounded-lg hover:bg-blue-700 text-white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Mobile menu dropdown */}
                        {isMenuOpen && (
                            <div className="md:hidden bg-white border-b p-4">
                                {/* Add mobile menu content here */}
                                <div className="space-y-2">
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Settings</a>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Profile</a>
                                </div>
                            </div>
                        )}

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} animate-fade-in`}
                                >
                                    <div
                                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm
                                            ${index % 2 === 0
                                                ? 'bg-gray-100 rounded-tl-none'
                                                : 'bg-blue-500 text-white rounded-tr-none'
                                            }
                                        `}
                                    >
                                        {msg}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Form */}
                        <div className="border-t p-2 sm:p-4 bg-white">
                            <form 
                                onSubmit={sendMessage}
                                className={`flex items-center gap-2 p-2 rounded-xl bg-white border-2 transition-all duration-200 ${
                                    isFocused ? 'border-blue-400 shadow-lg' : 'border-gray-200 shadow-sm'
                                }`}
                            >
                                <button
                                    type="button"
                                    className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Paperclip size={20} className="text-gray-500" />
                                </button>

                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                                />

                                <button
                                    type="button"
                                    className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Smile size={20} className="text-gray-500" />
                                </button>

                                <button
                                    type="submit"
                                    className={`p-3 rounded-full transition-all duration-200 ${
                                        input.trim() 
                                            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!input.trim()}
                                >
                                    <Send size={20} className={`transform transition-transform ${input.trim() ? 'rotate-0' : 'rotate-6'}`} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePages;