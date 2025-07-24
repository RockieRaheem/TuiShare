"use client";
import React, { useState, useEffect } from "react";
import CryptoPayment from "../../components/CryptoPayment";
import LandingNavbar from "../../components/LandingNavbar";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  school: string;
  course: string;
  tuitionNeeded: number;
  raised: number;
  story: string;
  flag: string;
  urgency: "high" | "medium" | "low";
  cryptoFriendly: boolean;
  academicRank: string;
  completionDate: string;
  preferredCrypto: string[];
}

interface CryptoMetrics {
  totalBtcDonated: number;
  totalUsdtDonated: number;
  lightningTxCount: number;
  avgTxTime: string;
  gasSaved: number;
  countriesReached: number;
}

interface ExchangeRates {
  btc: number;
  usdt: number;
  eth: number;
}

export default function CryptoDemo() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<
    "demo" | "analytics" | "live-data" | "comparison" | "testimonials"
  >("demo");
  const [cryptoMetrics, setCryptoMetrics] = useState<CryptoMetrics>({
    totalBtcDonated: 12.45,
    totalUsdtDonated: 487250,
    lightningTxCount: 1247,
    avgTxTime: "0.3 seconds",
    gasSaved: 8940,
    countriesReached: 47,
  });
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    btc: 43250,
    usdt: 1.0,
    eth: 2420,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const [selectedCrypto, setSelectedCrypto] = useState<
    "all" | "bitcoin" | "lightning" | "stablecoin"
  >("all");
  const [liveUpdates, setLiveUpdates] = useState(true);

  const sampleStudents: Student[] = [
    {
      id: "1",
      name: "Amina Nakato",
      school: "Makerere University, Uganda",
      course: "Computer Science & AI",
      tuitionNeeded: 2500,
      raised: 2100,
      story:
        "Brilliant student from rural Uganda seeking to become a software engineer specializing in blockchain development",
      flag: "🇺🇬",
      urgency: "high",
      cryptoFriendly: true,
      academicRank: "Top 5%",
      completionDate: "2025-06-30",
      preferredCrypto: ["Bitcoin", "Lightning Network", "USDT"],
    },
    {
      id: "2",
      name: "Kemi Adebayo",
      school: "University of Lagos, Nigeria",
      course: "Medicine & Telemedicine",
      tuitionNeeded: 3200,
      raised: 2400,
      story:
        "Aspiring doctor who wants to serve rural communities and implement blockchain-based medical records",
      flag: "🇳🇬",
      urgency: "medium",
      cryptoFriendly: true,
      academicRank: "Top 10%",
      completionDate: "2026-12-15",
      preferredCrypto: ["USDT", "Bitcoin", "Mobile Integration"],
    },
    {
      id: "3",
      name: "Fatima Hassan",
      school: "University of Ghana",
      course: "Blockchain Engineering",
      tuitionNeeded: 2800,
      raised: 1200,
      story:
        "First in her family to attend university, dreams of building DeFi infrastructure for African markets",
      flag: "🇬🇭",
      urgency: "high",
      cryptoFriendly: true,
      academicRank: "Top 3%",
      completionDate: "2025-08-20",
      preferredCrypto: ["Ethereum", "DeFi Protocols", "Lightning Network"],
    },
    {
      id: "4",
      name: "Joseph Mwangi",
      school: "University of Nairobi, Kenya",
      course: "FinTech & Digital Banking",
      tuitionNeeded: 2600,
      raised: 890,
      story:
        "Passionate about creating mobile money solutions that integrate with crypto for financial inclusion",
      flag: "🇰🇪",
      urgency: "medium",
      cryptoFriendly: true,
      academicRank: "Top 8%",
      completionDate: "2025-12-10",
      preferredCrypto: ["M-Pesa Integration", "USDT", "Bitcoin"],
    },
  ];

  const filteredStudents = sampleStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency =
      selectedUrgency === "all" || student.urgency === selectedUrgency;
    const matchesCrypto =
      selectedCrypto === "all" ||
      (selectedCrypto === "bitcoin" &&
        student.preferredCrypto.some((crypto) =>
          crypto.toLowerCase().includes("bitcoin")
        )) ||
      (selectedCrypto === "lightning" &&
        student.preferredCrypto.some((crypto) =>
          crypto.toLowerCase().includes("lightning")
        )) ||
      (selectedCrypto === "stablecoin" &&
        student.preferredCrypto.some((crypto) =>
          crypto.toLowerCase().includes("usdt")
        ));

    return matchesSearch && matchesUrgency && matchesCrypto;
  });

  useEffect(() => {
    // Simulate live exchange rate updates
    if (liveUpdates) {
      const interval = setInterval(() => {
        setExchangeRates((prev) => ({
          btc: prev.btc + (Math.random() - 0.5) * 100,
          usdt: 1.0 + (Math.random() - 0.5) * 0.01,
          eth: prev.eth + (Math.random() - 0.5) * 50,
        }));

        setCryptoMetrics((prev) => ({
          ...prev,
          totalBtcDonated: prev.totalBtcDonated + Math.random() * 0.01,
          totalUsdtDonated: prev.totalUsdtDonated + Math.random() * 100,
          lightningTxCount:
            prev.lightningTxCount + Math.floor(Math.random() * 3),
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [liveUpdates]);

  const handlePaymentSuccess = (
    txHash: string,
    amount: number,
    currency: string,
    method: string
  ) => {
    alert(
      `🎉 Payment Successful!\n\nTransaction: ${txHash.slice(
        0,
        20
      )}...\nAmount: ${amount} ${currency}\nMethod: ${method}\nStudent: ${
        selectedStudent?.name
      }`
    );
    setSelectedStudent(null);

    // Update metrics
    setCryptoMetrics((prev) => ({
      ...prev,
      totalBtcDonated:
        currency === "BTC"
          ? prev.totalBtcDonated + amount
          : prev.totalBtcDonated,
      totalUsdtDonated:
        currency === "USDT"
          ? prev.totalUsdtDonated + amount
          : prev.totalUsdtDonated,
      lightningTxCount:
        method === "Lightning"
          ? prev.lightningTxCount + 1
          : prev.lightningTxCount,
    }));
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 mx-auto transition-all hover:scale-105"
            >
              ← Back to Crypto Demo
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Support {selectedStudent.name}
            </h1>
            <p className="text-lg text-gray-600">
              Experience borderless crypto education funding
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Student Profile */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {selectedStudent.flag} Student Profile
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2">{selectedStudent.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">School:</span>
                    <span className="ml-2">{selectedStudent.school}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Course:</span>
                    <span className="ml-2">{selectedStudent.course}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Academic Rank:
                    </span>
                    <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {selectedStudent.academicRank}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Completion:
                    </span>
                    <span className="ml-2">
                      {selectedStudent.completionDate}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Crypto Preferences:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStudent.preferredCrypto.map((crypto, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          {crypto}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <span className="font-medium text-gray-700">Story:</span>
                    <p className="text-gray-700 mt-1">
                      {selectedStudent.story}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Funding Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Raised:</span>
                    <span className="font-semibold text-green-600">
                      ${selectedStudent.raised}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Goal:</span>
                    <span className="font-semibold">
                      ${selectedStudent.tuitionNeeded}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className="font-semibold text-orange-600">
                      ${selectedStudent.tuitionNeeded - selectedStudent.raised}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        selectedStudent.urgency === "high"
                          ? "bg-red-500"
                          : selectedStudent.urgency === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${
                          (selectedStudent.raised /
                            selectedStudent.tuitionNeeded) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    {Math.round(
                      (selectedStudent.raised / selectedStudent.tuitionNeeded) *
                        100
                    )}
                    % Complete
                  </div>
                  <div
                    className={`text-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedStudent.urgency === "high"
                        ? "bg-red-100 text-red-800"
                        : selectedStudent.urgency === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedStudent.urgency.toUpperCase()} PRIORITY
                  </div>
                </div>
              </div>
            </div>

            {/* Crypto Payment */}
            <div className="lg:col-span-2">
              <CryptoPayment
                studentId={selectedStudent.id}
                studentName={selectedStudent.name}
                tuitionAmount={
                  selectedStudent.tuitionNeeded - selectedStudent.raised
                }
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "demo":
        return (
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Find Students to Support
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Search students, courses, schools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={selectedUrgency}
                  onChange={(e) =>
                    setSelectedUrgency(
                      e.target.value as "all" | "high" | "medium" | "low"
                    )
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <select
                  value={selectedCrypto}
                  onChange={(e) =>
                    setSelectedCrypto(
                      e.target.value as
                        | "all"
                        | "bitcoin"
                        | "lightning"
                        | "stablecoin"
                    )
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Crypto Types</option>
                  <option value="bitcoin">Bitcoin Preferred</option>
                  <option value="lightning">Lightning Network</option>
                  <option value="stablecoin">Stablecoin (USDT)</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="liveUpdates"
                    checked={liveUpdates}
                    onChange={(e) => setLiveUpdates(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="liveUpdates" className="text-sm">
                    Live Updates
                  </label>
                </div>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-center mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-3xl">{student.flag}</div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          student.urgency === "high"
                            ? "bg-red-100 text-red-800"
                            : student.urgency === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {student.urgency.toUpperCase()}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {student.name}
                    </h3>
                    <p className="text-gray-600">{student.course}</p>
                    <p className="text-sm text-gray-500">{student.school}</p>
                    <div className="mt-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {student.academicRank}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-3">
                      {student.story}
                    </p>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Raised:</span>
                        <span className="font-semibold text-green-600">
                          ${student.raised}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Goal:</span>
                        <span className="font-semibold">
                          ${student.tuitionNeeded}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${
                            student.urgency === "high"
                              ? "bg-red-500"
                              : student.urgency === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${
                              (student.raised / student.tuitionNeeded) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        {Math.round(
                          (student.raised / student.tuitionNeeded) * 100
                        )}
                        % Complete
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">
                        Preferred Crypto:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {student.preferredCrypto
                          .slice(0, 2)
                          .map((crypto, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                            >
                              {crypto}
                            </span>
                          ))}
                        {student.preferredCrypto.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{student.preferredCrypto.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-all font-semibold"
                  >
                    Support with Crypto
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-8">
            {/* Live Metrics */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl text-orange-600 mb-2">₿</div>
                <div className="text-2xl font-bold text-gray-800">
                  {cryptoMetrics.totalBtcDonated.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">BTC Donated</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl text-green-600 mb-2">₮</div>
                <div className="text-2xl font-bold text-gray-800">
                  ${cryptoMetrics.totalUsdtDonated.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">USDT Donated</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl text-yellow-600 mb-2">⚡</div>
                <div className="text-2xl font-bold text-gray-800">
                  {cryptoMetrics.lightningTxCount}
                </div>
                <div className="text-sm text-gray-600">Lightning TXs</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl text-blue-600 mb-2">⏱️</div>
                <div className="text-2xl font-bold text-gray-800">
                  {cryptoMetrics.avgTxTime}
                </div>
                <div className="text-sm text-gray-600">Avg TX Time</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl text-purple-600 mb-2">💰</div>
                <div className="text-2xl font-bold text-gray-800">
                  ${cryptoMetrics.gasSaved}
                </div>
                <div className="text-sm text-gray-600">Gas Fees Saved</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl text-red-600 mb-2">🌍</div>
                <div className="text-2xl font-bold text-gray-800">
                  {cryptoMetrics.countriesReached}
                </div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Payment Methods Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Lightning Network</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>USDT Stablecoin</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Bitcoin</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Geographic Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>🇳🇬 Nigeria</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇺🇬 Uganda</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇬🇭 Ghana</span>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇰🇪 Kenya</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🌍 Other</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "live-data":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Live Exchange Rates{" "}
                {liveUpdates && (
                  <span className="text-green-500 text-sm">● LIVE</span>
                )}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl text-orange-600 mb-2">₿</div>
                  <div className="text-xl font-bold">
                    ${exchangeRates.btc.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Bitcoin (BTC)</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl text-green-600 mb-2">₮</div>
                  <div className="text-xl font-bold">
                    ${exchangeRates.usdt.toFixed(4)}
                  </div>
                  <div className="text-sm text-gray-600">Tether (USDT)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl text-blue-600 mb-2">Ξ</div>
                  <div className="text-xl font-bold">
                    ${exchangeRates.eth.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Ethereum (ETH)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recent Transactions{" "}
                {liveUpdates && (
                  <span className="text-green-500 text-sm">● LIVE</span>
                )}
              </h3>
              <div className="space-y-3">
                {[
                  {
                    hash: "bc1qxy2k...d5h7z9",
                    amount: 0.025,
                    currency: "BTC",
                    student: "Amina Nakato",
                    time: "2 min ago",
                  },
                  {
                    hash: "TXhQr8w...9mK3L",
                    amount: 150,
                    currency: "USDT",
                    student: "Kemi Adebayo",
                    time: "5 min ago",
                  },
                  {
                    hash: "lnbc250...invoice",
                    amount: 250,
                    currency: "SATS",
                    student: "Fatima Hassan",
                    time: "8 min ago",
                  },
                  {
                    hash: "bc1qab4c...f2g8h1",
                    amount: 0.018,
                    currency: "BTC",
                    student: "Joseph Mwangi",
                    time: "12 min ago",
                  },
                ].map((tx, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-sm">{tx.hash}</div>
                      <div className="text-xs text-gray-600">
                        to {tx.student}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {tx.amount} {tx.currency}
                      </div>
                      <div className="text-xs text-gray-600">{tx.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "comparison":
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-6">
                Traditional vs Crypto Payments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Feature</th>
                      <th className="text-center py-3">Traditional Banking</th>
                      <th className="text-center py-3">TuiShare Crypto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3 font-medium">Transaction Time</td>
                      <td className="text-center py-3 text-red-600">
                        3-5 business days
                      </td>
                      <td className="text-center py-3 text-green-600">
                        0.3 seconds (Lightning)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Transfer Fees</td>
                      <td className="text-center py-3 text-red-600">
                        $15-50 + 3-5%
                      </td>
                      <td className="text-center py-3 text-green-600">
                        $0.01-2
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Availability</td>
                      <td className="text-center py-3 text-yellow-600">
                        Business hours only
                      </td>
                      <td className="text-center py-3 text-green-600">
                        24/7/365
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Global Access</td>
                      <td className="text-center py-3 text-red-600">
                        Limited by banking partnerships
                      </td>
                      <td className="text-center py-3 text-green-600">
                        Anywhere with internet
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Transparency</td>
                      <td className="text-center py-3 text-yellow-600">
                        Limited visibility
                      </td>
                      <td className="text-center py-3 text-green-600">
                        Full blockchain transparency
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Documentation</td>
                      <td className="text-center py-3 text-red-600">
                        Extensive paperwork
                      </td>
                      <td className="text-center py-3 text-green-600">
                        Crypto wallet only
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Cost Savings Calculator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Donation Amount ($)
                    </label>
                    <input
                      type="number"
                      placeholder="500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Traditional Banking Fee:</span>
                      <span className="text-red-600 font-semibold">$35.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>TuiShare Crypto Fee:</span>
                      <span className="text-green-600 font-semibold">
                        $1.50
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">You Save:</span>
                        <span className="text-green-600 font-bold">
                          $33.50 (95%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Time Savings</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      3-5 Days
                    </div>
                    <div className="text-sm text-gray-600">
                      Traditional Banking
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl">⬇️</div>
                    <div className="text-sm text-gray-600">vs</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      0.3 Seconds
                    </div>
                    <div className="text-sm text-gray-600">
                      Lightning Network
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    <strong className="text-green-600">99.9%</strong> faster
                    with crypto
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🇺🇬</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Amina Nakato
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Computer Science Student, Makerere University
                    </p>
                    <p className="text-gray-700">
                      &ldquo;Lightning Network payments helped me pay my tuition
                      instantly. What would have taken days with traditional
                      banking happened in seconds. This technology is changing
                      education in Africa!&rdquo;
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🇺🇸</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sarah Chen</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Global Supporter, Silicon Valley
                    </p>
                    <p className="text-gray-700">
                      &ldquo;I&rsquo;ve supported 18 students across Africa
                      using Bitcoin and USDT. The transparency and low fees make
                      it so much better than traditional donations. I can see
                      exactly where my money goes.&rdquo;
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🇳🇬</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Dr. Adebayo Ogundimu
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      University of Lagos Administration
                    </p>
                    <p className="text-gray-700">
                      &ldquo;TuiShare&rsquo;s crypto integration has
                      revolutionized how our international students receive
                      funding. We&rsquo;ve seen a 300% increase in successful
                      payments from overseas supporters.&rdquo;
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🇬🇭</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Fatima Hassan
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Blockchain Engineering Student
                    </p>
                    <p className="text-gray-700">
                      &ldquo;As someone studying blockchain technology, using
                      Lightning Network to fund my education feels like living
                      in the future. The speed and cost savings are
                      incredible!&rdquo;
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">
                Join the Crypto Education Revolution
              </h3>
              <p className="text-orange-700 text-lg mb-6">
                Over <strong>1,247 students</strong> funded through crypto
                payments in <strong>47 countries</strong>
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-800">
                    99.7%
                  </div>
                  <div className="text-sm text-orange-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-800">0.3s</div>
                  <div className="text-sm text-orange-600">Avg Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-800">95%</div>
                  <div className="text-sm text-orange-600">Fee Savings</div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 py-8 pt-20">
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
          <div className="mb-6">
            <Link
              href="/showcase"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg mr-4"
            >
              🎯 Full Platform Demo
            </Link>
            <span className="text-sm text-gray-600">
              Complete stakeholder experience
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ⚡ TuiShare Crypto Powerhouse
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            Experience the future of borderless education funding powered by
            Bitcoin Lightning Network and USDT - inspired by{" "}
            <strong className="text-orange-600">
              Bitnob&rsquo;s cross-border innovation
            </strong>
            from Nigeria to Uganda
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              ✓ Lightning Fast
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              ✓ Ultra Low Fees
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              ✓ Global Access
            </div>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              ✓ Transparent
            </div>
          </div>
        </div>

        {/* Bitnob Story Section */}
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 mb-12 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              🚀 Powered by Bitnob&rsquo;s Vision
            </h2>
            <p className="text-orange-700 leading-relaxed max-w-5xl mx-auto text-lg">
              When Bitnob traveled from <strong>Nigeria 🇳🇬 to Uganda 🇺🇬</strong>{" "}
              to host this hackathon, they demonstrated something revolutionary:{" "}
              <strong>cryptocurrency can unite Africa</strong> by solving
              payment barriers that traditional banking cannot. TuiShare
              amplifies this vision by enabling supporters worldwide to
              instantly fund African students using Bitcoin Lightning Network
              and USDT, creating a truly borderless education ecosystem.
            </p>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold">Lightning Speed</div>
                <div className="text-sm text-gray-600">
                  Payments in 0.3 seconds
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">🌍</div>
                <div className="font-semibold">Global Reach</div>
                <div className="text-sm text-gray-600">
                  47 countries connected
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-semibold">95% Fee Savings</div>
                <div className="text-sm text-gray-600">
                  vs traditional banking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b">
            {[
              { id: "demo", label: "Live Demo", icon: "🎮" },
              { id: "analytics", label: "Analytics", icon: "📊" },
              { id: "live-data", label: "Live Data", icon: "📡" },
              { id: "comparison", label: "Comparison", icon: "⚖️" },
              { id: "testimonials", label: "Testimonials", icon: "💬" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "demo"
                      | "analytics"
                      | "live-data"
                      | "comparison"
                      | "testimonials"
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
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Education Funding?
          </h2>
          <p className="text-xl mb-6">
            Join thousands of supporters using crypto to fund African students
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/supporter/register"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Start Supporting Students
            </Link>
            <Link
              href="/student/register"
              className="bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-all"
            >
              Apply for Funding
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
