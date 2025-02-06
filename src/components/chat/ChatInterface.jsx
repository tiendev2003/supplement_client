"use client";

import { Menu, Plus, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";

export function ChatInterface({ onOpenSidebar }) {
  const { currentChat, addMessage } = useChat();
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-3.5");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const chatHistory = [
          { content: "Hello", role: "user" },
          { content: "Hi there!", role: "assistant" },
        ];
        chatHistory.forEach((message) => {
          addMessage(message.content, message.role);
        });
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage(input, "user");
    setIsTyping(true);

    try {
      if (currentChat) {
        // Existing chat
        setTimeout(() => {
          addMessage("This is a simulated response", "assistant");
          setIsTyping(false);
        }, 1000);
      } else {
        // New chat
        setMessages((prev) => [...prev, { content: input, role: "user" }]);
        setTimeout(() => {
          const botResponse = "This is a response from the AI";
          setMessages((prev) => [...prev, { content: botResponse, role: "assistant" }]);
          setIsTyping(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);
      addMessage("Failed to get AI response", "assistant");
      setIsTyping(false);
    }

    setInput("");
  };

  const messagesToDisplay = currentChat ? currentChat.messages : messages;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center border-b px-4 h-14">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="ml-4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4">
        {!currentChat && messagesToDisplay.length === 0 && !isTyping ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-8">Tôi có thể giúp gì cho bạn?</h1>
          </div>
        ) : (
          <>
            {messagesToDisplay.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] px-4 py-2 rounded-lg
                    ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block max-w-[80%] px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce mr-1"></span>
                    <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce mr-1"></span>
                    <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Plus className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhắn tin cho ChatGPT"
              className="w-full px-4 py-2 pr-20 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}