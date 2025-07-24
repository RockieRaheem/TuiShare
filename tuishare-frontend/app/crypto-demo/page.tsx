"use client";
import React, { useState } from 'react';
import CryptoPayment from '../../components/CryptoPayment';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  school: string;
  course: string;
  tuitionNeeded: number;
  raised: number;
  story: string;
  flag: string;
}

export default function CryptoDemo() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const sampleStudents = [
    {
      id: '1',
      name: 'Amina Nakato',
      school: 'Makerere University, Uganda',
      course: 'Computer Science',
      tuitionNeeded: 2500,
      raised: 800,
      story: 'Brilliant student from rural Uganda seeking to become a software engineer',
      flag: '🇺🇬'
    },
    {
      id: '2', 
      name: 'Kemi Adebayo',
      school: 'University of Lagos, Nigeria',
      course: 'Medicine',
      tuitionNeeded: 3200,
      raised: 1200,
      story: 'Aspiring doctor who wants to serve rural communities',
      flag: '🇳🇬'
    },
    {
      id: '3',
      name: 'Fatima Hassan',
      school: 'University of Ghana',
      course: 'Engineering',
      tuitionNeeded: 2800,
      raised: 600,
      story: 'First in her family to attend university, dreams of building infrastructure',
      flag: '🇬🇭'
    }
  ];

  const handlePaymentSuccess = (txHash: string, amount: number, currency: string, method: string) => {
    alert(`🎉 Payment Successful!\n\nTransaction: ${txHash.slice(0, 20)}...\nAmount: ${amount} ${currency}\nMethod: ${method}\nStudent: ${selectedStudent?.name}`);
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
            >
              ← Back to Students
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Support {selectedStudent.name}</h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
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
                  <span className="font-medium">Story:</span> {selectedStudent.story}
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between mb-2">
                    <span>Progress:</span>
                    <span>${selectedStudent.raised} / ${selectedStudent.tuitionNeeded}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(selectedStudent.raised / selectedStudent.tuitionNeeded) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {Math.round((selectedStudent.raised / selectedStudent.tuitionNeeded) * 100)}% funded
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌍 TuiShare Crypto Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience borderless education funding powered by Bitcoin and USDT - 
            inspired by <strong className="text-orange-600">Bitnob's cross-border innovation</strong> 
            from Nigeria to Uganda
          </p>
        </div>

        {/* Bitnob Story Section */}
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-8 mb-12 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              🚀 Inspired by Bitnob's Vision
            </h2>
            <p className="text-orange-700 leading-relaxed max-w-4xl mx-auto">
              When Bitnob traveled from <strong>Nigeria 🇳🇬 to Uganda 🇺🇬</strong> to host this hackathon, 
              they demonstrated something powerful: <strong>cryptocurrency can unite Africa</strong> by solving 
              payment barriers that traditional banking cannot. TuiShare applies this same vision to education funding, 
              enabling supporters worldwide to instantly fund African students using Bitcoin and USDT.
            </p>
          </div>
        </div>

        {/* Students Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Support African Students with Crypto
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{student.flag}</div>
                  <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-gray-600">{student.course}</p>
                  <p className="text-sm text-gray-500">{student.school}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-3">{student.story}</p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Raised:</span>
                      <span className="font-semibold">${student.raised}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Goal:</span>
                      <span className="font-semibold">${student.tuitionNeeded}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
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
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 px-4 rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-all font-semibold"
                >
                  Support with Crypto
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Crypto Transforms African Education
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Instant Transfers</h3>
              <p className="text-sm text-gray-600">Payments arrive in minutes, not days</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Low Fees</h3>
              <p className="text-sm text-gray-600">Save on traditional banking charges</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Global Access</h3>
              <p className="text-sm text-gray-600">Support from anywhere in the world</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">Track every transaction on blockchain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
