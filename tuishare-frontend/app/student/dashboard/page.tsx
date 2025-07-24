"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ChatbotAssistant from "@/components/ChatbotAssistant";

// Enhanced student data with African universities and crypto integration
const studentData = {
  profile: {
    name: "Amara Okafor",
    studentId: "UL2025/CS/0891",
    university: "University of Lagos",
    program: "Computer Science",
    year: 3,
    gpa: 3.85,
    avatar: "👩🏾‍🎓"
  },
  tuition: {
    totalRequired: 2850000, // Nigerian Naira
    amountPaid: 2100000,
    balance: 750000,
    currency: "NGN",
    cryptoEquivalent: {
      btc: 0.011,
      usdt: 460
    }
  },
  payments: [
    {
      id: 1,
      date: "2025-07-20",
      amount: 500000,
      currency: "NGN",
      cryptoAmount: "0.0074 BTC",
      supporter: "Global Education Fund",
      txHash: "0xa1b2c3d4...",
      status: "Completed",
      type: "Scholarship"
    },
    {
      id: 2,
      date: "2025-07-15",
      amount: 800000,
      currency: "NGN", 
      cryptoAmount: "520 USDT",
      supporter: "Sarah Chen (Family)",
      txHash: "0xe5f6g7h8...",
      status: "Completed",
      type: "Family Support"
    },
    {
      id: 3,
      date: "2025-07-10",
      amount: 300000,
      currency: "NGN",
      cryptoAmount: "195 USDT", 
      supporter: "Anonymous Donor",
      txHash: "0xi9j0k1l2...",
      status: "Completed",
      type: "Donation"
    },
    {
      id: 4,
      date: "2025-07-05",
      amount: 500000,
      currency: "NGN",
      cryptoAmount: "325 USDT",
      supporter: "Tech4Africa Foundation",
      txHash: "0xm3n4o5p6...",
      status: "Completed", 
      type: "Grant"
    }
  ],
  virtualCard: {
    balance: 185000,
    cardNumber: "**** **** **** 8923",
    expiryDate: "12/27",
    cardType: "TuiShare Virtual",
    recentTransactions: [
      { date: "2025-07-24", merchant: "University Bookstore", amount: 15000 },
      { date: "2025-07-23", merchant: "Campus Cafeteria", amount: 8500 },
      { date: "2025-07-22", merchant: "Library Fees", amount: 5000 },
      { date: "2025-07-21", merchant: "Lab Equipment", amount: 25000 }
    ]
  },
  achievements: [
    { title: "Dean's List", semester: "2024/2025 Session", icon: "🏆" },
    { title: "Coding Bootcamp Graduate", date: "July 2025", icon: "💻" },
    { title: "Community Service Award", date: "June 2025", icon: "🤝" },
    { title: "Blockchain Workshop", date: "May 2025", icon: "⛓️" }
  ],
  goals: {
    currentSemester: "2025/2026 First Semester",
    graduationDate: "June 2026",
    careerGoal: "Blockchain Developer",
    targetGPA: 4.0
  }
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [showCardDetails, setShowCardDetails] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  function handleSignOut() {
    localStorage.removeItem('user');
    window.location.href = "/";
  }

  const paymentProgress = (studentData.tuition.amountPaid / studentData.tuition.totalRequired) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Loading Student Portal...</h2>
          <p className="text-gray-600 dark:text-gray-300">Fetching your academic data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Student Profile Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="text-6xl mr-4">{studentData.profile.avatar}</div>
                <div>
                  <h1 className="text-3xl font-black">{studentData.profile.name}</h1>
                  <p className="text-green-100 text-lg">{studentData.profile.university}</p>
                  <p className="text-green-200">
                    {studentData.profile.program} • Year {studentData.profile.year} • GPA: {studentData.profile.gpa}
                  </p>
                  <p className="text-green-200 text-sm">ID: {studentData.profile.studentId}</p>
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
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                >
                  📊 Analytics
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'overview', label: '🎓 Overview' },
                { id: 'payments', label: '💰 Payments' },
                { id: 'card', label: '💳 Virtual Card' },
                { id: 'achievements', label: '🏆 Achievements' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Tuition Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    🎯 Tuition Progress
                  </h3>
                  <div className="text-right">
                    <div className="text-3xl font-black text-green-600">
                      {paymentProgress.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Total Required:</span>
                    <span className="font-bold text-xl">₦{studentData.tuition.totalRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Amount Paid:</span>
                    <span className="font-bold text-xl text-green-600">₦{studentData.tuition.amountPaid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Remaining Balance:</span>
                    <span className="font-bold text-xl text-orange-600">₦{studentData.tuition.balance.toLocaleString()}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${paymentProgress}%` }}
                    ></div>
                  </div>
                  
                  {/* Crypto Equivalent */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900 rounded-xl">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                      💰 Remaining Balance in Crypto
                    </h4>
                    <div className="flex gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">₿ {studentData.tuition.cryptoEquivalent.btc}</div>
                        <div className="text-sm text-orange-500">Bitcoin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">₮ {studentData.tuition.cryptoEquivalent.usdt}</div>
                        <div className="text-sm text-green-500">USDT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Progress & Goals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    📚 Academic Progress
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Current Semester:</span>
                      <span className="font-semibold">{studentData.goals.currentSemester}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Expected Graduation:</span>
                      <span className="font-semibold text-blue-600">{studentData.goals.graduationDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Current GPA:</span>
                      <span className="font-bold text-2xl text-green-600">{studentData.profile.gpa}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Target GPA:</span>
                      <span className="font-semibold text-purple-600">{studentData.goals.targetGPA}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Career Goal:</span>
                      <span className="font-semibold text-orange-600">{studentData.goals.careerGoal}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    🚀 Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                      📧 Request Financial Aid
                    </button>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                      🤝 Find Study Partners
                    </button>
                    <Link href="/crypto-demo" className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-center">
                      🪙 Try Crypto Payments
                    </Link>
                    <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105">
                      📈 View Academic Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Payment History</h3>
                  <p className="text-gray-600 dark:text-gray-300">All cryptocurrency and traditional payments received</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Supporter</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {studentData.payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{payment.date}</td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                ₦{payment.amount.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">{payment.cryptoAmount}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{payment.supporter}</div>
                              <div className="text-xs font-mono text-blue-600 dark:text-blue-400">{payment.txHash}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {payment.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Virtual Card Tab */}
          {activeTab === 'card' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Virtual Card Display */}
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">TuiShare Card</h3>
                      <p className="text-blue-100">Student Virtual Card</p>
                    </div>
                    <div className="text-3xl">💳</div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-3xl font-bold mb-2">₦{studentData.virtualCard.balance.toLocaleString()}</div>
                    <div className="text-blue-100">Available Balance</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-blue-100 text-sm mb-1">Card Number</div>
                      <div className="text-xl font-mono">{studentData.virtualCard.cardNumber}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="text-blue-100 text-sm">Cardholder</div>
                        <div className="font-semibold">{studentData.profile.name}</div>
                      </div>
                      <div>
                        <div className="text-blue-100 text-sm">Expires</div>
                        <div className="font-semibold">{studentData.virtualCard.expiryDate}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions & Info */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Card Controls</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setShowCardDetails(!showCardDetails)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all"
                      >
                        {showCardDetails ? 'Hide' : 'Show'} Card Details
                      </button>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                        🔄 Reload Card
                      </button>
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                        📊 Transaction History
                      </button>
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all">
                        🔒 Freeze Card
                      </button>
                    </div>
                  </div>

                  {showCardDetails && (
                    <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
                      <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">🔐 Security Information</h4>
                      <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                        <p><strong>CVV:</strong> 123</p>
                        <p><strong>PIN:</strong> ****</p>
                        <p><strong>Daily Limit:</strong> ₦50,000</p>
                        <p><strong>Monthly Limit:</strong> ₦200,000</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Card Transactions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Card Transactions</h3>
                <div className="space-y-3">
                  {studentData.virtualCard.recentTransactions.map((tx, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white">{tx.merchant}</div>
                        <div className="text-sm text-gray-500">{tx.date}</div>
                      </div>
                      <div className="font-bold text-red-600">-₦{tx.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentData.achievements.map((achievement, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{achievement.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{achievement.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {achievement.semester || achievement.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievement Progress */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4">🎯 Achievement Progress</h3>
                  <p className="text-xl opacity-90 mb-6">Keep pushing towards your goals!</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">4</div>
                      <div className="text-purple-100">Achievements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">85%</div>
                      <div className="text-purple-100">Tuition Paid</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">3.85</div>
                      <div className="text-purple-100">Current GPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">1</div>
                      <div className="text-purple-100">Year Left</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating ChatBot Assistant */}
      <ChatbotAssistant page="Student Dashboard" />
    </div>
  );
}
