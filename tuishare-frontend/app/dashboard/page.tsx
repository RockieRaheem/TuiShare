/*
Main Features of Tuishare Dashboard:
1. Role-Based Registration & Login: Users can register and log in as Supporters, Students, or Schools.
2. Modern Dashboard: KPIs, charts (tuition volume, top schools, user roles), and recent transactions.
3. Tuition Payment Management: Secure, trackable tuition payments for all roles.
4. Impact Tracking: Supporters can track their contributions and impact.
5. Onboarding & Web3 Explainer: Modals for user education (handled in home page).
6. Accessible, Responsive UI: Fully responsive, light/dark theme support.
7. Quick Start Guide: Downloadable onboarding guide (handled in home page).
*/
"use client";
import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from "chart.js";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

// Dynamically import the assistant to avoid SSR issues
// ...existing code...

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const mockStats = {
  totalTuition: 120000,
  activeUsers: 320,
  nps: 72,
  userRoles: { Supporters: 120, Students: 150, Schools: 50 },
  topSchools: [
    { name: "Greenfield High", value: 32000 },
    { name: "Sunrise Academy", value: 25000 },
    { name: "Unity College", value: 18000 }
  ],
  paymentsOverTime: [
    { month: "Jan", value: 8000 },
    { month: "Feb", value: 12000 },
    { month: "Mar", value: 15000 },
    { month: "Apr", value: 20000 },
    { month: "May", value: 25000 },
    { month: "Jun", value: 30000 }
  ],
  recentTransactions: [
    { id: 1, user: "Jane Doe", amount: 500, date: "2025-07-20", type: "Student" },
    { id: 2, user: "Unity College", amount: 2000, date: "2025-07-19", type: "School" },
    { id: 3, user: "John Smith", amount: 1000, date: "2025-07-18", type: "Supporter" }
  ]
};

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("6m");

  // Chart data
  const lineData = {
    labels: mockStats.paymentsOverTime.map((d) => d.month),
    datasets: [
      {
        label: "Tuition Volume",
        data: mockStats.paymentsOverTime.map((d) => d.value),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        tension: 0.4,
        fill: true
      }
    ]
  };
  const barData = {
    labels: mockStats.topSchools.map((s) => s.name),
    datasets: [
      {
        label: "Top Schools",
        data: mockStats.topSchools.map((s) => s.value),
        backgroundColor: ["#fde047", "#2563eb", "#22c55e"]
      }
    ]
  };
  const pieData = {
    labels: Object.keys(mockStats.userRoles),
    datasets: [
      {
        label: "User Roles",
        data: Object.values(mockStats.userRoles),
        backgroundColor: ["#2563eb", "#22c55e", "#fde047"]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans pt-20 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-8 w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700 dark:text-yellow-300">Dashboard</h1>
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:scale-[1.02]">
            <span className="text-gray-500 dark:text-gray-300 text-sm mb-1">Total Tuition</span>
            <span className="text-2xl font-bold text-blue-700 dark:text-yellow-300">${mockStats.totalTuition.toLocaleString()}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:scale-[1.02]">
            <span className="text-gray-500 dark:text-gray-300 text-sm mb-1">Active Users</span>
            <span className="text-2xl font-bold text-green-700 dark:text-green-300">{mockStats.activeUsers}</span>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:scale-[1.02]">
            <span className="text-gray-500 dark:text-gray-300 text-sm mb-1">NPS Score</span>
            <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{mockStats.nps}</span>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2 text-blue-700 dark:text-yellow-300">Tuition Volume Over Time</h2>
            <Line data={lineData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-300">Top Schools</h2>
            <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">User Roles</h2>
            <Pie data={pieData} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-yellow-300">Recent Transactions</h2>
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-300">
                  <th className="py-1">User</th>
                  <th className="py-1">Type</th>
                  <th className="py-1">Amount</th>
                  <th className="py-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockStats.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b last:border-b-0 hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                    <td className="py-1 font-medium">{tx.user}</td>
                    <td className="py-1">{tx.type}</td>
                    <td className="py-1">${tx.amount}</td>
                    <td className="py-1">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Filters (MVP) */}
        <div className="flex gap-4 items-center mb-8">
          <label className="text-gray-600 dark:text-gray-300">Date Range:</label>
          <select
            className="border rounded p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
          >
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
            <option value="all">All time</option>
          </select>
        </div>
        {/* AI Assistant for website Q&A and navigation */}
        {/* ChatbotAssistant removed */}
      </main>
    </div>
  );
}
