import React, { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ChatbotButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBubble(true), 1500);
        const hideTimer = setTimeout(() => setShowBubble(false), 17000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const hiddenRoutes = ["/chatpage", "/login", "/signup"];

    if (hiddenRoutes.includes(location.pathname)) {
        return null; // do not show button
    }


    return (
        <>
            {/* Floating Text Bubble */}
            {showBubble && (
                <div className="fixed bottom-24 right-6 bg-white shadow-lg px-4 py-2 rounded-xl border text-sm animate-fade-in">
                    👋 Hey! Ask me anything about your career.
                </div>
            )}

            {/* Floating Chatbot Button */}
            <button
                onClick={() => navigate("/chatpage")}
                className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl transition"
            >
                <Bot size={24} />
            </button>
        </>
    );
};

export default ChatbotButton;
