"use client";
import React, { useState, useEffect } from 'react';

interface CryptoPaymentProps {
  studentId: string;
  studentName: string;
  tuitionAmount: number;
  onPaymentSuccess: (txHash: string, amount: number, currency: string, method: string) => void;
}

export default function CryptoPayment({ studentId, studentName, tuitionAmount, onPaymentSuccess }: CryptoPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<'bitcoin' | 'lightning' | 'stablecoin' | 'virtual-card' | 'mobile-money' | 'global-transfer'>('stablecoin');
  const [selectedCurrency, setSelectedCurrency] = useState<'BTC' | 'USDT' | 'USDC' | 'USD'>('USDT');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [btcPrice, setBtcPrice] = useState(0);
  const [showSavings, setShowSavings] = useState(false);
  const [autoSave, setAutoSave] = useState(false);

  // Payment method configurations
  const paymentMethods = {
    bitcoin: { icon: '₿', name: 'Bitcoin', desc: 'Direct Bitcoin payments' },
    lightning: { icon: '⚡', name: 'Lightning', desc: 'Instant micro-payments' },
    stablecoin: { icon: '₮', name: 'Stablecoins', desc: 'Price-stable payments' },
    'virtual-card': { icon: '💳', name: 'Virtual Cards', desc: 'Online card payments' },
    'mobile-money': { icon: '📱', name: 'Mobile Money', desc: 'M-Pesa, MTN, Airtel' },
    'global-transfer': { icon: '🌍', name: 'Global Transfer', desc: 'Worldwide instant transfers' }
  };

  useEffect(() => {
    // Fetch current crypto prices
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether,usd-coin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setBtcPrice(data.bitcoin?.usd || 0);
      })
      .catch(console.error);
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const calculateAmount = () => {
    if (!paymentAmount) return '0';
    const usdAmount = parseFloat(paymentAmount);
    
    switch (selectedCurrency) {
      case 'BTC':
        return btcPrice > 0 ? (usdAmount / btcPrice).toFixed(8) : '0';
      case 'USDT':
      case 'USDC':
        return usdAmount.toFixed(2);
      default:
        return usdAmount.toFixed(2);
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);
    try {
      const amount = calculateAmount();
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      // Simulate different processing times for different methods
      const processingTime = selectedMethod === 'lightning' ? 1000 : 
                           selectedMethod === 'global-transfer' ? 2000 : 3000;
      
      setTimeout(() => {
        onPaymentSuccess(mockTxHash, parseFloat(amount), selectedCurrency, selectedMethod);
        setIsProcessing(false);
        
        if (autoSave) {
          alert(`🎉 Payment successful!\n${amount} ${selectedCurrency} sent to ${studentName}\n💰 Auto-save activated: Earning rewards on future contributions!`);
        } else {
          alert(`🎉 Payment successful!\n${amount} ${selectedCurrency} sent to ${studentName} via ${paymentMethods[selectedMethod].name}`);
        }
      }, processingTime);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Support {studentName}</h2>
        <p className="text-gray-600">Powered by Bitnob Infrastructure</p>
      </div>

      {/* Bitnob Infrastructure Showcase */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 font-semibold">🚀 Bitnob Infrastructure</span>
        </div>
        <p className="text-sm text-gray-700">
          Enterprise-grade payment infrastructure with 24/7 support, secure wallets, and real-time processing across Africa and globally.
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Choose Payment Method</label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(paymentMethods).map(([key, method]) => (
            <button
              key={key}
              onClick={() => setSelectedMethod(key as any)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selectedMethod === key 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{method.icon}</span>
                <div>
                  <div className="font-semibold text-sm">{method.name}</div>
                  <div className="text-xs text-gray-500">{method.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Currency Selection (for crypto methods) */}
      {(['bitcoin', 'lightning', 'stablecoin'].includes(selectedMethod)) && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Select Currency</label>
          <div className="grid grid-cols-3 gap-2">
            {selectedMethod === 'bitcoin' && (
              <button
                onClick={() => setSelectedCurrency('BTC')}
                className={`p-3 rounded-lg border-2 ${selectedCurrency === 'BTC' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
              >
                <div className="text-center">
                  <div>₿ BTC</div>
                  <div className="text-xs">${btcPrice.toLocaleString()}</div>
                </div>
              </button>
            )}
            {selectedMethod === 'lightning' && (
              <button
                onClick={() => setSelectedCurrency('BTC')}
                className="p-3 rounded-lg border-2 border-yellow-500 bg-yellow-50"
              >
                <div className="text-center">
                  <div>⚡ BTC</div>
                  <div className="text-xs">Lightning</div>
                </div>
              </button>
            )}
            {selectedMethod === 'stablecoin' && (
              <>
                <button
                  onClick={() => setSelectedCurrency('USDT')}
                  className={`p-3 rounded-lg border-2 ${selectedCurrency === 'USDT' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="text-center">
                    <div>₮ USDT</div>
                    <div className="text-xs">$1.00</div>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedCurrency('USDC')}
                  className={`p-3 rounded-lg border-2 ${selectedCurrency === 'USDC' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="text-center">
                    <div>◉ USDC</div>
                    <div className="text-xs">$1.00</div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Payment Amount */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Payment Amount (USD)</label>
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          placeholder="Enter amount in USD"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {paymentAmount && (
          <div className="text-sm text-gray-600">
            {selectedMethod === 'lightning' && '⚡ Lightning: '}
            {selectedMethod === 'mobile-money' && '📱 Mobile Money: '}
            {selectedMethod === 'global-transfer' && '🌍 Transfer: '}
            = {calculateAmount()} {selectedCurrency}
          </div>
        )}
      </div>

      {/* Savings Option */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={(e) => setAutoSave(e.target.checked)}
            className="w-4 h-4"
          />
          <div>
            <div className="font-semibold text-yellow-800">💰 Enable Auto-Save & Rewards</div>
            <div className="text-sm text-yellow-700">Earn rewards on your crypto while supporting education</div>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="space-y-3">
        {!walletConnected ? (
          <button
            onClick={connectWallet}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {selectedMethod === 'mobile-money' ? 'Connect Mobile Money' : 
             selectedMethod === 'virtual-card' ? 'Connect Card' :
             'Connect Wallet'}
          </button>
        ) : (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-sm text-green-700">
              ✅ {selectedMethod === 'mobile-money' ? 'Mobile Money' : 'Wallet'} Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          </div>
        )}
      </div>

      {/* Payment Button */}
      {walletConnected && paymentAmount && (
        <button
          onClick={processPayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {selectedMethod === 'lightning' ? 'Lightning Processing...' :
               selectedMethod === 'global-transfer' ? 'Global Transfer...' :
               'Processing Payment...'}
            </div>
          ) : (
            <>
              {paymentMethods[selectedMethod].icon} Pay {calculateAmount()} {selectedCurrency}
            </>
          )}
        </button>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="font-semibold">🔒 Secure</div>
          <div className="text-gray-600">Enterprise Security</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="font-semibold">⚡ Instant</div>
          <div className="text-gray-600">Real-time Processing</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="font-semibold">🌍 Global</div>
          <div className="text-gray-600">Worldwide Access</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="font-semibold">🎯 24/7</div>
          <div className="text-gray-600">Always Available</div>
        </div>
      </div>

      {/* API Integration Notice */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">🔧 Developer Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Webhooks for real-time notifications</li>
          <li>• OAuth 2.0 authentication</li>
          <li>• Comprehensive API documentation</li>
          <li>• SDKs for multiple languages</li>
          <li>• Rate limiting and pagination</li>
        </ul>
      </div>
    </div>
  );
}
