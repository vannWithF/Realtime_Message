import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Send, Smile, Paperclip, Menu } from 'lucide-react';

const socket: Socket = io('https://h1l3rq2k-8000.asse.devtunnels.ms/');

interface Message {
    text: string;
    senderId: string;
    timestamp: number;
}

const MessagePages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    // Generate a unique ID for this device/session
    const [deviceId] = useState<string>(() => 
        'device_' + Math.random().toString(36).substr(2, 9)
    );

    useEffect(() => {
        // Listen for incoming messages
        socket.on('chat message', (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const newMessage: Message = {
                text: input.trim(),
                senderId: deviceId,
                timestamp: Date.now()
            };
            socket.emit('chat message', newMessage);
            setInput('');
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto h-screen flex flex-col">
                <div className="flex-1 flex flex-col md:flex-row gap-4 p-2 sm:p-4">
                    {/* Main Chat Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                            <h1 className="text-white text-lg sm:text-xl font-bold">Real-Time Chat</h1>
                            <button 
                                className="md:hidden p-2 rounded-lg hover:bg-blue-700 text-white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.senderId === deviceId ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                >
                                    <div
                                        className={`
                                            max-w-[85%] sm:max-w-[75%] 
                                            px-4 py-2.5 
                                            shadow-sm
                                            ${msg.senderId === deviceId
                                                ? 'bg-blue-500 text-white rounded-2xl rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-2xl rounded-tl-none'
                                            }
                                        `}
                                    >
                                        {msg.text}
                                        <div 
                                            className={`text-xs mt-1 
                                                ${msg.senderId === deviceId 
                                                    ? 'text-blue-100' 
                                                    : 'text-gray-500'
                                                }
                                            `}
                                        >
                                            {new Date(msg.timestamp).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </div>
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