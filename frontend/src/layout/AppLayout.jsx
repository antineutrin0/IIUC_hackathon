import React from "react";
import { Outlet } from "react-router-dom";
import ChatbotButton from "../components/common/ChatbotButton";

const AppLayout = () => {
  return (
    <>
      {/* All routed pages render here */}
      <Outlet />

      {/* Floating chatbot on every page */}
      <ChatbotButton
        onClick={() => console.log("Chatbot opened")}
      />
    </>
  );
};

export default AppLayout;
