"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import LandingNavbar from "@/components/LandingNavbar";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import Link from "next/link";

export default function SupporterLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await fetch("/api/supporter/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success && result.user) {
        login(result.user);
        setToast({ message: result.message, type: "success" });
        setForm({ email: "", password: "" });
        setTimeout(() => {
          router.push("/supporter/dashboard");
        }, 1000);
      } else {
        setToast({ message: result.message || "Login failed.", type: "error" });
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
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        {toast && <Toast message={toast.message} type={toast.type} />}

        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🤝</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600">Sign in to support students</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:bg-white transition-all duration-300 text-gray-900"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Spinner />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>🤝</span>
                    <span>Start Supporting</span>
                  </div>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  New supporter?{" "}
                  <Link
                    href="/supporter/register"
                    className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                  >
                    Join us here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">💝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Impact</h3>
              <p className="text-sm text-gray-600">Track your donations</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">🔗</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Crypto</h3>
              <p className="text-sm text-gray-600">Bitcoin & USDT payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
