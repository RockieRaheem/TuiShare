"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LandingNavbar from "../components/LandingNavbar";
import ChatbotAssistant from "../components/ChatbotAssistant";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "🎓 Empower African Students",
      subtitle: "Revolutionary Education Funding",
      description:
        "Break down financial barriers with blockchain-powered tuition payments",
      bg: "from-blue-600 via-purple-600 to-blue-800",
    },
    {
      title: "₿ Powered by Bitcoin & USDT",
      subtitle: "Instant Cross-Border Payments",
      description:
        "Secure, transparent, and lightning-fast transactions across Africa",
      bg: "from-orange-500 via-yellow-500 to-orange-700",
    },
    {
      title: "🌍 Built on Bitnob Infrastructure",
      subtitle: "Enterprise-Grade Security",
      description: "Join the Web3 revolution in African education financing",
      bg: "from-green-500 via-teal-500 to-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <LandingNavbar />

      {/* Hero Section with Advanced Animations */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg} opacity-90 transition-all duration-1000`}
          ></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Floating Elements Animation */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-white opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-400 opacity-30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 bg-blue-400 opacity-25 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-green-400 opacity-30 rounded-full animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                TuiShare
              </span>
            </h1>

            <div className="h-24 mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 transition-all duration-500">
                {slides[currentSlide].title}
              </h2>
              <h3 className="text-lg md:text-2xl font-medium opacity-90 transition-all duration-500">
                {slides[currentSlide].subtitle}
              </h3>
              <p className="text-md md:text-xl opacity-80 mt-2 transition-all duration-500">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <Link
                href="/showcase"
                className="group relative px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10">🚀 Live Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>

              <Link
                href="/crypto-demo"
                className="group relative px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
              >
                ₿ Crypto Demo
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-3 mb-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-white" : "bg-white opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              How{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                TuiShare
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Revolutionary blockchain-powered education funding in 3 simple
              steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👤",
                title: "Choose Your Role",
                description:
                  "Join as a Student seeking support, Supporter wanting to help, or School managing payments",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "📝",
                title: "Quick Registration",
                description:
                  "Secure sign-up with email verification and wallet creation for seamless transactions",
                color: "from-green-500 to-green-600",
              },
              {
                icon: "🚀",
                title: "Start Transacting",
                description:
                  "Send/receive payments instantly using Bitcoin, USDT, Lightning Network, or mobile money",
                color: "from-purple-500 to-purple-600",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
                ></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 text-center">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Number */}
                <div
                  className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${step.color} text-white rounded-full flex items-center justify-center font-bold text-sm`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Three Role Services - Enhanced */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Revolution
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose your role in transforming African education through
              blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Supporters */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    🤝
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    For Supporters
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Parents • Sponsors • Guardians
                  </p>
                </div>

                <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Support students with Bitcoin & USDT
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Track impact with transparent blockchain
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Earn rewards on crypto savings
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Global transfer capabilities
                  </li>
                </ul>

                <Link
                  href="/supporter/register"
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Start Supporting →
                </Link>
              </div>
            </div>

            {/* Students */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl transform -rotate-2 group-hover:-rotate-4 transition-transform opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    🎓
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    For Students
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    University • College • High School
                  </p>
                </div>

                <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Receive instant tuition payments
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Manage virtual payment cards
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Access educational resources
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Share your education story
                  </li>
                </ul>

                <Link
                  href="/student/register"
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  Register Now →
                </Link>
              </div>
            </div>

            {/* Schools */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                    🏫
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    For Schools
                  </h3>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">
                    Universities • Colleges • Institutions
                  </p>
                </div>

                <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Receive secure crypto payments
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Confirm tuition transactions
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Manage student records
                  </li>
                  <li className="flex items-center">
                    <span className="w-5 h-5 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full flex items-center justify-center text-xs mr-3">
                      ✓
                    </span>
                    Real-time payment notifications
                  </li>
                </ul>

                <Link
                  href="/school/register"
                  className="block w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105"
                >
                  Join Platform →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bitnob-Powered Crypto Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full bg-repeat opacity-20"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="4"/></g></g></svg>\')',
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-5xl">₿</span>
              <h2 className="text-4xl md:text-6xl font-black">
                Crypto-Powered Education
              </h2>
              <span className="text-5xl">₮</span>
            </div>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto">
              Built on <strong>Bitnob&apos;s Enterprise Infrastructure</strong>{" "}
              - From Nigeria 🇳🇬 to Uganda 🇺🇬 to All of Africa 🌍
            </p>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                href="/crypto-demo"
                className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Try Crypto Demo 🚀
              </Link>
              <Link
                href="/showcase"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
              >
                See Full Platform 🎯
              </Link>
            </div>
            <p className="text-sm opacity-75">
              Experience Bitcoin, USDT, Lightning Network, and Mobile Money
              integration
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              Impact in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Transforming African education one transaction at a time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Students Supported", icon: "🎓" },
              { number: "50+", label: "Schools Connected", icon: "🏫" },
              { number: "500+", label: "Active Supporters", icon: "🤝" },
              { number: "$2M+", label: "Funds Transferred", icon: "💰" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 hover:shadow-lg transition-all transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact Sections */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              TuiShare
            </span>
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              TuiShare is revolutionizing African education funding through
              blockchain technology. Inspired by Bitnob&apos;s vision of
              connecting Africa through cryptocurrency, we&apos;re breaking down
              financial barriers that prevent students from accessing quality
              education.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-2xl">
                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                  Our Mission
                </h3>
                <p className="text-blue-600 dark:text-blue-300">
                  Empower every African student with accessible, transparent
                  education funding
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-2xl">
                <h3 className="font-bold text-green-800 dark:text-green-200 mb-2">
                  Our Vision
                </h3>
                <p className="text-green-600 dark:text-green-300">
                  A future where financial barriers don&apos;t limit educational
                  opportunities
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-2xl">
                <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">
                  Our Impact
                </h3>
                <p className="text-orange-600 dark:text-orange-300">
                  Connecting global supporters with African students through
                  technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Touch
            </span>
          </h2>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to join the education revolution? We&apos;re here to help!
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <a
                    href="mailto:support@tuishare.com"
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    support@tuishare.com
                  </a>
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use our AI assistant below for instant help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                TuiShare
              </h3>
              <p className="text-gray-400 text-sm">
                Empowering African education through blockchain technology and
                cryptocurrency payments.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="/showcase"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Platform Demo
                </Link>
                <Link
                  href="/crypto-demo"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Crypto Demo
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Users</h4>
              <div className="space-y-2 text-sm">
                <Link
                  href="/student/register"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Student Registration
                </Link>
                <Link
                  href="/supporter/register"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Supporter Registration
                </Link>
                <Link
                  href="/school/register"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  School Registration
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Powered By</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>🚀 Bitnob Infrastructure</div>
                <div>₿ Bitcoin Network</div>
                <div>₮ USDT Stablecoin</div>
                <div>⚡ Lightning Network</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} TuiShare. Transforming African
              education through blockchain technology.
            </p>
          </div>
        </div>
      </footer>

      {/* ChatBot Assistant */}
      <ChatbotAssistant page="Home" />
    </div>
  );
}
