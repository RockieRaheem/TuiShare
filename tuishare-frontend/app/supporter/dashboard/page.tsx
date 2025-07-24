"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ChatbotAssistant from "@/components/ChatbotAssistant";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth";

// Enhanced supporter data with global philanthropic context
const supporterData = {
  profile: {
    name: "Sarah Chen",
    title: "Global Education Advocate",
    location: "San Francisco, USA",
    memberSince: "January 2024",
    avatar: "👩🏻‍💼",
    totalContributed: 125000,
    studentsSupported: 18,
    impactRating: 9.2,
    currency: "USD",
    preferredMethod: "Bitcoin",
  },
  contributions: [
    {
      id: 1,
      date: "2025-07-24",
      student: "Amara Okafor",
      university: "University of Lagos",
      amount: 2500,
      amountLocal: 4087500, // NGN
      currency: "USD",
      localCurrency: "NGN",
      cryptoAmount: "0.037 BTC",
      method: "Bitcoin",
      txHash: "0xa1b2c3d4e5f6...",
      status: "Confirmed",
      purpose: "Tuition Payment",
      impact: "Enabled completion of Computer Science degree",
    },
    {
      id: 2,
      date: "2025-07-20",
      student: "Kwame Asante",
      university: "Makerere University",
      amount: 1800,
      amountLocal: 6480000, // UGX
      currency: "USD",
      localCurrency: "UGX",
      cryptoAmount: "1170 USDT",
      method: "USDT",
      txHash: "0xf6e5d4c3b2a1...",
      status: "Confirmed",
      purpose: "Engineering Lab Fees",
      impact: "Access to advanced engineering equipment",
    },
    {
      id: 3,
      date: "2025-07-15",
      student: "Fatima Hassan",
      university: "University of Cairo",
      amount: 3200,
      amountLocal: 98560, // EGP
      currency: "USD",
      localCurrency: "EGP",
      cryptoAmount: "0.047 BTC",
      method: "Lightning Network",
      txHash: "ln_1a2b3c4d5e...",
      status: "Confirmed",
      purpose: "Medical School Tuition",
      impact: "Supporting future healthcare in Africa",
    },
    {
      id: 4,
      date: "2025-07-10",
      student: "Joseph Mbeki",
      university: "University of Cape Town",
      amount: 2100,
      amountLocal: 38070, // ZAR
      currency: "USD",
      localCurrency: "ZAR",
      cryptoAmount: "2100 USDT",
      method: "USDT",
      txHash: "0x7g8h9i0j1k...",
      status: "Confirmed",
      purpose: "Business Administration",
      impact: "Developing entrepreneurial skills",
    },
  ],
  supportedStudents: [
    {
      id: 1,
      name: "Amara Okafor",
      university: "University of Lagos",
      program: "Computer Science",
      year: 3,
      country: "🇳🇬 Nigeria",
      totalSupport: 12500,
      progressPercentage: 85,
      gpa: 3.85,
      status: "Active",
      nextPaymentDue: "2025-08-15",
      story:
        "Aspiring blockchain developer from Lagos, working on DeFi solutions for African markets",
      achievements: [
        "Dean's List",
        "Coding Bootcamp Graduate",
        "Blockchain Workshop",
      ],
    },
    {
      id: 2,
      name: "Kwame Asante",
      university: "Makerere University",
      program: "Mechanical Engineering",
      year: 2,
      country: "🇬🇭 Ghana",
      totalSupport: 8900,
      progressPercentage: 60,
      gpa: 3.72,
      status: "Active",
      nextPaymentDue: "2025-08-20",
      story:
        "Passionate about renewable energy engineering for rural African communities",
      achievements: ["Engineering Society President", "Solar Project Leader"],
    },
    {
      id: 3,
      name: "Fatima Hassan",
      university: "University of Cairo",
      program: "Medicine",
      year: 4,
      country: "🇪🇬 Egypt",
      totalSupport: 15600,
      progressPercentage: 75,
      gpa: 3.91,
      status: "Active",
      nextPaymentDue: "2025-08-10",
      story:
        "Training to become a pediatric surgeon, dedicated to improving child healthcare in Egypt",
      achievements: ["Medical Research Award", "Community Health Volunteer"],
    },
    {
      id: 4,
      name: "Joseph Mbeki",
      university: "University of Cape Town",
      program: "Business Administration",
      year: 1,
      country: "🇿🇦 South Africa",
      totalSupport: 5200,
      progressPercentage: 40,
      gpa: 3.68,
      status: "Active",
      nextPaymentDue: "2025-08-25",
      story:
        "Building skills to create sustainable business solutions for African SMEs",
      achievements: [
        "Business Plan Competition Winner",
        "Startup Incubator Participant",
      ],
    },
  ],
  impactMetrics: {
    totalImpact: 125000,
    studentsGraduated: 3,
    averageGpaImprovement: 0.8,
    employmentRate: 100,
    communityProjectsSupported: 7,
    countriesReached: 12,
    yearsOfEducationFunded: 24,
    scholarshipsCreated: 5,
  },
  upcomingPayments: [
    {
      student: "Fatima Hassan",
      amount: 1600,
      dueDate: "2025-08-10",
      urgent: true,
    },
    {
      student: "Amara Okafor",
      amount: 1200,
      dueDate: "2025-08-15",
      urgent: false,
    },
    {
      student: "Kwame Asante",
      amount: 950,
      dueDate: "2025-08-20",
      urgent: false,
    },
    {
      student: "Joseph Mbeki",
      amount: 1400,
      dueDate: "2025-08-25",
      urgent: false,
    },
  ],
  cryptoStats: {
    btcContributed: 1.847,
    usdtContributed: 45600,
    totalCryptoValue: 89340,
    cryptoPercentage: 71.5,
    averageTransactionFee: 2.45,
    favoriteWallet: "Lightning Network",
  },
};

export default function SupporterDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  function handleSignOut() {
    logout();
    window.location.href = "/";
  }

  const totalImpactUSD = supporterData.profile.totalContributed;
  const averageContribution =
    totalImpactUSD / supporterData.contributions.length;

  if (isLoading) {
    return (
      <ProtectedRoute requiredUserType="supporter">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Loading Supporter Portal...
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Fetching your impact data
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredUserType="supporter">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        {/* Hero Header */}
        <div className="pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Supporter Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center mb-4 lg:mb-0">
                  <div className="text-6xl mr-6">
                    {supporterData.profile.avatar}
                  </div>
                  <div>
                    <h1 className="text-3xl font-black">
                      {supporterData.profile.name}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {supporterData.profile.title}
                    </p>
                    <p className="text-blue-200">
                      {supporterData.profile.location} • Member since{" "}
                      {supporterData.profile.memberSince}
                    </p>
                    <p className="text-blue-200 text-sm">
                      Impact Rating: ⭐ {supporterData.profile.impactRating}/10
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSignOut}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    Sign Out
                  </button>
                  <Link
                    href="/dashboard"
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                  >
                    📊 Analytics
                  </Link>
                </div>
              </div>

              {/* Impact Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white border-opacity-20">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ${supporterData.profile.totalContributed.toLocaleString()}
                  </div>
                  <div className="text-blue-100 text-sm">Total Contributed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {supporterData.profile.studentsSupported}
                  </div>
                  <div className="text-blue-100 text-sm">
                    Students Supported
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {supporterData.impactMetrics.studentsGraduated}
                  </div>
                  <div className="text-blue-100 text-sm">Graduated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {supporterData.impactMetrics.countriesReached}
                  </div>
                  <div className="text-blue-100 text-sm">Countries Reached</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "overview", label: "🌟 Overview" },
                  { id: "students", label: "👨‍🎓 My Students" },
                  { id: "contributions", label: "💰 Contributions" },
                  { id: "impact", label: "🚀 Impact" },
                  { id: "crypto", label: "₿ Crypto Stats" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Impact Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-100">Total Impact</span>
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div className="text-3xl font-black">
                      $
                      {supporterData.impactMetrics.totalImpact.toLocaleString()}
                    </div>
                    <div className="text-green-100 text-sm">
                      Life-changing education
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100">
                        Crypto Contributions
                      </span>
                      <span className="text-2xl">₿</span>
                    </div>
                    <div className="text-3xl font-black">
                      {supporterData.cryptoStats.cryptoPercentage}%
                    </div>
                    <div className="text-blue-100 text-sm">
                      $
                      {supporterData.cryptoStats.totalCryptoValue.toLocaleString()}{" "}
                      value
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-100">Employment Rate</span>
                      <span className="text-2xl">💼</span>
                    </div>
                    <div className="text-3xl font-black">
                      {supporterData.impactMetrics.employmentRate}%
                    </div>
                    <div className="text-purple-100 text-sm">
                      Graduates employed
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-100">
                        Scholarships Created
                      </span>
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div className="text-3xl font-black">
                      {supporterData.impactMetrics.scholarshipsCreated}
                    </div>
                    <div className="text-orange-100 text-sm">
                      New opportunities
                    </div>
                  </div>
                </div>

                {/* Upcoming Payments & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      📅 Upcoming Payments
                    </h3>
                    <div className="space-y-3">
                      {supporterData.upcomingPayments.map((payment, index) => (
                        <div
                          key={index}
                          className={`flex justify-between items-center p-4 rounded-xl ${
                            payment.urgent
                              ? "bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700"
                              : "bg-gray-50 dark:bg-gray-700"
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-gray-800 dark:text-white">
                              {payment.student}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Due: {payment.dueDate}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              ${payment.amount}
                            </div>
                            {payment.urgent && (
                              <div className="text-red-600 text-xs font-semibold">
                                URGENT
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      🚀 Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                        💰 Make New Contribution
                      </button>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                        🔍 Find New Students
                      </button>
                      <Link
                        href="/crypto-demo"
                        className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center"
                      >
                        🪙 Try Crypto Payments
                      </Link>
                      <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                        📊 Download Impact Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Personal Impact Story */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-4">
                      🌟 Your Impact Story
                    </h3>
                    <p className="text-xl opacity-90 mb-6">
                      You&apos;ve changed{" "}
                      {supporterData.profile.studentsSupported} lives across{" "}
                      {supporterData.impactMetrics.countriesReached} African
                      countries
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {supporterData.impactMetrics.yearsOfEducationFunded}
                        </div>
                        <div className="text-green-100 text-sm">
                          Years of Education
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {
                            supporterData.impactMetrics
                              .communityProjectsSupported
                          }
                        </div>
                        <div className="text-green-100 text-sm">
                          Community Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          +{supporterData.impactMetrics.averageGpaImprovement}
                        </div>
                        <div className="text-green-100 text-sm">
                          Avg GPA Improvement
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {supporterData.impactMetrics.employmentRate}%
                        </div>
                        <div className="text-green-100 text-sm">
                          Graduate Employment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Students Tab */}
            {activeTab === "students" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {supporterData.supportedStudents.map((student) => (
                    <div
                      key={student.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {student.name}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400">
                            {student.university}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {student.program} • Year {student.year}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.country}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {student.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                          &quot;{student.story}&quot;
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Total Support:
                          </span>
                          <span className="font-bold text-lg">
                            ${student.totalSupport.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Progress:
                          </span>
                          <span className="font-semibold text-blue-600">
                            {student.progressPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${student.progressPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            GPA:
                          </span>
                          <span className="font-bold text-green-600">
                            {student.gpa}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Next Payment:
                          </span>
                          <span className="font-semibold text-orange-600">
                            {student.nextPaymentDue}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          Achievements:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {student.achievements.map((achievement, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributions Tab */}
            {activeTab === "contributions" && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Contribution History
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      All your contributions to African students across multiple
                      currencies
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Impact
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {supporterData.contributions.map((contribution) => (
                          <tr
                            key={contribution.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {contribution.date}
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {contribution.student}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {contribution.university}
                                </div>
                                {contribution.txHash && (
                                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                                    {contribution.txHash}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  ${contribution.amount.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {contribution.amountLocal.toLocaleString()}{" "}
                                  {contribution.localCurrency}
                                </div>
                                {contribution.cryptoAmount && (
                                  <div className="text-sm text-blue-600 dark:text-blue-400">
                                    {contribution.cryptoAmount}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  contribution.method.includes("Bitcoin") ||
                                  contribution.method.includes("Lightning")
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                    : contribution.method.includes("USDT")
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {contribution.method}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {contribution.purpose}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {contribution.impact}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Contribution Analytics */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Contribution Analytics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        ${totalImpactUSD.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Contributed
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        ${averageContribution.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Average Contribution
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {supporterData.contributions.length}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Transactions
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {supporterData.cryptoStats.cryptoPercentage}%
                      </div>
                      <div className="text-sm text-gray-500">Crypto Usage</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Impact Tab */}
            {activeTab === "impact" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <h3 className="text-4xl font-bold mb-4">
                      🌍 Global Impact Dashboard
                    </h3>
                    <p className="text-xl opacity-90">
                      Transforming Lives Across Africa Through Education
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">🎓</div>
                      <div className="text-2xl font-bold">
                        {supporterData.impactMetrics.studentsGraduated}
                      </div>
                      <div className="text-purple-100">Students Graduated</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">💼</div>
                      <div className="text-2xl font-bold">
                        {supporterData.impactMetrics.employmentRate}%
                      </div>
                      <div className="text-purple-100">Employment Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">🌟</div>
                      <div className="text-2xl font-bold">
                        +{supporterData.impactMetrics.averageGpaImprovement}
                      </div>
                      <div className="text-purple-100">GPA Improvement</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">🚀</div>
                      <div className="text-2xl font-bold">
                        {supporterData.impactMetrics.communityProjectsSupported}
                      </div>
                      <div className="text-purple-100">Community Projects</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Impact Stories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      📚 Educational Impact
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Years of Education Funded:
                        </span>
                        <span className="font-bold text-2xl text-blue-600">
                          {supporterData.impactMetrics.yearsOfEducationFunded}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Scholarships Created:
                        </span>
                        <span className="font-semibold text-green-600">
                          {supporterData.impactMetrics.scholarshipsCreated}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Countries Reached:
                        </span>
                        <span className="font-semibold text-purple-600">
                          {supporterData.impactMetrics.countriesReached}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      💰 Financial Impact
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Total Investment:
                        </span>
                        <span className="font-bold text-2xl text-green-600">
                          $
                          {supporterData.impactMetrics.totalImpact.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Crypto Contributions:
                        </span>
                        <span className="font-semibold text-orange-600">
                          $
                          {supporterData.cryptoStats.totalCryptoValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Students Supported:
                        </span>
                        <span className="font-semibold text-blue-600">
                          {supporterData.profile.studentsSupported}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Stories */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    🏆 Success Stories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-50 dark:bg-green-900 rounded-xl">
                      <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
                        💻 Tech Innovation
                      </h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        3 students you supported have launched successful tech
                        startups, creating 47 jobs in their local communities.
                      </p>
                    </div>
                    <div className="p-6 bg-blue-50 dark:bg-blue-900 rounded-xl">
                      <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                        🏥 Healthcare Heroes
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Medical students you supported now serve 12,000+
                        patients annually in underserved communities.
                      </p>
                    </div>
                    <div className="p-6 bg-purple-50 dark:bg-purple-900 rounded-xl">
                      <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                        🌱 Community Development
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm">
                        Graduates have initiated 7 community development
                        projects, improving lives of 3,500+ people.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Crypto Stats Tab */}
            {activeTab === "crypto" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-100">
                        Bitcoin Contributed
                      </span>
                      <span className="text-2xl">₿</span>
                    </div>
                    <div className="text-3xl font-black">
                      {supporterData.cryptoStats.btcContributed} BTC
                    </div>
                    <div className="text-orange-100 text-sm">
                      ≈ $
                      {(
                        supporterData.cryptoStats.btcContributed * 67340
                      ).toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-100">USDT Contributed</span>
                      <span className="text-2xl">₮</span>
                    </div>
                    <div className="text-3xl font-black">
                      {supporterData.cryptoStats.usdtContributed.toLocaleString()}
                    </div>
                    <div className="text-green-100 text-sm">
                      Stable value donations
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100">Crypto Percentage</span>
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="text-3xl font-black">
                      {supporterData.cryptoStats.cryptoPercentage}%
                    </div>
                    <div className="text-blue-100 text-sm">
                      Of total contributions
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-100">Avg TX Fee</span>
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="text-3xl font-black">
                      ${supporterData.cryptoStats.averageTransactionFee}
                    </div>
                    <div className="text-purple-100 text-sm">
                      Lightning preferred
                    </div>
                  </div>
                </div>

                {/* Crypto Education Impact */}
                <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">
                      ⚡ Cryptocurrency Advantage
                    </h3>
                    <p className="text-xl opacity-90">
                      Your crypto contributions enable instant, borderless
                      education funding
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-3">🚀</div>
                      <h4 className="font-bold mb-2">Instant Transfers</h4>
                      <p className="text-sm opacity-80">
                        Bitcoin and Lightning Network payments reach students in
                        seconds, not days
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-3">💰</div>
                      <h4 className="font-bold mb-2">Lower Fees</h4>
                      <p className="text-sm opacity-80">
                        Crypto saves $
                        {(
                          supporterData.contributions.length * 25
                        ).toLocaleString()}{" "}
                        in traditional transfer fees
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-3">🌍</div>
                      <h4 className="font-bold mb-2">Global Reach</h4>
                      <p className="text-sm opacity-80">
                        Direct payments to{" "}
                        {supporterData.impactMetrics.countriesReached} countries
                        without banking barriers
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Link
                      href="/crypto-demo"
                      className="inline-block bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                    >
                      🪙 Explore Crypto Features
                    </Link>
                  </div>
                </div>

                {/* Crypto Portfolio */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    💼 Crypto Contribution Portfolio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-orange-800 dark:text-orange-200">
                          Bitcoin Holdings
                        </span>
                        <span className="text-orange-600">₿</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                        {supporterData.cryptoStats.btcContributed} BTC
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400">
                        Current Value: $
                        {(
                          supporterData.cryptoStats.btcContributed * 67340
                        ).toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-green-800 dark:text-green-200">
                          USDT Contributions
                        </span>
                        <span className="text-green-600">₮</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {supporterData.cryptoStats.usdtContributed.toLocaleString()}{" "}
                        USDT
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Stable value: $
                        {supporterData.cryptoStats.usdtContributed.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      ⚡ Preferred Payment Method
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      <strong>
                        {supporterData.cryptoStats.favoriteWallet}
                      </strong>{" "}
                      - Ultra-low fees and instant confirmations
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      Average fee: $
                      {supporterData.cryptoStats.averageTransactionFee} per
                      transaction
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating ChatBot Assistant */}
        <ChatbotAssistant page="Supporter Dashboard" />
      </div>
    </ProtectedRoute>
  );
}
