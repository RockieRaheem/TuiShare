"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";

import { useRouter } from "next/navigation";

export default function ChatbotAssistant({ page }: { page: string }) {
  const router = useRouter();
  const [showWeb3Modal, setShowWeb3Modal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: `Hi there! 👋 How can I assist you on the ${page} page?` }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  function addMessage(text: string, sender: "bot" | "user" = "bot") {
    setMessages(msgs => [...msgs, { sender, text }]);
  }

  const intents = [
    {
      keywords: ["web3", "blockchain"],
      response: "Web3 is a new way of using the internet that gives you more control, privacy, and security. Click 'Web3 Explainer' for more info.",
      action: () => setTimeout(() => setShowWeb3Modal(true), 800),
    },
    {
      keywords: ["onboarding", "guide", "help"],
      response: "Need onboarding help? Click the 'Onboarding Help' button below for a step-by-step guide.",
      action: () => setTimeout(() => setShowOnboarding(true), 800),
    },
    {
      keywords: [
        "register student", "student register", "sign up student", "student signup", "enroll student", "student enrollment",
        "join as student", "student join", "student registration", "student sign up", "student sign-up", "student sign-up form",
        "apply as student", "student application", "student create account", "student open account", "student join now",
        "student get started", "student onboarding", "student new account", "student start", "student begin", "student create profile",
        // ...
        // The following is a programmatically generated sample for demonstration:
        ...Array.from({length: 980}, (_, i) => `student keyword ${i+1}`)
      ],
      response: [
        "Navigating to Student Registration...",
        "Taking you to the student sign up page!",
        "Redirecting to student registration 🚀"
      ],
      action: () => setTimeout(() => router.push("/student/register"), 1000),
    },
    {
      keywords: ["register supporter", "supporter register"],
      response: "Navigating to Supporter Registration...",
      action: () => setTimeout(() => router.push("/supporter/register"), 1000),
    },
    {
      keywords: ["register school", "school register"],
      response: "Navigating to School Registration...",
      action: () => setTimeout(() => router.push("/school/register"), 1000),
    },
    {
      keywords: ["login student"],
      response: "Navigating to Student Login...",
      action: () => setTimeout(() => router.push("/student/login"), 1000),
    },
    {
      keywords: ["login supporter"],
      response: "Navigating to Supporter Login...",
      action: () => setTimeout(() => router.push("/supporter/login"), 1000),
    },
    {
      keywords: ["login school"],
      response: "Navigating to School Login...",
      action: () => setTimeout(() => router.push("/school/login"), 1000),
    },
    {
      keywords: ["dashboard"],
      response: "Navigating to Dashboard...",
      action: () => setTimeout(() => router.push("/dashboard"), 1000),
    },
    {
      keywords: ["about"],
      response: "Scrolling to About section...",
      action: () => {
        const el = document.getElementById("about");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      keywords: ["contact"],
      response: "Scrolling to Contact section...",
      action: () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      keywords: ["service", "feature"],
      response: "Scrolling to Services section...",
      action: () => {
        const el = document.getElementById("services");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      keywords: ["home", "landing", "main page"],
      response: "Scrolling to Home section...",
      action: () => {
        const el = document.getElementById("home");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input, "user");
    // Normalize input
    const userText = input.trim().toLowerCase();
    const originalInput = input.trim();
    setInput("");

    // Debug: log input and intents
    console.log("User input:", userText);
    let matched = false;
    for (const intent of intents) {
      console.log("Checking intent:", intent.keywords);
      if (intent.keywords.some(kw => userText.includes(kw))) {
        console.log("Matched intent:", intent.keywords);
        // Support random response variations
        if (Array.isArray(intent.response)) {
          const resp = intent.response[Math.floor(Math.random() * intent.response.length)];
          addMessage(resp, "bot");
        } else {
          addMessage(intent.response, "bot");
        }
        intent.action?.();
        matched = true;
        break;
      }
    }
    if (!matched) {
      console.log("No intent matched, asking assistant...");
      setIsLoading(true);
      const startTime = Date.now();
      
      // Use the assistant API for unmatched queries
      fetch('/api/ask-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: originalInput })
      })
      .then(response => response.json())
      .then(data => {
        const responseTime = Date.now() - startTime;
        setIsLoading(false);
        if (data.answer) {
          // Show response time for testing
          const timeInfo = responseTime < 3000 ? ` ⚡ (${responseTime}ms)` : ` ⏱️ (${responseTime}ms)`;
          addMessage(data.answer + timeInfo, "bot");
        } else {
          addMessage("Sorry, I couldn't find an answer to that question.", "bot");
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Assistant API error:', error);
        addMessage("Sorry, I'm having trouble right now. Please try again in a moment.", "bot");
      });
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{
      position: "fixed",
      bottom: 16,
      right: 16,
      width: 260,
      background: "#fff",
      borderRadius: 14,
      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontSize: 14,
      border: "1px solid #e2e8f0",
      animation: "fadeIn 0.5s"
    }}>
      {/* Web3 Explainer Modal */}
      {showWeb3Modal && (
        <div style={{
          position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 24, maxWidth: 340, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>What is Web3?</h3>
            <p style={{ fontSize: 15, marginBottom: 8 }}>
              Web3 is a new generation of the internet that uses blockchain technology to give you more control, privacy, and security. It allows for direct, secure transactions and data sharing without relying on a single company or authority.
            </p>
            <ul style={{ fontSize: 14, marginBottom: 8 }}>
              <li>• More privacy and control over your data</li>
              <li>• Secure, transparent transactions</li>
              <li>• No single point of failure</li>
            </ul>
            <p style={{ fontSize: 14, marginBottom: 8 }}>Want to learn more? <a href="https://ethereum.org/en/web3/" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>Read this beginner's guide</a>.</p>
            <button style={{ marginTop: 8, background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", cursor: "pointer" }} onClick={() => setShowWeb3Modal(false)}>Close</button>
          </div>
        </div>
      )}
      {/* Onboarding Modal */}
      {showOnboarding && (
        <div style={{
          position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 10000,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 24, maxWidth: 340, boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Getting Started</h3>
            <ol style={{ fontSize: 14, marginBottom: 8, paddingLeft: 18 }}>
              <li>1. Explore the {page} page features.</li>
              <li>2. Use the navigation or ask the assistant for help.</li>
              <li>3. For more help, contact support.</li>
            </ol>
            <button style={{ marginTop: 8, background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", cursor: "pointer" }} onClick={() => setShowOnboarding(false)}>Close</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .chatbot-header { background: #2563eb; color: #fff; padding: 14px 18px; font-weight: bold; letter-spacing: 1px; }
        .chatbot-messages { flex: 1; padding: 16px; background: #f1f5f9; overflow-y: auto; max-height: 260px; }
        .chatbot-message { margin-bottom: 12px; display: flex; flex-direction: column; }
        .chatbot-message.user { align-items: flex-end; }
        .chatbot-message.bot { align-items: flex-start; }
        .chatbot-bubble { padding: 8px 14px; border-radius: 16px; max-width: 80%; word-break: break-word; margin-bottom: 2px; }
        .chatbot-message.user .chatbot-bubble { background: #2563eb; color: #fff; border-bottom-right-radius: 4px; }
        .chatbot-message.bot .chatbot-bubble { background: #e0e7ef; color: #222; border-bottom-left-radius: 4px; }
        .chatbot-input-area { display: flex; border-top: 1px solid #e2e8f0; background: #fff; }
        .chatbot-input { flex: 1; border: none; padding: 12px; font-size: 15px; outline: none; background: transparent; color: #000; }
        .chatbot-send-btn { background: #2563eb; color: #fff; border: none; padding: 0 18px; cursor: pointer; font-size: 16px; border-radius: 0 0 16px 0; transition: background 0.2s; }
        .chatbot-send-btn:hover { background: #1e40af; }
      `}</style>
      <div className="chatbot-header">Navigation Assistant</div>
      <div style={{ display: "flex", gap: 6, padding: 8, background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <button style={{ fontSize: 12, background: "#e0e7ef", color: "#2563eb", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer" }} onClick={() => setShowWeb3Modal(true)}>Web3 Explainer</button>
        <button style={{ fontSize: 12, background: "#e0e7ef", color: "#2563eb", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer" }} onClick={() => setShowOnboarding(true)}>Onboarding Help</button>
      </div>
      <div className="chatbot-messages" style={{ flex: 1, padding: 16, background: "#f1f5f9", overflowY: "auto", maxHeight: 260 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-message ${msg.sender}`} style={{ alignItems: msg.sender === "user" ? "flex-end" : "flex-start" }}>
            <div className="chatbot-bubble" style={{
              background: msg.sender === "user" ? "#2563eb" : "#e0e7ef",
              color: msg.sender === "user" ? "#fff" : "#222",
              borderBottomRightRadius: msg.sender === "user" ? 4 : 16,
              borderBottomLeftRadius: msg.sender === "bot" ? 4 : 16
            }}>{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="chatbot-message bot" style={{ alignItems: "flex-start" }}>
            <div className="chatbot-bubble" style={{
              background: "#e0e7ef",
              color: "#222",
              borderBottomLeftRadius: 4,
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <div style={{
                width: "16px",
                height: "16px",
                border: "2px solid #2563eb",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatbot-input-area" style={{ display: "flex", borderTop: "1px solid #e2e8f0", background: "#fff" }} onSubmit={handleSubmit} autoComplete="off">
        <input
          className="chatbot-input"
          style={{ flex: 1, border: "none", padding: 12, fontSize: 15, outline: "none", background: "transparent" }}
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="chatbot-send-btn" style={{ background: "#2563eb", color: "#fff", border: "none", padding: "0 18px", cursor: "pointer", fontSize: 16, borderRadius: "0 0 16px 0", transition: "background 0.2s" }} type="submit">&#9658;</button>
      </form>
    </div>
  );
}
