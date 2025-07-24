"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import CryptoPayment from '../../components/CryptoPayment';
import LandingNavbar from '../../components/LandingNavbar';

interface Student {
  id: string;
  name: string;
  school: string;
  course: string;
  tuitionNeeded: number;
  raised: number;
  story: string;
  flag: string;
  profileImage?: string;
}

interface School {
  id: string;
  name: string;
  location: string;
  students: number;
  totalFunded: number;
  flag: string;
  description: string;
}

interface Supporter {
  id: string;
  name: string;
  location: string;
  totalDonated: number;
  studentsSupported: number;
  flag: string;
  motivation: string;
}

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'schools' | 'supporters' | 'demo'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const students: Student[] = [
    {
      id: '1',
      name: 'Amina Nakato',
      school: 'Makerere University',
      course: 'Computer Science',
      tuitionNeeded: 2500,
      raised: 1200,
      story: 'Brilliant student from rural Uganda seeking to become a software engineer to build apps that solve local problems',
      flag: '🇺🇬'
    },
    {
      id: '2',
      name: 'Kemi Adebayo',
      school: 'University of Lagos',
      course: 'Medicine',
      tuitionNeeded: 3200,
      raised: 2100,
      story: 'Aspiring doctor who wants to serve rural communities and establish mobile clinics',
      flag: '🇳🇬'
    },
    {
      id: '3',
      name: 'Fatima Hassan',
      school: 'University of Ghana',
      course: 'Civil Engineering',
      tuitionNeeded: 2800,
      raised: 900,
      story: 'First in her family to attend university, dreams of building sustainable infrastructure across West Africa',
      flag: '🇬🇭'
    }
  ];

  const schools: School[] = [
    {
      id: '1',
      name: 'Makerere University',
      location: 'Kampala, Uganda',
      students: 47000,
      totalFunded: 85000,
      flag: '🇺🇬',
      description: 'Premier East African university fostering innovation and academic excellence since 1922'
    },
    {
      id: '2',
      name: 'University of Lagos',
      location: 'Lagos, Nigeria',
      students: 57000,
      totalFunded: 120000,
      flag: '🇳🇬',
      description: 'Leading Nigerian institution producing world-class graduates in technology, medicine, and business'
    },
    {
      id: '3',
      name: 'University of Ghana',
      location: 'Accra, Ghana',
      students: 38000,
      totalFunded: 75000,
      flag: '🇬🇭',
      description: 'Historic institution driving research and development across West Africa'
    }
  ];

  const supporters: Supporter[] = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      location: 'Silicon Valley, USA',
      totalDonated: 15000,
      studentsSupported: 12,
      flag: '🇺🇸',
      motivation: 'Tech entrepreneur supporting the next generation of African innovators'
    },
    {
      id: '2',
      name: 'James Chen',
      location: 'London, UK',
      totalDonated: 22000,
      studentsSupported: 18,
      flag: '🇬🇧',
      motivation: 'Investment banker passionate about education equality and African development'
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      location: 'Mumbai, India',
      totalDonated: 8500,
      studentsSupported: 7,
      flag: '🇮🇳',
      motivation: 'Medical professional supporting future African doctors and healthcare workers'
    }
  ];

  const handlePaymentSuccess = (txHash: string, amount: number, currency: string, method: string) => {
    alert(`🎉 Payment Successful!\n\nTransaction: ${txHash.slice(0, 20)}...\nAmount: ${amount} ${currency}\nMethod: ${method}\nStudent: ${selectedStudent?.name}`);
    setSelectedStudent(null);
    setActiveTab('overview');
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 mx-auto"
            >
              ← Back to Showcase
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Support {selectedStudent.name}</h1>
            <p className="text-gray-600">Complete the TuiShare experience with crypto payments</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Student Profile</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Name:</span> {selectedStudent.flag} {selectedStudent.name}
                </div>
                <div>
                  <span className="font-medium">School:</span> {selectedStudent.school}
                </div>
                <div>
                  <span className="font-medium">Course:</span> {selectedStudent.course}
                </div>
                <div>
                  <span className="font-medium">Story:</span> 
                  <p className="mt-1 text-gray-700">{selectedStudent.story}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Progress:</span>
                    <span className="font-semibold">${selectedStudent.raised} / ${selectedStudent.tuitionNeeded}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all" 
                      style={{ width: `${(selectedStudent.raised / selectedStudent.tuitionNeeded) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {Math.round((selectedStudent.raised / selectedStudent.tuitionNeeded) * 100)}% funded • ${selectedStudent.tuitionNeeded - selectedStudent.raised} remaining
                  </div>
                </div>
              </div>
            </div>
            
            <CryptoPayment
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              tuitionAmount={selectedStudent.tuitionNeeded - selectedStudent.raised}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 pt-20">
      <LandingNavbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link href="/" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">
            🌍 TuiShare Complete Showcase
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Connecting African students with global supporters through innovative crypto payments,
            inspired by <strong>Bitnob's cross-border vision</strong> from Nigeria 🇳🇬 to Uganda 🇺🇬
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'overview', label: '🏠 Overview', desc: 'Complete platform view' },
            { id: 'students', label: '👩‍🎓 Students', desc: 'African learners' },
            { id: 'schools', label: '🏫 Schools', desc: 'Partner universities' },
            { id: 'supporters', label: '🤝 Supporters', desc: 'Global donors' },
            { id: 'demo', label: '₿ Crypto Demo', desc: 'Live payments' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 rounded-xl transition-all text-center ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
              }`}
            >
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs opacity-75">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Platform Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                🚀 TuiShare Impact Dashboard
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{students.length}</div>
                  <div className="text-gray-600">Active Students</div>
                </div>
                <div className="text-center bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{schools.length}</div>
                  <div className="text-gray-600">Partner Schools</div>
                </div>
                <div className="text-center bg-purple-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{supporters.length}</div>
                  <div className="text-gray-600">Global Supporters</div>
                </div>
                <div className="text-center bg-orange-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    ${schools.reduce((sum, school) => sum + school.totalFunded, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Funded</div>
                </div>
              </div>
            </div>

            {/* Bitnob Connection */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-orange-800 mb-6">
                  🔗 Powered by Bitnob Infrastructure
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-2xl mb-3">⚡</div>
                    <h3 className="font-bold text-orange-700 mb-2">Lightning Network</h3>
                    <p className="text-sm text-gray-600">Instant micro-payments with minimal fees</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-2xl mb-3">💳</div>
                    <h3 className="font-bold text-orange-700 mb-2">Virtual Cards</h3>
                    <p className="text-sm text-gray-600">Seamless online payments worldwide</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-2xl mb-3">📱</div>
                    <h3 className="font-bold text-orange-700 mb-2">Mobile Money</h3>
                    <p className="text-sm text-gray-600">M-Pesa, MTN, Airtel integration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stakeholder Flow */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                🔄 Complete Ecosystem Flow
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">👩‍🎓</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">1. Students</h3>
                  <p className="text-gray-600 text-sm">Create profiles, share stories, track funding progress</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">2. Supporters</h3>
                  <p className="text-gray-600 text-sm">Browse students, make crypto payments, track impact</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🏫</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-600 mb-2">3. Schools</h3>
                  <p className="text-gray-600 text-sm">Manage students, receive funds, provide updates</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">👩‍🎓 African Students</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Brilliant minds seeking support to transform Africa through education
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {students.map((student) => (
                <div key={student.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{student.flag}</div>
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-blue-600 font-medium">{student.course}</p>
                    <p className="text-sm text-gray-500">{student.school}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-4">{student.story}</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Raised:</span>
                        <span className="font-bold text-green-600">${student.raised}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span>Goal:</span>
                        <span className="font-bold">${student.tuitionNeeded}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" 
                          style={{ width: `${(student.raised / student.tuitionNeeded) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        {Math.round((student.raised / student.tuitionNeeded) * 100)}% Complete
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                  >
                    Support with Crypto
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schools Tab */}
        {activeTab === 'schools' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🏫 Partner Universities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Leading African institutions driving educational excellence
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {schools.map((school) => (
                <div key={school.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{school.flag}</div>
                    <h3 className="text-xl font-bold text-gray-800">{school.name}</h3>
                    <p className="text-gray-600">{school.location}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-700">{school.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{school.students.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-600">${school.totalFunded.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Total Funded</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link 
                      href="/school/login"
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                    >
                      School Portal
                    </Link>
                    <Link 
                      href="/school/register"
                      className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm"
                    >
                      Register School
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supporters Tab */}
        {activeTab === 'supporters' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🤝 Global Supporters</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Changemakers from around the world investing in African education
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {supporters.map((supporter) => (
                <div key={supporter.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{supporter.flag}</div>
                    <h3 className="text-xl font-bold text-gray-800">{supporter.name}</h3>
                    <p className="text-gray-600">{supporter.location}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-700 italic">"{supporter.motivation}"</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-600">${supporter.totalDonated.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Total Donated</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{supporter.studentsSupported}</div>
                        <div className="text-xs text-gray-600">Students Helped</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link 
                      href="/supporter/login"
                      className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                    >
                      Supporter Portal
                    </Link>
                    <Link 
                      href="/supporter/register"
                      className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm"
                    >
                      Become Supporter
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">₿ Live Crypto Payment Demo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the future of education funding with Bitcoin and USDT payments
              </p>
            </div>
            
            {/* Quick Demo Access */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">🚀 Try the Complete Experience</h3>
              <p className="text-orange-700 mb-6">
                Select a student below to experience our complete crypto payment flow with all Bitnob features
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-orange-300"
                  >
                    <div className="text-2xl mb-2">{student.flag}</div>
                    <div className="font-semibold text-gray-800">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.course}</div>
                    <div className="text-sm text-orange-600 font-medium mt-2">
                      ${student.tuitionNeeded - student.raised} needed
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                💰 Available Payment Methods
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { icon: '₿', name: 'Bitcoin', desc: 'Direct BTC payments' },
                  { icon: '⚡', name: 'Lightning', desc: 'Instant micro-payments' },
                  { icon: '₮', name: 'Stablecoins', desc: 'USDT/USDC stable value' },
                  { icon: '💳', name: 'Virtual Cards', desc: 'Online card payments' },
                  { icon: '📱', name: 'Mobile Money', desc: 'M-Pesa, MTN, Airtel' },
                  { icon: '🌍', name: 'Global Transfer', desc: 'Worldwide transfers' }
                ].map((method, index) => (
                  <div key={index} className="text-center bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl mb-2">{method.icon}</div>
                    <div className="font-semibold text-sm text-gray-800">{method.name}</div>
                    <div className="text-xs text-gray-600">{method.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
