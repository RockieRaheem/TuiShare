"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LandingNavbar from "@/components/LandingNavbar";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function SchoolRegister() {
  const [form, setForm] = useState({
    schoolName: "",
    schoolEmail: "",
    schoolAddress: "",
    contactPerson: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth();
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
    if (!validateEmail(form.schoolEmail)) {
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
      const res = await fetch("/api/school/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitForm),
      });
      const result = await res.json();
      if (result.success && result.user) {
        login(result.user);
        setSubmitted(true);
        setToast({ message: result.message, type: "success" });
        setForm({
          schoolName: "",
          schoolEmail: "",
          schoolAddress: "",
          contactPerson: "",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex flex-col pt-20">
      <LandingNavbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {toast && <Toast message={toast.message} type={toast.type} />}

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏫</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Partner with TuiShare
          </h1>
          <p className="text-lg text-gray-600">
            Register your institution and empower students
          </p>
        </div>

        {/* Registration Form */}
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Spinner />
              <p className="mt-4 text-gray-600">Registering your school...</p>
            </div>
          ) : submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to TuiShare!
              </h3>
              <p className="text-gray-600 mb-6">
                Your school has been registered successfully. We&apos;ll contact
                you soon to complete the verification process.
              </p>
              <Link
                href="/school/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                <span>🏫</span>
                <span>Access Dashboard</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={form.schoolName}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Enter school name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    School Email *
                  </label>
                  <input
                    type="email"
                    name="schoolEmail"
                    value={form.schoolEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="admin@school.edu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  School Address *
                </label>
                <input
                  type="text"
                  name="schoolAddress"
                  value={form.schoolAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                  placeholder="Full school address"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                  placeholder="Administrator name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Create a secure password"
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:bg-white transition-all duration-300 text-gray-900"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-emerald-700 hover:to-green-800 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Spinner />
                    <span>Registering School...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span>🏫</span>
                    <span>Register School</span>
                  </div>
                )}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already registered?{" "}
                  <Link
                    href="/school/login"
                    className="text-green-600 hover:text-green-800 font-semibold transition-colors"
                  >
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
              <span className="text-xl text-white">💰</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Secure Payments
            </h3>
            <p className="text-sm text-gray-600">
              Receive tuition via crypto instantly
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl text-white">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Track Students</h3>
            <p className="text-sm text-gray-600">Monitor funding progress</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-xl text-white">🌍</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Global Reach</h3>
            <p className="text-sm text-gray-600">
              Connect worldwide supporters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
