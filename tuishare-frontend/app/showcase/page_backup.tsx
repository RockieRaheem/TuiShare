"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CryptoPayment from '../../components/CryptoPayment';
import LandingNavbar from '../../components/LandingNavbar';
import ChatbotAssistant from '../../components/ChatbotAssistant';

interface Student {
  id: string;
  name: string;
  school: string;
  course: string;
  tuitionNeeded: number;
  raised: number;
  story: string;
  flag: string;
  year: number;
  gpa: number;
  achievements: string[];
  urgency: 'high' | 'medium' | 'low';
  nextPaymentDue: string;
  cryptoFriendly: boolean;
}

interface School {
  id: string;
  name: string;
  location: string;
  students: number;
  totalFunded: number;
  flag: string;
  description: string;
  ranking: number;
  established: string;
  programs: string[];
  successRate: number;
  graduatesEmployed: number;
}

interface Supporter {
  id: string;
  name: string;
  location: string;
  totalDonated: number;
  studentsSupported: number;
  flag: string;
  motivation: string;
  preferredCrypto: string;
  joinedDate: string;
  impactRating: number;
}

interface ImpactStats {
  totalStudentsSupported: number;
  totalAmountRaised: number;
  averageGraduationRate: number;
  countriesReached: number;
  cryptoPercentage: number;
  activeSchools: number;
  totalTransactions: number;
  averageResponseTime: string;
}

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'schools' | 'supporters' | 'demo' | 'analytics'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'urgent' | 'crypto' | 'engineering' | 'medicine'>('all');

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const impactStats: ImpactStats = {
    totalStudentsSupported: 2847,
    totalAmountRaised: 4250000,
    averageGraduationRate: 94.2,
    countriesReached: 15,
    cryptoPercentage: 73.5,
    activeSchools: 47,
    totalTransactions: 12438,
    averageResponseTime: '2.3 minutes'
  };

  const students: Student[] = [
    {
      id: '1',
      name: 'Amara Okafor',
      school: 'University of Lagos',
      course: 'Computer Science',
      year: 3,
      gpa: 3.85,
      tuitionNeeded: 2500,
      raised: 1750,
      story: 'Brilliant blockchain developer from Lagos, building DeFi solutions for African financial inclusion.',
      flag: '🇳🇬',
      achievements: ['Dean\'s List', 'Hackathon Winner', 'Google Developer Student Club Lead'],
      urgency: 'high',
      nextPaymentDue: '2025-08-15',
      cryptoFriendly: true
    },
    {
      id: '2',
      name: 'Kwame Asante',
      school: 'Makerere University',
      course: 'Mechanical Engineering',
      year: 2,
      gpa: 3.72,
      tuitionNeeded: 1800,
      raised: 1200,
      story: 'Passionate about renewable energy engineering for rural African communities.',
      flag: '🇺🇬',
      achievements: ['Engineering Society President', 'Solar Project Leader'],
      urgency: 'medium',
      nextPaymentDue: '2025-08-20',
      cryptoFriendly: true
    },
    {
      id: '3',
      name: 'Fatima Hassan',
      school: 'University of Cairo',
      course: 'Medicine',
      year: 4,
      gpa: 3.91,
      tuitionNeeded: 3200,
      raised: 2400,
      story: 'Training to become a pediatric surgeon, dedicated to improving child healthcare.',
      flag: '🇪🇬',
      achievements: ['Medical Research Award', 'Community Health Volunteer'],
      urgency: 'high',
      nextPaymentDue: '2025-08-10',
      cryptoFriendly: false
    },
    {
      id: '4',
      name: 'Aisha Kone',
      school: 'University of Ghana',
      course: 'Civil Engineering',
      year: 1,
      gpa: 3.68,
      tuitionNeeded: 2800,
      raised: 950,
      story: 'First in her family to attend university, dreams of building sustainable infrastructure.',
      flag: '🇬🇭',
      achievements: ['Engineering Merit Scholarship', 'Sustainability Project Leader'],
      urgency: 'medium',
      nextPaymentDue: '2025-08-25',
      cryptoFriendly: true
    }
  ];

  const schools: School[] = [
    {
      id: '1',
      name: 'Makerere University',
      location: 'Kampala, Uganda',
      students: 47000,
      totalFunded: 285000,
      flag: '🇺🇬',
      description: 'Premier East African university fostering innovation and academic excellence since 1922.',
      ranking: 4,
      established: '1922',
      programs: ['Engineering', 'Medicine', 'Computer Science', 'Agriculture', 'Business'],
      successRate: 92.5,
      graduatesEmployed: 89.2
    },
    {
      id: '2',
      name: 'University of Lagos',
      location: 'Lagos, Nigeria',
      students: 57000,
      totalFunded: 420000,
      flag: '🇳🇬',
      description: 'Leading Nigerian institution producing world-class graduates in technology and business.',
      ranking: 2,
      established: '1962',
      programs: ['Computer Science', 'Medicine', 'Engineering', 'Law', 'Economics'],
      successRate: 94.8,
      graduatesEmployed: 91.7
    },
    {
      id: '3',
      name: 'University of Ghana',
      location: 'Accra, Ghana',
      students: 38000,
      totalFunded: 195000,
      flag: '🇬🇭',
      description: 'Historic institution driving research and development across West Africa.',
      ranking: 5,
      established: '1948',
      programs: ['Engineering', 'Arts', 'Social Sciences', 'Medicine', 'Agriculture'],
      successRate: 90.3,
      graduatesEmployed: 87.9
    }
  ];

  const supporters: Supporter[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      location: 'San Francisco, USA',
      totalDonated: 45000,
      studentsSupported: 18,
      flag: '🇺🇸',
      motivation: 'Former Google executive supporting the next generation of African tech innovators.',
      preferredCrypto: 'Bitcoin Lightning',
      joinedDate: 'January 2024',
      impactRating: 9.2
    },
    {
      id: '2',
      name: 'James Chen',
      location: 'London, UK',
      totalDonated: 62000,
      studentsSupported: 28,
      flag: '🇬🇧',
      motivation: 'Investment banker passionate about education equality and sustainable development.',
      preferredCrypto: 'USDT',
      joinedDate: 'March 2023',
      impactRating: 9.5
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      location: 'Mumbai, India',
      totalDonated: 28500,
      studentsSupported: 15,
      flag: '🇮🇳',
      motivation: 'Medical professional supporting future African doctors and healthcare workers.',
      preferredCrypto: 'Ethereum',
      joinedDate: 'August 2023',
      impactRating: 8.9
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.school.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' ||
                         (filterBy === 'urgent' && student.urgency === 'high') ||
                         (filterBy === 'crypto' && student.cryptoFriendly) ||
                         (filterBy === 'engineering' && student.course.toLowerCase().includes('engineering')) ||
                         (filterBy === 'medicine' && student.course.toLowerCase().includes('medicine'));
    
    return matchesSearch && matchesFilter;
  });

  const handlePaymentSuccess = (txHash: string, amount: number, currency: string, method: string) => {
    alert(`🎉 Payment Successful!\n\nTransaction: ${txHash.slice(0, 20)}...\nAmount: ${amount} ${currency}\nMethod: ${method}\nStudent: ${selectedStudent?.name}\n\nThank you for changing a life! 🌟`);
    setSelectedStudent(null);
    setActiveTab('overview');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading TuiShare Showcase...</h2>
          <p className="text-gray-600">Connecting you to African education</p>
        </div>
      </div>
    );
  }

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 mx-auto transform hover:scale-105 transition-all"
            >
              ← Back to Showcase
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Support {selectedStudent.name} {selectedStudent.flag}
            </h1>
            <p className="text-gray-600 text-lg">
              {selectedStudent.course} • {selectedStudent.school}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Profile</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-semibold">Year {selectedStudent.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPA:</span>
                    <span className="font-semibold text-green-600">{selectedStudent.gpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Payment:</span>
                    <span className="font-semibold text-orange-600">{selectedStudent.nextPaymentDue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crypto Friendly:</span>
                    <span className={`font-semibold ${selectedStudent.cryptoFriendly ? 'text-green-600' : 'text-gray-500'}`}>
                      {selectedStudent.cryptoFriendly ? '✅ Yes' : '❌ No'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Achievements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.achievements.map((achievement, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Story:</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedStudent.story}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Funding Progress</h3>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-between text-lg mb-4">
                    <span>Raised:</span>
                    <span className="font-bold text-green-600">${selectedStudent.raised.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg mb-4">
                    <span>Goal:</span>
                    <span className="font-bold">${selectedStudent.tuitionNeeded.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg mb-6">
                    <span>Remaining:</span>
                    <span className="font-bold text-orange-600">${(selectedStudent.tuitionNeeded - selectedStudent.raised).toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all" 
                      style={{ width: `${(selectedStudent.raised / selectedStudent.tuitionNeeded) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-lg font-semibold text-gray-700">
                    {Math.round((selectedStudent.raised / selectedStudent.tuitionNeeded) * 100)}% Complete
                  </div>
                </div>
                
                <div className={`mt-4 p-4 rounded-xl ${selectedStudent.urgency === 'high' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {selectedStudent.urgency === 'high' ? '🚨' : '📅'}
                    </span>
                    <span className={`font-semibold ${selectedStudent.urgency === 'high' ? 'text-red-800' : 'text-blue-800'}`}>
                      {selectedStudent.urgency === 'high' ? 'Urgent Payment Needed!' : 'Regular Payment Schedule'}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${selectedStudent.urgency === 'high' ? 'text-red-700' : 'text-blue-700'}`}>
                    Next payment due: {selectedStudent.nextPaymentDue}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <CryptoPayment 
            onPaymentSuccess={handlePaymentSuccess}
            studentName={selectedStudent.name}
            amount={selectedStudent.tuitionNeeded - selectedStudent.raised}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 pt-20">
      <LandingNavbar />
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link href="/" className="text-blue-200 hover:text-white mb-4 inline-block transform hover:scale-105 transition-all">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">
            🌍 TuiShare Global Showcase
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Connecting African students with global supporters through innovative crypto payments,
            inspired by <strong>Bitnob&apos;s cross-border vision</strong> from Nigeria 🇳🇬 to Uganda 🇺🇬
          </p>
          
          {/* Live Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white border-opacity-20">
            <div className="text-center">
              <div className="text-2xl font-bold">{impactStats.totalStudentsSupported.toLocaleString()}</div>
              <div className="text-blue-100 text-sm">Students Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${impactStats.totalAmountRaised.toLocaleString()}</div>
              <div className="text-blue-100 text-sm">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{impactStats.countriesReached}</div>
              <div className="text-blue-100 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{impactStats.cryptoPercentage}%</div>
              <div className="text-blue-100 text-sm">Crypto Payments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'overview', label: '🏠 Overview', desc: 'Platform highlights' },
            { id: 'students', label: '👩‍🎓 Students', desc: 'African learners' },
            { id: 'schools', label: '🏫 Schools', desc: 'Partner universities' },
            { id: 'supporters', label: '🤝 Supporters', desc: 'Global donors' },
            { id: 'analytics', label: '📊 Analytics', desc: 'Impact metrics' },
            { id: 'demo', label: '₿ Live Demo', desc: 'Try payments' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-4 rounded-xl transition-all text-center transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
              }`}
            >
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs opacity-75">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Search and Filter Section (for Students tab) */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search Students</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, course, or university..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Filter By</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Students</option>
                  <option value="urgent">Urgent Payments</option>
                  <option value="crypto">Crypto Friendly</option>
                  <option value="engineering">Engineering</option>
                  <option value="medicine">Medicine</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Platform Highlights */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🚀 Transforming African Education</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                TuiShare bridges the gap between talented African students and global supporters through 
                blockchain technology, creating opportunities for educational excellence across the continent.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Instant Crypto Payments</h3>
                <p className="opacity-90">Bitcoin, Lightning Network, and USDT payments reach students in seconds, not days.</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                <p className="opacity-90">Supporting students across {impactStats.countriesReached} African countries with verified academic progress.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                <p className="opacity-90">{impactStats.averageGraduationRate}% graduation rate with {impactStats.totalTransactions.toLocaleString()} successful transactions.</p>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Ready to Make an Impact?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of supporters who are changing lives through education. Start with as little as $50.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveTab('students')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105"
                  >
                    👨‍🎓 Browse Students
                  </button>
                  <button 
                    onClick={() => setActiveTab('demo')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105"
                  >
                    🪙 Try Crypto Demo
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📊 Live Platform Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Students:</span>
                    <span className="font-bold text-green-600">{filteredStudents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Partner Schools:</span>
                    <span className="font-bold text-blue-600">{schools.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Global Supporters:</span>
                    <span className="font-bold text-purple-600">{supporters.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Response Time:</span>
                    <span className="font-bold text-orange-600">{impactStats.averageResponseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">👩‍🎓 Brilliant African Students</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the next generation of African leaders, innovators, and changemakers seeking educational support.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {student.name} {student.flag}
                      </h3>
                      <p className="text-blue-600 font-medium">{student.course}</p>
                      <p className="text-sm text-gray-500">{student.school}</p>
                      <p className="text-xs text-gray-400">Year {student.year} • GPA: {student.gpa}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.urgency === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : student.urgency === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {student.urgency === 'high' ? '🚨 Urgent' : student.urgency === 'medium' ? '⏰ Soon' : '✅ On Track'}
                      </span>
                      {student.cryptoFriendly && (
                        <div className="text-xs text-orange-600 font-semibold mt-1">₿ Crypto Ready</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{student.story}</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Raised:</span>
                        <span className="font-bold text-green-600">${student.raised.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <span>Goal:</span>
                        <span className="font-bold">${student.tuitionNeeded.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all" 
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold transform hover:scale-105"
                  >
                    💰 Support with Crypto
                  </button>
                </div>
              ))}
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No students found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Schools Tab */}
        {activeTab === 'schools' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🏫 Premier African Universities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Leading institutions across Africa driving educational excellence and innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school) => (
                <div key={school.id} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {school.name} {school.flag}
                      </h3>
                      <p className="text-blue-600 font-medium">{school.location}</p>
                      <p className="text-sm text-gray-500">Est. {school.established}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">#{school.ranking}</div>
                      <div className="text-xs text-gray-500">Ranking</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{school.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600">{school.students.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600">${school.totalFunded.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Funded</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-600 mb-2">Top Programs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {school.programs.slice(0, 3).map((program, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab('students')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold transform hover:scale-105"
                  >
                    👨‍🎓 View Students
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supporters Tab */}
        {activeTab === 'supporters' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">🤝 Global Education Champions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the incredible supporters making African education dreams come true through cryptocurrency.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supporters.map((supporter) => (
                <div key={supporter.id} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {supporter.name} {supporter.flag}
                      </h3>
                      <p className="text-blue-600 font-medium">{supporter.location}</p>
                      <p className="text-sm text-gray-500">Member since {supporter.joinedDate}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">⭐ {supporter.impactRating}</div>
                      <div className="text-xs text-gray-500">Impact</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 italic mb-4">&quot;{supporter.motivation}&quot;</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600">${supporter.totalDonated.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Total Donated</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600">{supporter.studentsSupported}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="font-bold text-orange-600">{supporter.preferredCrypto}</div>
                      <div className="text-xs text-gray-600">Preferred Crypto</div>
                    </div>
                  </div>
                  
                  <Link
                    href="/supporter/register"
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-center transform hover:scale-105"
                  >
                    🚀 Become a Supporter
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">📊 Impact Analytics</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real-time metrics showing the transformative power of blockchain-enabled education funding.
              </p>
            </div>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">👨‍🎓</div>
                <div className="text-2xl font-bold">{impactStats.totalStudentsSupported.toLocaleString()}</div>
                <div className="text-blue-100 text-sm">Students Supported</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold">${impactStats.totalAmountRaised.toLocaleString()}</div>
                <div className="text-green-100 text-sm">Total Raised</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-2xl font-bold">{impactStats.averageGraduationRate}%</div>
                <div className="text-purple-100 text-sm">Graduation Rate</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 text-center transform hover:scale-105 transition-all">
                <div className="text-3xl mb-2">🌍</div>
                <div className="text-2xl font-bold">{impactStats.countriesReached}</div>
                <div className="text-orange-100 text-sm">Countries</div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Platform Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Transactions:</span>
                    <span className="font-bold text-green-600">{impactStats.totalTransactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Schools:</span>
                    <span className="font-bold text-blue-600">{impactStats.activeSchools}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Crypto Adoption:</span>
                    <span className="font-bold text-orange-600">{impactStats.cryptoPercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Growth Trends</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-800 font-semibold">Monthly Growth</span>
                      <span className="text-green-600 font-bold">+23.5%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-800 font-semibold">New Supporters</span>
                      <span className="text-blue-600 font-bold">+156 this month</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">₿ Live Crypto Payment Demo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience our seamless cryptocurrency payment system. Try it with demo funds!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">🚀 Demo Payment Features</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="font-bold">Lightning Fast</div>
                      <div className="text-sm opacity-80">Instant Bitcoin payments</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-2xl mb-2">🔒</div>
                      <div className="font-bold">Secure</div>
                      <div className="text-sm opacity-80">Blockchain verified</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl">
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-bold">Global</div>
                      <div className="text-sm opacity-80">No borders, no limits</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <Link
                  href="/crypto-demo"
                  className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                >
                  🪙 Launch Full Demo
                </Link>
                <p className="text-sm text-gray-500">
                  No real money involved - this is a safe demo environment
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating ChatBot Assistant */}
      <ChatbotAssistant page="Showcase" />
    </div>
  );
}
