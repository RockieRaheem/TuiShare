  /*
   Navigation Assistant Characteristics:
   1. Universal navigation on home page: lists all main areas (Home, Services, About, Contact, Dashboard, registration, login for all roles).
   2. Contextual navigation on other pages: scrolls to relevant sections.
   3. Keyword recognition: matches user input to navigation targets using flexible keywords.
   4. Actionable responses: provides clear, actionable navigation or scrolls/redirects.
   5. Fallback and help: friendly fallback if input is not understood.
   6. Accessible and themed UI: works in both light and dark mode.
   7. Polite and friendly tone: always helpful and welcoming.
   8. Extensible: easy to add new sections or keywords.
  */
"use client";
import React from "react";
import Link from "next/link";


import LandingNavbar from "../components/LandingNavbar";
import ChatbotAssistant from "../components/ChatbotAssistant";
// ...existing code...


export default function Home() {


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans pt-20 dark:bg-gray-900 dark:text-gray-100">
      <LandingNavbar />


      {/* Navigation Assistant (restored) */}
// ...existing code...
      {/* How it works section */}
      <section className="w-full flex flex-col items-center bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 py-12 mb-8 shadow-sm">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700 dark:text-yellow-300 flex items-center justify-center gap-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.753 20.5 2 15.747 2 10.5S6.753.5 12 .5s10 4.753 10 10-4.753 10-10 10z"/></svg>
            How Tuishare Works
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Get started in 3 easy steps:</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600 dark:text-blue-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg></div>
              <span className="font-semibold text-blue-700 dark:text-blue-200">Choose Role</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">Supporter, Student, or School</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600 dark:text-green-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg></div>
              <span className="font-semibold text-green-700 dark:text-green-200">Register</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">Sign up for your dashboard</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-4 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-600 dark:text-yellow-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 018 0v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg></div>
              <span className="font-semibold text-yellow-700 dark:text-yellow-200">Get Started</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">Access features & support</span>
            </div>
          </div>
        </div>
      </section>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Dummy sections for navigation */}
        <section id="home" className="max-w-2xl w-full text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-blue-700 dark:text-yellow-300">Tuishare</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Empowering African students with seamless, secure, and accountable tuition payments. Connect supporters (parents, sponsors, guardians), students, and schools using modern Web3 technology.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-8">
            <Link href="/supporter/register" className="py-3 px-8 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-all duration-200">Register as Supporter</Link>
            <Link href="/student/register" className="py-3 px-8 rounded-lg bg-green-600 text-white font-semibold text-lg shadow hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 transition-all duration-200">Register as Student</Link>
            <Link href="/school/register" className="py-3 px-8 rounded-lg bg-yellow-500 text-white font-semibold text-lg shadow hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800 transition-all duration-200">Register School</Link>
          </div>
        </section>
        <section id="services" className="max-w-3xl w-full mx-auto grid md:grid-cols-3 gap-12 mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition hover:scale-105 hover:shadow-lg group cursor-pointer">
            <div className="flex items-center justify-center mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600 group-hover:text-blue-800 dark:text-blue-300 dark:group-hover:text-blue-400 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-200">For Supporters</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Support students directly, track your impact, and receive digital proof of your contributions.</p>
            <Link href="/supporter/register" className="text-blue-600 dark:text-blue-300 hover:underline font-medium">Start Supporting &rarr;</Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition hover:scale-105 hover:shadow-lg group cursor-pointer">
            <div className="flex items-center justify-center mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600 group-hover:text-green-800 dark:text-green-300 dark:group-hover:text-green-400 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0l-9-5m9 5l9-5"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-200">For Students</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Register to receive tuition support, manage your virtual card, and access educational resources.</p>
            <Link href="/student/register" className="text-green-600 dark:text-green-300 hover:underline font-medium">Register Now &rarr;</Link>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition hover:scale-105 hover:shadow-lg group cursor-pointer">
            <div className="flex items-center justify-center mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-600 group-hover:text-yellow-800 dark:text-yellow-300 dark:group-hover:text-yellow-400 transition"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 4v4m0 0V4m0 4a4 4 0 100 8 4 4 0 000-8z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-yellow-600 dark:text-yellow-200">For Schools</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Join the platform to receive secure payments, confirm tuition, and manage student records.</p>
            <Link href="/school/register" className="text-yellow-600 dark:text-yellow-300 hover:underline font-medium">Join as School &rarr;</Link>
          </div>
        </section>

        {/* Crypto Payment Section - Bitnob Inspired */}
        <section className="w-full bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16 mt-20 shadow-inner">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-4xl">₿</span>
              <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-300">
                Powered by Bitcoin & USDT
              </h2>
              <span className="text-4xl">₮</span>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl">🌍</span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Cross-Border Education Revolution
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Just like <strong className="text-orange-600">Bitnob's journey from Nigeria 🇳🇬 to Uganda 🇺🇬</strong> to solve African payment challenges, 
                TuiShare uses <strong>Bitcoin and USDT</strong> to break down traditional banking barriers and enable 
                instant, borderless education funding across all of Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 p-6 rounded-xl">
                <div className="text-3xl mb-3">₿</div>
                <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">Bitcoin Payments</h4>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1 text-left">
                  <li>• Instant global transfers</li>
                  <li>• No currency exchange fees</li>
                  <li>• Transparent blockchain tracking</li>
                  <li>• 24/7 availability worldwide</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 p-6 rounded-xl">
                <div className="text-3xl mb-3">₮</div>
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">USDT Stability</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 text-left">
                  <li>• Price stable (pegged to USD)</li>
                  <li>• Fast cross-border settlements</li>
                  <li>• Lower volatility risk</li>
                  <li>• Perfect for tuition planning</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
              <h4 className="text-xl font-semibold mb-3">🚀 Why This Matters for African Education</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <strong>Traditional Banking:</strong><br/>
                  Days for transfers, High fees, Limited access
                </div>
                <div>
                  <strong>TuiShare Crypto:</strong><br/>
                  Instant transfers, Low fees, Global access
                </div>
                <div>
                  <strong>Impact:</strong><br/>
                  More students funded, Faster support, Real transparency
                </div>
              </div>
              <div className="text-center">
                <Link 
                  href="/crypto-demo" 
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Try Crypto Demo →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="max-w-2xl w-full text-center mt-24 mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-800 dark:text-yellow-300">About</h2>
          <p className="text-gray-700 dark:text-gray-300">Information about Tuishare and our mission to empower African students.</p>
        </section>
        <section id="contact" className="max-w-2xl w-full text-center mt-24 mb-16">
          <h2 className="text-3xl font-bold mb-4 text-blue-800 dark:text-yellow-300">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">Contact us at info@tuishare.com or use the form below.</p>
        </section>
      </main>
      <footer className="mt-12 text-sm text-center text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Tuishare. All rights reserved.</footer>

      {/* ChatBot Assistant */}
      <ChatbotAssistant page="Home" />

      // ...existing code...
    </div>
  );
}
