"use client";
import { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import Link from "next/link";

export default function SupporterRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setToast({
        message: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }
    if (!form.password || form.password.length < 6) {
      setToast({
        message: "Password must be at least 6 characters.",
        type: "error",
      });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setToast({
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }
    setLoading(true);
    setToast(null);

    try {
      const { confirmPassword, ...submitForm } = form;
      const res = await fetch("/api/supporter/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitForm),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        setToast({ message: result.message, type: "success" });
        setForm({
          name: "",
          email: "",
          country: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setToast({
          message: result.message || "Registration failed.",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 flex flex-col pt-20">
      <LandingNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {toast && <Toast message={toast.message} type={toast.type} />}
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🤝</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Become a Supporter</h1>
          <p className="text-lg text-gray-600">Help students achieve their dreams with crypto donations</p>
        </div>

        {/* Registration Form */}
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Spinner />
              <p className="mt-4 text-gray-600">Creating your supporter profile...</p>
            </div>
          ) : submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Joining!</h3>
              <p className="text-gray-600 mb-6">Your supporter account has been created. Start making a difference in students' lives today.</p>
              <Link 
                href="/supporter/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <span>🤝</span>
                <span>Start Supporting</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-900"
                  placeholder="Enter your country"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Create a secure password"
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Spinner />
                    <span>Creating Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>🤝</span>
                    <span>Become a Supporter</span>
                  </div>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/supporter/login" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-xl text-white">💝</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Make Impact</h3>
            <p className="text-sm text-gray-600">Support students' education directly</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-xl text-white">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Track Progress</h3>
            <p className="text-sm text-gray-600">See your donation impact</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl text-white">🔗</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Crypto Payments</h3>
            <p className="text-sm text-gray-600">Use Bitcoin & USDT easily</p>
          </div>
        </div>
      </div>
    </div>
  );
}
