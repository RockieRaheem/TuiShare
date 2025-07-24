'use client';

import { useState, useEffect } from 'react';
import Spinner from './Spinner';

interface PaymentDashboardProps {
  userType: 'student' | 'school' | 'supporter';
  userEmail: string;
  userName: string;
}

interface Wallet {
  id: string;
  address: string;
  balance: string;
  label: string;
}

interface ExchangeRates {
  BTC_USD: number;
  BTC_NGN: number;
  BTC_UGX: number;
  BTC_KES: number;
}

export default function PaymentDashboard({ userType, userEmail, userName }: PaymentDashboardProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Payment form states
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  // Mobile money states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('256'); // Uganda default
  const [provider, setProvider] = useState<'mtn' | 'airtel' | 'mpesa'>('mtn');

  const [activeTab, setActiveTab] = useState<'wallet' | 'send' | 'mobile'>('wallet');

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('/api/payments/exchange-rates');
      const result = await response.json();
      if (result.success) {
        setRates(result.rates);
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    }
  };

  const createWallet = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/payments/create-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: userEmail,
          customerName: userName,
          label: `TuiShare ${userType} wallet`
        })
      });

      const result = await response.json();
      if (result.success) {
        setWallet(result.wallet);
        setSuccess('Bitcoin wallet created successfully!');
      } else {
        setError(result.message || 'Failed to create wallet');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendBitcoin = async () => {
    if (!wallet || !recipientAddress || !amount) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/payments/send-bitcoin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletId: wallet.id,
          address: recipientAddress,
          amount: parseFloat(amount),
          description,
          customerEmail: userEmail
        })
      });

      const result = await response.json();
      if (result.success) {
        setSuccess('Bitcoin sent successfully!');
        setRecipientAddress('');
        setAmount('');
        setDescription('');
      } else {
        setError(result.message || 'Failed to send Bitcoin');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendMobileMoney = async () => {
    if (!phoneNumber || !amount) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/payments/send-mobile-money', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          customerEmail: userEmail,
          customerName: userName,
          phoneNumber,
          countryCode,
          provider
        })
      });

      const result = await response.json();
      if (result.success) {
        setSuccess('Mobile money sent successfully!');
        setPhoneNumber('');
        setAmount('');
      } else {
        setError(result.message || 'Failed to send mobile money');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
          <span className="text-2xl">₿</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bitnob Payments</h2>
          <p className="text-gray-600">Powered by Bitnob API</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      {/* Exchange Rates */}
      {rates && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Live Exchange Rates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">BTC/USD:</span>
              <span className="font-semibold ml-2">${rates.BTC_USD?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">BTC/NGN:</span>
              <span className="font-semibold ml-2">₦{rates.BTC_NGN?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">BTC/UGX:</span>
              <span className="font-semibold ml-2">UGX {rates.BTC_UGX?.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">BTC/KES:</span>
              <span className="font-semibold ml-2">KES {rates.BTC_KES?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { id: 'wallet', label: 'Wallet', icon: '💼' },
          { id: 'send', label: 'Send Bitcoin', icon: '⚡' },
          { id: 'mobile', label: 'Mobile Money', icon: '📱' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Wallet Tab */}
      {activeTab === 'wallet' && (
        <div>
          {!wallet ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">₿</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Bitcoin Wallet</h3>
              <p className="text-gray-600 mb-6">Get started with secure Bitcoin payments powered by Bitnob</p>
              <button
                onClick={createWallet}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? <Spinner /> : 'Create Bitcoin Wallet'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Bitcoin Wallet</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Wallet ID:</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded-lg">{wallet.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Address:</span>
                    <p className="font-mono text-sm bg-white px-3 py-2 rounded-lg break-all">{wallet.address}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Balance:</span>
                    <p className="text-2xl font-bold text-orange-600">{wallet.balance} BTC</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Send Bitcoin Tab */}
      {activeTab === 'send' && wallet && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Recipient Bitcoin Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="Enter Bitcoin address"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Amount (BTC)</label>
            <input
              type="number"
              step="0.00000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="0.00001"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="Tuition payment"
            />
          </div>
          <button
            onClick={sendBitcoin}
            disabled={loading || !recipientAddress || !amount}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? <Spinner /> : 'Send Bitcoin'}
          </button>
        </div>
      )}

      {/* Mobile Money Tab */}
      {activeTab === 'mobile' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Country Code</label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              >
                <option value="256">🇺🇬 Uganda (+256)</option>
                <option value="254">🇰🇪 Kenya (+254)</option>
                <option value="233">🇬🇭 Ghana (+233)</option>
                <option value="234">🇳🇬 Nigeria (+234)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              >
                <option value="mtn">MTN Mobile Money</option>
                <option value="airtel">Airtel Money</option>
                <option value="mpesa">M-Pesa</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="0778520941"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Amount (USD)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:bg-white transition-all duration-300"
              placeholder="10.00"
            />
          </div>
          <button
            onClick={sendMobileMoney}
            disabled={loading || !phoneNumber || !amount}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? <Spinner /> : 'Send Mobile Money'}
          </button>
        </div>
      )}

      {!wallet && activeTab !== 'wallet' && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Please create a Bitcoin wallet first</p>
          <button
            onClick={() => setActiveTab('wallet')}
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            Go to Wallet Tab
          </button>
        </div>
      )}
    </div>
  );
}
