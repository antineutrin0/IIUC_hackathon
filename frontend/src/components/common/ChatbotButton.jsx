import React from "react";
import { Bot } from "lucide-react";

const ChatbotButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-15 right-15 
        bg-green-600 text-white
        p-4 rounded-full shadow-lg 
        hover:bg-green-700 
        transition-colors
        flex items-center justify-center
        z-50
      "
    >
      <Bot size={24} />
    </button>
  );
};

export default ChatbotButton;
