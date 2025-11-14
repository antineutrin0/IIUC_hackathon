import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

const ChatbotPage = () => {
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI career assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mock AI response - will be replaced with actual API call
  const getAIResponse = async (userMessage) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock responses based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      return "Based on current job market trends, I recommend focusing on skills like React, Node.js, TypeScript, and cloud technologies. Would you like me to create a personalized learning path for you?";
    } else if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return "I can help you find suitable job opportunities and compare them with your CV. Would you like me to analyze your profile against available positions?";
    } else if (lowerMessage.includes('cv') || lowerMessage.includes('resume')) {
      return "I can help you improve your CV by analyzing it against job requirements. Upload your CV or tell me about your experience, and I'll provide detailed feedback.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help with your career development. You can ask me about job opportunities, skill development, CV improvements, or career advice.";
    } else {
      return "That's an interesting question! I'm here to assist you with career guidance, job matching, skill development, and CV optimization. How can I help you with your career goals?";
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Get AI response
    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Bot className="text-green-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI Career Assistant</h1>
              <p className="text-sm text-gray-600">Ask me anything about your career</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-2xl ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.sender === 'user'
                        ? 'bg-green-600'
                        : 'bg-white border-2 border-green-200'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="text-white" size={20} />
                    ) : (
                      <Bot className="text-green-600" size={20} />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`flex flex-col ${
                      message.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-5 py-3 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-2xl">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-green-200 flex items-center justify-center">
                    <Bot className="text-green-600" size={20} />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none px-5 py-3 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 bg-green-50 rounded-2xl border border-green-200 focus-within:border-green-400 transition-colors">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                rows="1"
                className="w-full bg-transparent px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none resize-none max-h-32"
                style={{ minHeight: '48px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' || isTyping}
              className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${
                inputMessage.trim() === '' || isTyping
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isTyping ? (
                <Loader className="text-white animate-spin" size={24} />
              ) : (
                <Send className="text-white" size={24} />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;