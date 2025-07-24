"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LandingNavbar from "@/components/LandingNavbar";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import Link from "next/link";

export default function StudentRegister() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    schoolId: "",
    schoolName: "",
    course: "",
    story: ""
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!form.fullName || !form.email || !form.schoolId || !form.schoolName) {
      setToast({
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const res = await fetch("/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      
      if (result.success) {
        setToast({ message: result.message, type: "success" });
        setForm({
          fullName: "",
          email: "",
          schoolId: "",
          schoolName: "",
          course: "",
          story: ""
        });
        setTimeout(() => {
          router.push("/student/login");
        }, 2000);
      } else {
        setToast({ message: result.message || "Registration failed.", type: "error" });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex flex-col pt-20">
      <LandingNavbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">👩‍🎓</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Join TuiShare</h1>
            <p className="text-lg text-gray-600">Create your student profile and start your journey</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900"
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
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="your.email@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">School ID *</label>
                  <input
                    type="text"
                    name="schoolId"
                    value={form.schoolId}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Your student ID"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">School Name *</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={form.schoolName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="University name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Course of Study</label>
                <input
                  type="text"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900"
                  placeholder="e.g., Computer Science, Medicine, Engineering"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Your Story</label>
                <textarea
                  name="story"
                  value={form.story}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-gray-900 resize-none"
                  placeholder="Tell potential supporters about your dreams and goals..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Spinner />
                    <span>Creating Your Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>🚀</span>
                    <span>Create Student Account</span>
                  </div>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/student/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Crypto Funding</h3>
              <p className="text-sm text-gray-600">Receive Bitcoin & USDT payments instantly</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Global Support</h3>
              <p className="text-sm text-gray-600">Connect with supporters worldwide</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your funding progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
}
