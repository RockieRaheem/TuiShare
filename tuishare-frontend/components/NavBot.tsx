"use client";
import React, { useState, useRef, useEffect } from "react";

const NAVBOT_GREETING = "\uD83D\uDC4B Hello there! Need help navigating the site? Or want a joke while you're at it? \uD83D\uDE04";

export default function NavBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: NAVBOT_GREETING }
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  function addMessage(sender: "user" | "bot", text: string) {
    setMessages(msgs => [...msgs, { sender, text }]);
  }

  function sendMessage() {
    if (!input.trim()) return;
    addMessage("user", input);
    const userText = input;
    setInput("");

    // Tuishare data for context
    const tuishareData = {
      mission: "Empowering African students with seamless, secure, and accountable tuition payments.",
      features: "Role-based registration and login (Supporter, Student, School), modern dashboard (KPIs, charts, recent transactions), tuition payment management, impact tracking, onboarding & Web3 explainer, accessible responsive UI, downloadable quick start guide.",
      kpis: "Total Tuition: $120,000; Active Users: 320; NPS: 72",
      roles: "Supporters: 120, Students: 150, Schools: 50",
      schools: "Greenfield High ($32,000), Sunrise Academy ($25,000), Unity College ($18,000)",
      transactions: "Jane Doe ($500, Student), Unity College ($2,000, School), John Smith ($1,000, Supporter)",
      contact: "info@tuishare.com"
    };

    const lower = userText.toLowerCase();
    let answer = "";
    // Prioritize more specific matches first
    if (/top school|top\s+schools|best school|which (is|are) the top|school with/i.test(lower)) {
      answer = `Top Schools: ${tuishareData.schools}`;
    } else if (/user role|roles|how many (supporter|student|school)|number of (supporter|student|school)/i.test(lower)) {
      answer = `User Roles: ${tuishareData.roles}`;
    } else if (/mission|what.*tuishare|about/.test(lower)) {
      answer = `Mission: ${tuishareData.mission}`;
    } else if (/feature|what can i do|what does this site offer|services|what can this site do|site features/i.test(lower)) {
      answer = `Features: ${tuishareData.features}`;
    } else if (/kpi|stat|number|how many|active user|tuition|nps/.test(lower)) {
      answer = `KPIs: ${tuishareData.kpis}`;
    } else if (/transaction|recent|payment|history|last payment|latest transaction/i.test(lower)) {
      answer = `Recent Transactions: ${tuishareData.transactions}`;
    } else if (/contact|email|support|how do i reach|how to contact|get in touch/i.test(lower)) {
      answer = `Contact: ${tuishareData.contact}`;
    } else if (/joke|funny|laugh|make me laugh|tell me a joke/i.test(lower)) {
      answer = "Why did the student eat his homework? Because his teacher said it was a piece of cake! 🍰";
    } else {
      answer = "Sorry, I can only answer questions about Tuishare's mission, features, KPIs, user roles, top schools, recent transactions, or contact info.";
    }
    addMessage("bot", answer);
  }

  // Voice-to-text
  function handleVoice() {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.onresult = function(event: any) {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setTimeout(sendMessage, 100);
    };
    recognition.start();
  }

  return (
    <div className="navbot-container">
      <div className="chatbot-header">🧭 NavBot - Your Assistant</div>
      <div className="chatbot-messages" id="chat-messages" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={e => { if (e.key === "Enter") sendMessage(); if (e.key === "v") handleVoice(); }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style jsx>{`
        .navbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          overflow: hidden;
          animation: pop-in 0.5s ease;
          z-index: 10000;
        }
        @keyframes pop-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .chatbot-header {
          background-color: #0077ff;
          color: white;
          padding: 10px 15px;
          font-weight: bold;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }
        .chatbot-messages {
          padding: 15px;
          height: 250px;
          overflow-y: auto;
        }
        .chatbot-input {
          display: flex;
          border-top: 1px solid #ccc;
        }
        .chatbot-input input {
          flex: 1;
          padding: 10px;
          border: none;
          border-bottom-left-radius: 20px;
        }
        .chatbot-input button {
          padding: 10px;
          background-color: #0077ff;
          color: white;
          border: none;
          border-bottom-right-radius: 20px;
          cursor: pointer;
        }
        .message {
          margin-bottom: 10px;
        }
        .user {
          text-align: right;
          color: #0077ff;
        }
        .bot {
          text-align: left;
        }
      `}</style>
    </div>
  );
}
