"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaRegComment, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

// Common responses for the bot
const BOT_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Welcome to ABC Studios! How may I help you?",
  ],
  services: [
    "We offer a wide range of services including photography, videography, film production, and post-production editing.",
    "Our services include professional photo shoots, video production, film making, and editing services.",
  ],
  contact: [
    "You can reach us at contact@abcstudios.com or call us at +91 (484) 246-1930.",
    "Feel free to visit our office at St Joseph's College of Engineering and Technology, Choondacherry, Palai, Kottayam, Kerala - 686579 or email us at contact@abcstudios.com.",
  ],
  pricing: [
    "Our pricing varies based on the project requirements. Please email us at contact@abcstudios.com for a custom quote.",
    "We offer customized pricing based on your specific needs. Please reach out to us for a detailed quotation.",
  ],
  hours: [
    "We're open Monday to Friday, 9am to 6pm, Saturday 10am to 4pm. Closed on Sundays.",
    "Our working hours are 9am to 6pm on weekdays and 10am to 4pm on Saturdays. We're closed on Sundays.",
  ],
  fallback: [
    "I'm not sure I understand. Could you rephrase that?",
    "I'm still learning! Could you try asking in a different way?",
    "I didn't quite catch that. Can you provide more details?",
  ],
};

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting when the chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)];
      setTimeout(() => {
        setMessages([
          {
            id: Date.now().toString(),
            text: greeting,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input field when chat is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    if (normalizedMessage.match(/hi|hello|hey|howdy/i)) {
      return BOT_RESPONSES.greeting[Math.floor(Math.random() * BOT_RESPONSES.greeting.length)];
    } else if (normalizedMessage.match(/service|offer|provide|do you do|photograph|videograph|film|editing/i)) {
      return BOT_RESPONSES.services[Math.floor(Math.random() * BOT_RESPONSES.services.length)];
    } else if (normalizedMessage.match(/contact|reach|email|phone|call|address|location|office/i)) {
      return BOT_RESPONSES.contact[Math.floor(Math.random() * BOT_RESPONSES.contact.length)];
    } else if (normalizedMessage.match(/price|cost|how much|fee|charge|quote|pricing/i)) {
      return BOT_RESPONSES.pricing[Math.floor(Math.random() * BOT_RESPONSES.pricing.length)];
    } else if (normalizedMessage.match(/hours|time|when|open|schedule|weekend|saturday|sunday/i)) {
      return BOT_RESPONSES.hours[Math.floor(Math.random() * BOT_RESPONSES.hours.length)];
    } else {
      return BOT_RESPONSES.fallback[Math.floor(Math.random() * BOT_RESPONSES.fallback.length)];
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    } as Message;
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      } as Message;
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("fixed bottom-[100px] sm:right-6 right-4 z-[1000] ", className)}>
      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChat}
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 px-5 shadow-lg font-medium"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
      >
        {isOpen ? (
          <>
            <FaTimes size={16} />
            <span className="text-sm">Close</span>
          </>
        ) : (
          <>
            <FaRegComment size={16} />
            <span className="text-sm">Chat</span>
          </>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-[400px] bg-card shadow-lg rounded-lg overflow-hidden border border-border/10"
          >
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-4">
              <h2 className="text-lg font-semibold">Chat with ABC Studios</h2>
            </div>

            {/* Messages container */}
            <div className="h-[60vh] sm:h-96 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[80%] space-y-1",
                    message.sender === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.text}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-muted-foreground"
                >
                  <span className="text-sm">Typing</span>
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-card border-t border-border/10">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-background text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <motion.button
                  type="submit"
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoSend size={20} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
