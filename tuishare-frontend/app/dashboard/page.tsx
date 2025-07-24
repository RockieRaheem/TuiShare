"use client";
import React, { useState, useEffect } from "react";
import LandingNavbar from "../../components/LandingNavbar";
import Link from "next/link";

interface DashboardMetrics {
  totalStudents: number;
  totalSupporters: number;
  totalSchools: number;
  totalFunded: number;
  btcTransactions: number;
  lightningTransactions: number;
  usdtTransactions: number;
  averageTransactionTime: string;
  successRate: number;
  activeUsers: number;
}

interface RecentActivity {
  id: string;
  type: "donation" | "registration" | "withdrawal" | "support";
  user: string;
  amount?: number;
  currency?: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

export default function GeneralDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "users" | "transactions" | "insights"
  >("overview");
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalStudents: 2847,
    totalSupporters: 1256,
    totalSchools: 89,
    totalFunded: 1247680,
    btcTransactions: 1847,
    lightningTransactions: 3456,
    usdtTransactions: 2134,
    averageTransactionTime: "0.3 seconds",
    successRate: 99.7,
    activeUsers: 645,
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "donation",
      user: "Sarah Chen",
      amount: 250,
      currency: "USDT",
      timestamp: "2 min ago",
      status: "success",
    },
    {
      id: "2",
      type: "registration",
      user: "Amina Nakato",
      timestamp: "5 min ago",
      status: "success",
    },
    {
      id: "3",
      type: "donation",
      user: "Michael Andersen",
      amount: 0.025,
      currency: "BTC",
      timestamp: "8 min ago",
      status: "success",
    },
    {
      id: "4",
      type: "support",
      user: "Dr. Adebayo Ogundimu",
      timestamp: "12 min ago",
      status: "pending",
    },
    {
      id: "5",
      type: "withdrawal",
      user: "Fatima Hassan",
      amount: 180,
      currency: "USDT",
      timestamp: "15 min ago",
      status: "success",
    },
  ]);

  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    if (liveUpdates) {
      const interval = setInterval(() => {
        setMetrics((prev) => ({
          ...prev,
          totalFunded: prev.totalFunded + Math.floor(Math.random() * 1000),
          btcTransactions: prev.btcTransactions + Math.floor(Math.random() * 3),
          lightningTransactions:
            prev.lightningTransactions + Math.floor(Math.random() * 5),
          usdtTransactions:
            prev.usdtTransactions + Math.floor(Math.random() * 4),
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        }));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [liveUpdates]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {metrics.totalStudents.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="text-3xl text-blue-600">🎓</div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  ↗ +127 this week
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {metrics.totalSupporters.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Active Supporters
                    </div>
                  </div>
                  <div className="text-3xl text-green-600">💚</div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  ↗ +89 this week
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {metrics.totalSchools}
                    </div>
                    <div className="text-sm text-gray-600">Partner Schools</div>
                  </div>
                  <div className="text-3xl text-purple-600">🏫</div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  ↗ +7 this month
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      ${metrics.totalFunded.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Funded</div>
                  </div>
                  <div className="text-3xl text-orange-600">💰</div>
                </div>
                <div className="mt-3 text-xs text-green-600">
                  ↗ +$12.5K today
                </div>
              </div>
            </div>

            {/* Crypto Transaction Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Bitcoin Transactions
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-orange-600">₿</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {metrics.btcTransactions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total BTC Payments
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Lightning Network
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-yellow-600">⚡</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {metrics.lightningTransactions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Lightning Payments
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  USDT Stablecoin
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-green-600">₮</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {metrics.usdtTransactions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">USDT Payments</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-blue-600 mb-2">⏱️</div>
                <div className="text-2xl font-bold text-gray-800">
                  {metrics.averageTransactionTime}
                </div>
                <div className="text-sm text-gray-600">
                  Average Transaction Time
                </div>
                <div className="text-xs text-green-600 mt-2">
                  99% faster than traditional banking
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-green-600 mb-2">✅</div>
                <div className="text-2xl font-bold text-gray-800">
                  {metrics.successRate}%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-green-600 mt-2">
                  Industry leading reliability
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-purple-600 mb-2">👥</div>
                <div className="text-2xl font-bold text-gray-800">
                  {metrics.activeUsers}
                </div>
                <div className="text-sm text-gray-600">Active Users Online</div>
                <div className="text-xs text-green-600 mt-2">
                  {liveUpdates && "● LIVE"}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Platform Activity
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="liveUpdates"
                    checked={liveUpdates}
                    onChange={(e) => setLiveUpdates(e.target.checked)}
                    className="rounded"
                  />
                  <label
                    htmlFor="liveUpdates"
                    className="text-sm text-gray-600"
                  >
                    Live Updates
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {activity.user}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">
                          {activity.type}
                          {activity.amount &&
                            ` - ${activity.amount} ${activity.currency}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {activity.timestamp}
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          activity.status === "success"
                            ? "text-green-600"
                            : activity.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {activity.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Payment Method Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">
                        Lightning Network
                      </span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">
                        USDT Stablecoin
                      </span>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Bitcoin</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: "18%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">
                        Mobile Money
                      </span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "5%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Geographic Distribution
                </h3>
                <div className="space-y-3">
                  {[
                    { country: "🇳🇬 Nigeria", percentage: 28 },
                    { country: "🇺🇬 Uganda", percentage: 25 },
                    { country: "🇬🇭 Ghana", percentage: 22 },
                    { country: "🇰🇪 Kenya", percentage: 15 },
                    { country: "🌍 Others", percentage: 10 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-700">
                        {item.country}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Monthly Growth Trends
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">+47%</div>
                  <div className="text-sm text-gray-600">Student Growth</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">+83%</div>
                  <div className="text-sm text-gray-600">
                    Transaction Volume
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    +156%
                  </div>
                  <div className="text-sm text-gray-600">Crypto Adoption</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">+92%</div>
                  <div className="text-sm text-gray-600">Supporter Growth</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  User Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Students</span>
                    <span className="font-semibold text-blue-600">
                      {metrics.totalStudents.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Supporters</span>
                    <span className="font-semibold text-green-600">
                      {metrics.totalSupporters.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Schools</span>
                    <span className="font-semibold text-purple-600">
                      {metrics.totalSchools}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">
                        Total Users
                      </span>
                      <span className="font-bold text-gray-800">
                        {(
                          metrics.totalStudents +
                          metrics.totalSupporters +
                          metrics.totalSchools
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Verification Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Fully Verified</span>
                    <span className="text-green-600 font-medium">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Pending Review</span>
                    <span className="text-yellow-600 font-medium">8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Unverified</span>
                    <span className="text-red-600 font-medium">3%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Activity Levels
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Highly Active</span>
                    <span className="text-green-600 font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Moderately Active</span>
                    <span className="text-yellow-600 font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Low Activity</span>
                    <span className="text-red-600 font-medium">7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "transactions":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-orange-600 mb-2">₿</div>
                <div className="text-2xl font-bold text-gray-800">
                  {metrics.btcTransactions.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Bitcoin Transactions
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-yellow-600 mb-2">⚡</div>
                <div className="text-2xl font-bold text-gray-800">
                  {metrics.lightningTransactions.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Lightning Network</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-green-600 mb-2">₮</div>
                <div className="text-2xl font-bold text-gray-800">
                  {metrics.usdtTransactions.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">USDT Payments</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl text-blue-600 mb-2">📱</div>
                <div className="text-2xl font-bold text-gray-800">847</div>
                <div className="text-sm text-gray-600">Mobile Money</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Transaction Performance
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {metrics.successRate}%
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {metrics.averageTransactionTime}
                  </div>
                  <div className="text-sm text-gray-600">Average Speed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    $2.1M
                  </div>
                  <div className="text-sm text-gray-600">Monthly Volume</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "insights":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Platform Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      🚀 Growth Momentum
                    </h4>
                    <p className="text-sm text-green-700">
                      Lightning Network adoption increased 156% this month,
                      making it our fastest-growing payment method.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      💡 User Behavior
                    </h4>
                    <p className="text-sm text-blue-700">
                      Students from Nigeria show highest crypto adoption rate at
                      78%, leading African innovation.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      🎯 Success Stories
                    </h4>
                    <p className="text-sm text-purple-700">
                      89% of students who receive crypto funding complete their
                      degrees, vs 67% industry average.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      ⚡ Performance
                    </h4>
                    <p className="text-sm text-orange-700">
                      Average transaction time of 0.3 seconds - 99% faster than
                      traditional banking.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      🌍 Global Impact
                    </h4>
                    <p className="text-sm text-yellow-700">
                      Platform now serves 47 countries with 99.7% transaction
                      success rate.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">
                      💰 Cost Savings
                    </h4>
                    <p className="text-sm text-red-700">
                      Users save average of $33.50 per transaction vs
                      traditional banking fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 pt-20">
      <LandingNavbar />
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block transition-all hover:scale-105"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📊 TuiShare Platform Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            Comprehensive analytics and insights for the leading blockchain
            education funding platform in Africa
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              ✓ Real-time Data
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              ✓ 47 Countries
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              ✓ 99.7% Success Rate
            </div>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              ✓ Lightning Fast
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 text-center">
          <div className="inline-flex flex-wrap gap-2">
            <Link
              href="/showcase"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg text-sm"
            >
              🎯 Full Demo
            </Link>
            <Link
              href="/crypto-demo"
              className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg text-sm"
            >
              ⚡ Crypto Demo
            </Link>
            <Link
              href="/student/dashboard"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg text-sm"
            >
              👨‍🎓 Student View
            </Link>
            <Link
              href="/supporter/dashboard"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg text-sm"
            >
              💚 Supporter View
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b">
            {[
              { id: "overview", label: "Platform Overview", icon: "📊" },
              { id: "analytics", label: "Analytics", icon: "📈" },
              { id: "users", label: "Users", icon: "👥" },
              { id: "transactions", label: "Transactions", icon: "💰" },
              { id: "insights", label: "Insights", icon: "💡" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "overview"
                      | "analytics"
                      | "users"
                      | "transactions"
                      | "insights"
                  )
                }
                className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">
            Transform African Education with Blockchain
          </h2>
          <p className="text-xl mb-6">
            Join the revolution that&rsquo;s empowering students across 47
            countries
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/student/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Apply as Student
            </Link>
            <Link
              href="/supporter/register"
              className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-all"
            >
              Become Supporter
            </Link>
            <Link
              href="/school/register"
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all"
            >
              Partner School
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
