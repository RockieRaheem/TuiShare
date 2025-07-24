"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LandingNavbar from "@/components/LandingNavbar";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import Link from "next/link";

export default function SchoolRegister() {
  const [form, setForm] = useState({
    schoolName: "",
    schoolEmail: "",
    schoolAddress: "",
    contactPerson: "",
    website: "",
    description: ""
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
    
    if (!form.schoolName || !form.schoolEmail || !form.schoolAddress || !form.contactPerson) {
      setToast({
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const res = await fetch("/api/school/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      
      if (result.success) {
        setToast({ message: result.message, type: "success" });
        setForm({
          schoolName: "",
          schoolEmail: "",
          schoolAddress: "",
          contactPerson: "",
          website: "",
          description: ""
        });
        setTimeout(() => {
          router.push("/school/login");
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex flex-col pt-20">
      <LandingNavbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🏫</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Partner with TuiShare</h1>
            <p className="text-lg text-gray-600">Register your institution and connect with global supporters</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">School Name *</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={form.schoolName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="University/College name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Official Email *</label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={form.schoolEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="admin@university.edu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">School Address *</label>
                <input
                  type="text"
                  name="schoolAddress"
                  value={form.schoolAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                  placeholder="Full address with city and country"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Full name of representative"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Website (Optional)</label>
                  <input
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="https://www.university.edu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">School Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900 resize-none"
                  placeholder="Brief description of your institution, programs offered, and mission..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Spinner />
                    <span>Registering Institution...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>🎓</span>
                    <span>Register School</span>
                  </div>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already registered?{" "}
                  <Link href="/school/login" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Funding</h3>
              <p className="text-sm text-gray-600">Receive crypto payments directly</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Student Management</h3>
              <p className="text-sm text-gray-600">Manage student profiles and progress</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Analytics</h3>
              <p className="text-sm text-gray-600">Track funding and engagement</p>
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
