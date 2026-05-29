"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, CheckCircle, RefreshCw, Bot, ChevronRight, MessageSquareCode } from "lucide-react";
import { allServices } from "@/data/services";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  isHtml?: boolean;
};

type ChatState = "IDLE" | "ASK_CATEGORY" | "ASK_SERVICE" | "ASK_TIME" | "ASK_CONFIRM";

type BookingData = {
  category: string;
  service: string;
  price: string;
  time: string;
};

const CATEGORY_EMOJIS: Record<string, string> = {
  "Cleaning": "✨",
  "Salon": "💅",
  "Repairs": "🔧",
  "Moving": "📦",
  "Laptops": "💻",
  "Mobiles": "📱"
};

const generateMsgId = (sender: string) => {
  return `${sender}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

const generateWelcomeId = () => {
  return `welcome-${Date.now()}`;
};

const generateOrderId = () => {
  return "OSMP-AI-" + Math.floor(Math.random() * 90000 + 10000);
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>("IDLE");
  const [bookingData, setBookingData] = useState<BookingData>({ category: "", service: "", price: "", time: "" });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      text: "I am the OSM AI Agent. I can assist with service routing, infrastructure queries, and instant booking. Type <strong>'book'</strong> to initiate a request.",
      sender: "bot",
      isHtml: true,
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const uniqueCategories = Array.from(new Set(allServices.map((s) => s.category)));
  const filteredServices = allServices.filter(
    (s) => s.category.toLowerCase() === bookingData.category.toLowerCase()
  );

  const addMessage = (text: string, sender: "user" | "bot", isHtml = false) => {
    const newMsg: Message = {
      id: generateMsgId(sender),
      text,
      sender,
      isHtml,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleActionClick = (selectionText: string) => {
    processInput(selectionText);
  };

  const handleReset = () => {
    setChatState("IDLE");
    setBookingData({ category: "", service: "", price: "", time: "" });
    setMessages([
      {
        id: generateWelcomeId(),
        text: "Session reset. How may I assist your business or household today?",
        sender: "bot",
        isHtml: true,
      },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText("");
    processInput(text);
  };

  const processInput = (text: string) => {
    addMessage(text, "user");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let reply = "";
      let newChatState = chatState;
      let newBookingData = { ...bookingData };

      if (chatState === "IDLE") {
        if (lower.includes("book") || lower.includes("order") || lower.includes("service") || lower.includes("hire")) {
          reply = `Initiating booking protocol. Please select a service category:`;
          newChatState = "ASK_CATEGORY";
        } else if (lower.includes("cost") || lower.includes("price") || lower.includes("charge")) {
          reply = "Our pricing is generated dynamically based on infrastructure requirements. Type **'book'** to see standard service rates.";
        } else if (lower.includes("refund") || lower.includes("guarantee")) {
          reply = "We offer a <strong>100% Quality Assurance SLA</strong>. We will dispatch a remediation unit within 48 hours if metrics are not met.";
        } else {
          reply = "Query recognized. As an AI Agent, I can automate your booking process. Type **'book'** to begin.";
        }
      } else if (chatState === "ASK_CATEGORY") {
        const matchedCategory = uniqueCategories.find(
          (c) => c.toLowerCase() === lower || lower.includes(c.toLowerCase())
        ) || text;

        newBookingData.category = matchedCategory;
        const emojis = CATEGORY_EMOJIS[matchedCategory] || "🎯";
        
        reply = `Category ${emojis} <strong>${matchedCategory}</strong> selected.<br><br>Please specify the exact requirement:`;
        newChatState = "ASK_SERVICE";
      } else if (chatState === "ASK_SERVICE") {
        const matchedRow = allServices.find(
          (s) => s.title.toLowerCase() === lower || lower.includes(s.title.toLowerCase()) || text.includes(s.title)
        );

        if (matchedRow) {
          newBookingData.service = matchedRow.title;
          newBookingData.price = matchedRow.price;
        } else {
          newBookingData.service = text;
          newBookingData.price = "TBD";
        }

        reply = `Parameter acquired: <strong>${newBookingData.service}</strong>.<br>Estimated Base Cost: <strong>₹${newBookingData.price}</strong>.<br><br>Select an execution time window:`;
        newChatState = "ASK_TIME";
      } else if (chatState === "ASK_TIME") {
        newBookingData.time = text;
        
        reply = `<div class="space-y-3">
          <div class="font-bold text-teal-700 text-xs tracking-widest uppercase">Deployment Preview</div>
          <div class="bg-teal-50/50 rounded-xl p-3 text-[11px] border border-teal-100 space-y-1.5 font-mono text-teal-950">
            <div class="flex justify-between"><span>Category:</span> <span class="text-teal-900 font-semibold">${newBookingData.category}</span></div>
            <div class="flex justify-between"><span>Service:</span> <span class="text-teal-900 font-semibold">${newBookingData.service}</span></div>
            <div class="flex justify-between"><span>Window:</span> <span class="text-teal-900 font-semibold">${text}</span></div>
            <div class="flex justify-between text-teal-700 font-extrabold mt-2 pt-2 border-t border-teal-100"><span>Est. Cost:</span> <span>₹${newBookingData.price}</span></div>
          </div>
          <div class="text-xs text-teal-600">Click <strong>CONFIRM</strong> to finalize deployment.</div>
        </div>`;
        newChatState = "ASK_CONFIRM";
      } else if (chatState === "ASK_CONFIRM") {
        if (lower.includes("confirm") || lower.includes("yes")) {
          const orderId = generateOrderId();
          reply = `<div class="bg-teal-50 border border-teal-100 p-4 rounded-2xl text-slate-800 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-bold text-teal-700 mb-3 uppercase tracking-wider">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span></span>
              Deployment Authorized
            </div>
            
            <p class="text-[11px] text-slate-600 mb-4">Your request has been routed to the optimal available professional.</p>
            
            <div class="bg-white rounded-xl p-3 text-[10px] border border-teal-100 space-y-2 font-mono text-slate-800">
              <div class="flex justify-between"><span>ID:</span> <strong class="text-teal-700">${orderId}</strong></div>
              <div class="flex justify-between"><span>Agent:</span> <strong class="text-slate-900 truncate">Auto-assigning...</strong></div>
              <div class="flex justify-between"><span>Status:</span> <strong class="text-emerald-600">Processing</strong></div>
            </div>
            
            <div class="mt-4">
              <a href="https://wa.me/919876543210?text=I%20just%20booked%20via%20AI.%20Order%20ID:%20${orderId}" target="_blank" class="block text-center bg-[#25D366] text-white py-2 rounded-lg font-bold text-[10px] hover:bg-[#20bd5a] transition-colors">
                Track on WhatsApp
              </a>
            </div>
          </div>`;
        } else {
          reply = "Process aborted. Session memory cleared.";
        }
        newChatState = "IDLE";
        newBookingData = { category: "", service: "", price: "", time: "" };
      }

      setChatState(newChatState);
      setBookingData(newBookingData);
      addMessage(reply, "bot", true);
    }, 1200);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-50 pointer-events-auto select-none font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquareCode className="h-6 w-6 text-white" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[360px] flex flex-col bg-white border border-teal-100/90 rounded-[2rem] shadow-2xl overflow-hidden z-50 origin-bottom-right"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-teal-100 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 relative">
                  <Bot className="h-5 w-5 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-teal-700"></div>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight text-white mb-0.5">OSM AI Agent</h4>
                  <div className="text-[10px] text-teal-100 font-bold uppercase tracking-wider">v2.0 • ONLINE</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleReset} className="p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 h-[380px] p-5 space-y-4 overflow-y-auto bg-teal-50/10 custom-scrollbar relative">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex relative z-10 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 text-[13px] rounded-2xl leading-relaxed shadow-lg ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-tr-sm"
                        : "bg-teal-50 text-teal-950 rounded-tl-sm border border-teal-100/80"
                    }`}
                  >
                    {msg.isHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: msg.text }} className="prose prose-sm max-w-none text-teal-950 font-medium" />
                    ) : (
                      msg.text
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Action Prompts */}
              {!isTyping && chatState === "ASK_CATEGORY" && (
                <div className="flex flex-col gap-2 mt-2">
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleActionClick(cat)}
                      className="text-xs text-left text-teal-700 border border-teal-100 bg-teal-50/50 hover:bg-teal-50 hover:text-teal-950 hover:border-teal-300 p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span>{CATEGORY_EMOJIS[cat]}</span>
                        <span className="font-medium">{cat}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-teal-500 group-hover:text-teal-700 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {!isTyping && chatState === "ASK_SERVICE" && (
                <div className="flex flex-col gap-2 mt-2">
                  {filteredServices.map((serv) => (
                    <button
                      key={serv.id}
                      onClick={() => handleActionClick(serv.title)}
                      className="text-left text-xs border border-teal-100 bg-teal-50/50 hover:bg-teal-50 p-3 rounded-xl transition-all flex flex-col gap-1 cursor-pointer hover:text-teal-950 group"
                    >
                      <div className="font-semibold text-teal-950 group-hover:text-teal-900">{serv.title}</div>
                      <div className="text-teal-700 font-mono tracking-wider font-extrabold">₹{serv.price}</div>
                    </button>
                  ))}
                </div>
              )}

              {!isTyping && chatState === "ASK_TIME" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {["09:00 AM", "02:00 PM", "06:00 PM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleActionClick(t)}
                      className="text-xs font-mono text-teal-700 border border-teal-100 bg-teal-50/50 hover:bg-teal-600 hover:border-teal-600 hover:text-white px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              {!isTyping && chatState === "ASK_CONFIRM" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleActionClick("CONFIRM")}
                    className="flex-1 flex items-center justify-center gap-2 text-xs text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 font-bold px-4 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    <CheckCircle className="h-4 w-4" /> AUTHORIZE
                  </button>
                  <button
                    onClick={() => handleActionClick("CANCEL")}
                    className="flex-1 text-xs text-teal-700 border border-teal-100 bg-teal-50/50 hover:bg-teal-100/50 px-4 py-3 rounded-xl cursor-pointer hover:text-teal-950"
                  >
                    Abort
                  </button>
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-teal-50 border border-teal-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center space-x-1.5 h-10 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-teal-50 flex items-center gap-3">
              <div className="flex-1 relative bg-teal-50/50 hover:bg-teal-50 border border-teal-100 focus-within:border-teal-400 focus-within:bg-white transition-all flex items-center px-4 h-12 rounded-2xl">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Execute command..."
                  className="flex-1 min-w-0 bg-transparent text-teal-950 text-xs outline-none placeholder-teal-700/60 font-mono"
                />
              </div>
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:from-teal-50/50 disabled:to-teal-50/50 disabled:border disabled:border-teal-100 text-white disabled:text-teal-300 flex items-center justify-center transition-all outline-none cursor-pointer"
              >
                <Send className="h-5 w-5 ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
