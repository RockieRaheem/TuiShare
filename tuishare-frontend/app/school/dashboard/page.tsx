"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ChatbotAssistant from "@/components/ChatbotAssistant";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth";

// Enhanced school data with African educational institution context
const schoolData = {
  profile: {
    name: "Makerere University",
    type: "Public University",
    location: "Kampala, Uganda",
    established: 1922,
    logo: "🏛️",
    email: "admin@makerere.ac.ug",
    website: "www.makerere.ac.ug",
    accreditation: "Uganda National Council for Higher Education",
    ranking: "#1 in East Africa",
    studentCapacity: 40000,
    currentEnrollment: 35840,
  },
  financials: {
    totalRevenue: 18500000000, // UGX
    cryptoRevenue: 2400000000, // UGX
    pendingPayments: 850000000,
    currency: "UGX",
    cryptoPercentage: 13,
    averagePayment: 3500000,
    monthlyTarget: 2100000000,
  },
  students: [
    {
      id: 1,
      name: "Amara Okafor",
      studentId: "MU2025/CS/0891",
      program: "Computer Science",
      year: 3,
      totalFees: 3500000,
      amountPaid: 2800000,
      balance: 700000,
      status: "Good Standing",
      lastPayment: "2025-07-20",
      paymentMethod: "Bitcoin",
      cryptoAmount: "0.0104 BTC",
    },
    {
      id: 2,
      name: "Kwame Asante",
      studentId: "MU2025/ENG/0234",
      program: "Engineering",
      year: 2,
      totalFees: 4200000,
      amountPaid: 4200000,
      balance: 0,
      status: "Fully Paid",
      lastPayment: "2025-07-18",
      paymentMethod: "USDT",
      cryptoAmount: "2730 USDT",
    },
    {
      id: 3,
      name: "Fatima Hassan",
      studentId: "MU2025/MED/0156",
      program: "Medicine",
      year: 4,
      totalFees: 5800000,
      amountPaid: 3480000,
      balance: 2320000,
      status: "Payment Plan",
      lastPayment: "2025-07-15",
      paymentMethod: "Mobile Money",
      cryptoAmount: null,
    },
    {
      id: 4,
      name: "Joseph Mbeki",
      studentId: "MU2025/BUS/0567",
      program: "Business Admin",
      year: 1,
      totalFees: 2900000,
      amountPaid: 1450000,
      balance: 1450000,
      status: "Pending",
      lastPayment: "2025-07-10",
      paymentMethod: "Bank Transfer",
      cryptoAmount: null,
    },
    {
      id: 5,
      name: "Aisha Mohamed",
      studentId: "MU2025/LAW/0890",
      program: "Law",
      year: 3,
      totalFees: 4100000,
      amountPaid: 3280000,
      balance: 820000,
      status: "Good Standing",
      lastPayment: "2025-07-22",
      paymentMethod: "Lightning Network",
      cryptoAmount: "0.0077 BTC",
    },
  ],
  recentTransactions: [
    {
      id: 1,
      date: "2025-07-25",
      student: "Amara Okafor",
      amount: 700000,
      cryptoAmount: "0.0104 BTC",
      method: "Bitcoin",
      txHash: "0xa1b2c3d4e5f6...",
      status: "Confirmed",
      confirmations: 6,
    },
    {
      id: 2,
      date: "2025-07-24",
      student: "Kwame Asante",
      amount: 1400000,
      cryptoAmount: "910 USDT",
      method: "USDT",
      txHash: "0xf6e5d4c3b2a1...",
      status: "Confirmed",
      confirmations: 12,
    },
    {
      id: 3,
      date: "2025-07-23",
      student: "Aisha Mohamed",
      amount: 820000,
      cryptoAmount: "0.0077 BTC",
      method: "Lightning Network",
      txHash: "ln_1a2b3c4d5e...",
      status: "Confirmed",
      confirmations: 1,
    },
    {
      id: 4,
      date: "2025-07-22",
      student: "Fatima Hassan",
      amount: 580000,
      cryptoAmount: null,
      method: "M-Pesa",
      txHash: "MP25G7H8I9J0...",
      status: "Confirmed",
      confirmations: null,
    },
  ],
  analytics: {
    totalStudents: 35840,
    activeStudents: 32156,
    graduationRate: 89.5,
    employmentRate: 92.3,
    averageGPA: 3.72,
    internationals: 4280,
    scholarshipStudents: 8945,
    departments: 22,
    programs: 156,
  },
  notifications: [
    {
      id: 1,
      type: "payment",
      message: "New Bitcoin payment received from Amara Okafor",
      time: "2 hours ago",
      urgent: false,
    },
    {
      id: 2,
      type: "system",
      message: "Monthly financial report is ready for download",
      time: "1 day ago",
      urgent: false,
    },
    {
      id: 3,
      type: "alert",
      message: "5 students have overdue payments",
      time: "2 days ago",
      urgent: true,
    },
    {
      id: 4,
      type: "crypto",
      message: "Bitnob integration successfully updated",
      time: "3 days ago",
      urgent: false,
    },
  ],
};

export default function SchoolDashboard() {
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

  const paymentRate =
    (schoolData.analytics.activeStudents / schoolData.analytics.totalStudents) *
    100;

  if (isLoading) {
    return (
      <ProtectedRoute requiredUserType="school">
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Loading School Portal...
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Fetching institutional data
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredUserType="school">
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        {/* Hero Header */}
        <div className="pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* School Profile Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-red-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center mb-4 lg:mb-0">
                  <div className="text-6xl mr-6">{schoolData.profile.logo}</div>
                  <div>
                    <h1 className="text-3xl font-black">
                      {schoolData.profile.name}
                    </h1>
                    <p className="text-yellow-100 text-lg">
                      {schoolData.profile.type}
                    </p>
                    <p className="text-yellow-200">
                      {schoolData.profile.location} • Est.{" "}
                      {schoolData.profile.established}
                    </p>
                    <p className="text-yellow-200 text-sm">
                      {schoolData.profile.ranking}
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
                    className="bg-white text-yellow-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                  >
                    📊 Analytics
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white border-opacity-20">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {schoolData.analytics.totalStudents.toLocaleString()}
                  </div>
                  <div className="text-yellow-100 text-sm">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {schoolData.analytics.programs}
                  </div>
                  <div className="text-yellow-100 text-sm">Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {schoolData.financials.cryptoPercentage}%
                  </div>
                  <div className="text-yellow-100 text-sm">Crypto Payments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {schoolData.analytics.graduationRate}%
                  </div>
                  <div className="text-yellow-100 text-sm">Graduation Rate</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "overview", label: "🏛️ Overview" },
                  { id: "students", label: "👨‍🎓 Students" },
                  { id: "payments", label: "💰 Payments" },
                  { id: "analytics", label: "📊 Analytics" },
                  { id: "notifications", label: "🔔 Notifications" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-yellow-600 to-red-600 text-white shadow-lg"
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
                {/* Financial Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-100">Total Revenue</span>
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="text-3xl font-black">
                      UGX{" "}
                      {(schoolData.financials.totalRevenue / 1000000).toFixed(
                        1
                      )}
                      M
                    </div>
                    <div className="text-green-100 text-sm">
                      +18% this semester
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-100">Crypto Revenue</span>
                      <span className="text-2xl">₿</span>
                    </div>
                    <div className="text-3xl font-black">
                      UGX{" "}
                      {(schoolData.financials.cryptoRevenue / 1000000).toFixed(
                        1
                      )}
                      M
                    </div>
                    <div className="text-orange-100 text-sm">
                      {schoolData.financials.cryptoPercentage}% of total
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-100">Active Students</span>
                      <span className="text-2xl">👨‍🎓</span>
                    </div>
                    <div className="text-3xl font-black">
                      {schoolData.analytics.activeStudents.toLocaleString()}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {paymentRate.toFixed(1)}% enrollment
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-100">Pending Payments</span>
                      <span className="text-2xl">⏳</span>
                    </div>
                    <div className="text-3xl font-black">
                      UGX{" "}
                      {(
                        schoolData.financials.pendingPayments / 1000000
                      ).toFixed(1)}
                      M
                    </div>
                    <div className="text-purple-100 text-sm">
                      Needs follow-up
                    </div>
                  </div>
                </div>

                {/* Recent Activity & School Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      🏆 Institution Excellence
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Employment Rate:
                        </span>
                        <span className="font-bold text-2xl text-green-600">
                          {schoolData.analytics.employmentRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Average GPA:
                        </span>
                        <span className="font-bold text-xl text-blue-600">
                          {schoolData.analytics.averageGPA}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          International Students:
                        </span>
                        <span className="font-semibold text-purple-600">
                          {schoolData.analytics.internationals.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                          Scholarship Recipients:
                        </span>
                        <span className="font-semibold text-orange-600">
                          {schoolData.analytics.scholarshipStudents.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      🚀 Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                        📧 Send Payment Reminders
                      </button>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                        📊 Generate Financial Report
                      </button>
                      <Link
                        href="/crypto-demo"
                        className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center"
                      >
                        🪙 Setup Crypto Payments
                      </Link>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                        🏫 Update School Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* School Profile Details */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    🏛️ Institution Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Contact Information
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {schoolData.profile.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {schoolData.profile.website}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {schoolData.profile.location}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Accreditation
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {schoolData.profile.accreditation}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Established: {schoolData.profile.established}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Capacity
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Maximum:{" "}
                        {schoolData.profile.studentCapacity.toLocaleString()}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Current:{" "}
                        {schoolData.profile.currentEnrollment.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Student Records
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Comprehensive view of all enrolled students and their
                      payment status
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Program
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Fees
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            Last Payment
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {schoolData.students.map((student) => (
                          <tr
                            key={student.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {student.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {student.studentId}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {student.program}
                              </div>
                              <div className="text-sm text-gray-500">
                                Year {student.year}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold">
                                  UGX {student.amountPaid.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  of UGX {student.totalFees.toLocaleString()}
                                </div>
                                {student.balance > 0 && (
                                  <div className="text-sm text-red-600">
                                    Balance: UGX{" "}
                                    {student.balance.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  student.status === "Fully Paid"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : student.status === "Good Standing"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : student.status === "Payment Plan"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {student.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {student.lastPayment}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {student.paymentMethod}
                                </div>
                                {student.cryptoAmount && (
                                  <div className="text-xs text-blue-600 dark:text-blue-400">
                                    {student.cryptoAmount}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Recent Transactions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      All incoming payments including cryptocurrency and
                      traditional methods
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
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {schoolData.recentTransactions.map((tx) => (
                          <tr
                            key={tx.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {tx.date}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {tx.student}
                              </div>
                              {tx.txHash && (
                                <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                                  {tx.txHash}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  UGX {tx.amount.toLocaleString()}
                                </div>
                                {tx.cryptoAmount && (
                                  <div className="text-sm text-gray-500">
                                    {tx.cryptoAmount}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  tx.method.includes("Bitcoin") ||
                                  tx.method.includes("Lightning")
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                    : tx.method.includes("USDT")
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {tx.method}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  {tx.status}
                                </span>
                                {tx.confirmations && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    {tx.confirmations} conf.
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Methods Breakdown */}
                <div className="bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">
                      💳 Payment Method Distribution
                    </h3>
                    <p className="text-xl opacity-90">
                      Modern payment options for African students
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">₿</div>
                      <h4 className="font-bold">Bitcoin</h4>
                      <p className="text-sm opacity-80">8% of payments</p>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">₮</div>
                      <h4 className="font-bold">USDT</h4>
                      <p className="text-sm opacity-80">5% of payments</p>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">📱</div>
                      <h4 className="font-bold">Mobile Money</h4>
                      <p className="text-sm opacity-80">65% of payments</p>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-3xl mb-2">🏦</div>
                      <h4 className="font-bold">Bank Transfer</h4>
                      <p className="text-sm opacity-80">22% of payments</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                      📈 Enrollment Trends
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Capacity:
                        </span>
                        <span className="font-semibold">
                          {schoolData.profile.studentCapacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Current Enrollment:
                        </span>
                        <span className="font-semibold text-blue-600">
                          {schoolData.profile.currentEnrollment.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all"
                          style={{
                            width: `${
                              (schoolData.profile.currentEnrollment /
                                schoolData.profile.studentCapacity) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-center text-sm text-gray-500">
                        {(
                          (schoolData.profile.currentEnrollment /
                            schoolData.profile.studentCapacity) *
                          100
                        ).toFixed(1)}
                        % Capacity
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                      🎓 Academic Performance
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Average GPA:
                        </span>
                        <span className="font-bold text-2xl text-green-600">
                          {schoolData.analytics.averageGPA}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Graduation Rate:
                        </span>
                        <span className="font-semibold text-blue-600">
                          {schoolData.analytics.graduationRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Employment Rate:
                        </span>
                        <span className="font-semibold text-purple-600">
                          {schoolData.analytics.employmentRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                      🌍 Diversity Metrics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          International Students:
                        </span>
                        <span className="font-semibold text-orange-600">
                          {schoolData.analytics.internationals.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Scholarship Recipients:
                        </span>
                        <span className="font-semibold text-green-600">
                          {schoolData.analytics.scholarshipStudents.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Departments:
                        </span>
                        <span className="font-semibold">
                          {schoolData.analytics.departments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Analytics */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    💰 Financial Analytics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Revenue Breakdown
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total Revenue:</span>
                          <span className="font-bold text-2xl">
                            UGX{" "}
                            {(
                              schoolData.financials.totalRevenue / 1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Crypto Revenue:</span>
                          <span className="font-semibold text-orange-600">
                            UGX{" "}
                            {(
                              schoolData.financials.cryptoRevenue / 1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Pending:</span>
                          <span className="font-semibold text-yellow-600">
                            UGX{" "}
                            {(
                              schoolData.financials.pendingPayments / 1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Payment Efficiency
                      </h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Average Payment:</span>
                          <span className="font-semibold">
                            UGX{" "}
                            {(
                              schoolData.financials.averagePayment / 1000
                            ).toFixed(0)}
                            K
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Collection Rate:</span>
                          <span className="font-semibold text-green-600">
                            {paymentRate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Crypto Adoption:</span>
                          <span className="font-semibold text-blue-600">
                            {schoolData.financials.cryptoPercentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                {schoolData.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 ${
                      notification.urgent
                        ? "border-red-500"
                        : notification.type === "payment"
                        ? "border-green-500"
                        : notification.type === "crypto"
                        ? "border-orange-500"
                        : "border-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">
                          {notification.type === "payment"
                            ? "💰"
                            : notification.type === "crypto"
                            ? "₿"
                            : notification.type === "alert"
                            ? "⚠️"
                            : "📋"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {notification.message}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      {notification.urgent && (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating ChatBot Assistant */}
        <ChatbotAssistant page="School Dashboard" />
      </div>
    </ProtectedRoute>
  );
}
