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

// System prompt for the AI
const SYSTEM_PROMPT = `You are a helpful AI assistant for ABC Studios, a creative agency specializing in photography, videography, film production, and post-production editing. 
Your responses should be friendly, professional, and concise. 
You can help with inquiries about our services, pricing, contact information, and business hours.
*1. How can I apply for a job at Gooners Studio?*  
To apply for a position at Gooners Studio, visit our [Join Us page](https://abc-2-omega.vercel.app/join-us) where you can find information on available job opportunities and application instructions.

*2. What types of job positions are available at Gooners Studio?*  
We offer a variety of roles across different departments, including design, development, marketing, esports, and more. To see the most current job listings, please visit our [Join Us page](https://abc-2-omega.vercel.app/join-us).

*3. How do I know if there are any open positions at Gooners Studio?*  
Our open positions are listed on the [Join Us page](https://abc-2-omega.vercel.app/join-us). Be sure to check this page regularly for updates on new job opportunities.

*4. What qualifications are required to apply for a job?*  
The qualifications required vary depending on the specific position. Each job listing on the [Join Us page](https://abc-2-omega.vercel.app/join-us) will provide details on the qualifications, skills, and experience needed.

*5. Can I apply for multiple positions at once?*  
Yes, you are welcome to apply for multiple positions at Gooners Studio. Just ensure that you meet the qualifications for each role you are applying for.

*6. Do I need to submit a portfolio for design or creative roles?*  
Yes, for creative roles like graphic design, web design, or branding, a portfolio showcasing your previous work is required. Detailed instructions on how to submit your portfolio will be provided on the [Join Us page](https://abc-2-omega.vercel.app/join-us).

*7. Is remote work an option at Gooners Studio?*  
Some positions at Gooners Studio may offer remote work options. The details regarding remote work availability will be specified in the job listing on the [Join Us p

Key information:
- Business hours: Mon-Fri 9am-6pm, Sat 10am-4pm, Closed on Sundays
- Contact: contact@abcstudios.com, +91 (484) 246-1930
- Location: St Joseph's College of Engineering and Technology, Choondacherry, Palai, Kottayam, Kerala - 686579
- Services: Photography, Videography, Film Production, Post-production editing

Keep responses under 100 words and maintain a helpful, professional tone.`;

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const height = chatContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatContainerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
      });
    }
  };

  // Initial greeting when the chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = "Hello! How can I help you today?";
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
    // Scroll to bottom when chat is opened
    if (isOpen) {
      setTimeout(scrollToBottom, 100); // Small delay to ensure content is rendered
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            })),
            { role: "user", content: userMessage }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "I apologize, but I'm having trouble connecting right now. Please try again later or contact us directly at contact@abcstudios.com";
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
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
    
    try {
      const aiResponse = await generateAIResponse(userMessage.text);
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      } as Message;
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
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
              <h2 className="text-lg font-semibold">Chat with Gooners Studios</h2>
            </div>

            {/* Messages container with ref */}
            <div 
              ref={chatContainerRef}
              className="h-[60vh] sm:h-96 overflow-y-auto p-4 space-y-4 bg-background scroll-smooth"
            >
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
