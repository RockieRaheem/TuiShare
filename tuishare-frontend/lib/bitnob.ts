// Bitnob API integration for TuiShare
// Documentation: https://docs.bitnob.com

interface BitnobConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
  environment: 'sandbox' | 'live';
}

interface CreateWalletRequest {
  customerEmail: string;
  customerName: string;
  label?: string;
}

interface CreateWalletResponse {
  success: boolean;
  data?: {
    id: string;
    address: string;
    label: string;
    balance: string;
    customerEmail: string;
  };
  message?: string;
}

interface SendBitcoinRequest {
  walletId: string;
  address: string;
  amount: number;
  description?: string;
  customerEmail: string;
}

interface SendBitcoinResponse {
  success: boolean;
  data?: {
    id: string;
    amount: string;
    fee: string;
    address: string;
    txId: string;
    status: string;
  };
  message?: string;
}

interface LookupRequest {
  countryCode: string;
  accountNumber: string;
}

interface LookupResponse {
  success: boolean;
  data?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  message?: string;
}

interface MobileMoneyRequest {
  amount: number;
  customerEmail: string;
  customerName: string;
  phoneNumber: string;
  countryCode: string;
  provider: 'mtn' | 'airtel' | 'mpesa';
  reference?: string;
}

interface MobileMoneyResponse {
  success: boolean;
  data?: {
    id: string;
    amount: string;
    status: string;
    reference: string;
    phoneNumber: string;
  };
  message?: string;
}

class BitnobAPI {
  private config: BitnobConfig;

  constructor() {
    this.config = {
      apiKey: process.env.BITNOB_API_KEY || '',
      secretKey: process.env.BITNOB_SECRET_KEY || '',
      baseUrl: process.env.NEXT_PUBLIC_BITNOB_ENVIRONMENT === 'live' 
        ? process.env.BITNOB_BASE_URL || 'https://api.bitnob.com'
        : process.env.BITNOB_SANDBOX_URL || 'https://sandboxapi.bitnob.com',
      environment: (process.env.NEXT_PUBLIC_BITNOB_ENVIRONMENT as 'sandbox' | 'live') || 'sandbox'
    };
  }

  private async makeRequest<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      };

      // Add 2FA key for live environment (as mentioned by Build_With_Zele)
      if (this.config.environment === 'live' && process.env.BITNOB_2FA_KEY) {
        headers['X-2FA-Token'] = process.env.BITNOB_2FA_KEY;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Bitnob API Error:', error);
      throw error;
    }
  }

  // Create Bitcoin wallet for users
  async createWallet(request: CreateWalletRequest): Promise<CreateWalletResponse> {
    try {
      const data = await this.makeRequest<any>('/wallets', 'POST', request);
      return {
        success: true,
        data: data.data || data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to create wallet'
      };
    }
  }

  // Get wallet balance
  async getWalletBalance(walletId: string): Promise<{ success: boolean; balance?: string; message?: string }> {
    try {
      const data = await this.makeRequest<any>(`/wallets/${walletId}`);
      return {
        success: true,
        balance: data.data?.balance || data.balance
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get wallet balance'
      };
    }
  }

  // Send Bitcoin
  async sendBitcoin(request: SendBitcoinRequest): Promise<SendBitcoinResponse> {
    try {
      const data = await this.makeRequest<any>('/transactions/send', 'POST', request);
      return {
        success: true,
        data: data.data || data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to send Bitcoin'
      };
    }
  }

  // Account lookup (as discussed by MAESTRO)
  async lookupAccount(request: LookupRequest): Promise<LookupResponse> {
    try {
      const data = await this.makeRequest<any>('/lookup', 'POST', request);
      return {
        success: true,
        data: data.data || data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to lookup account. Make sure to enable the country in settings.'
      };
    }
  }

  // Mobile money payments (Uganda, Kenya, Ghana, etc.)
  async sendMobileMoney(request: MobileMoneyRequest): Promise<MobileMoneyResponse> {
    try {
      const data = await this.makeRequest<any>('/mobile-money/send', 'POST', request);
      return {
        success: true,
        data: data.data || data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to send mobile money'
      };
    }
  }

  // Get transaction status
  async getTransactionStatus(transactionId: string): Promise<{ success: boolean; status?: string; message?: string }> {
    try {
      const data = await this.makeRequest<any>(`/transactions/${transactionId}`);
      return {
        success: true,
        status: data.data?.status || data.status
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get transaction status'
      };
    }
  }

  // Wallet to wallet transfer (as asked by Build_With_Zele)
  async walletToWalletTransfer(fromWalletId: string, toWalletId: string, amount: number, description?: string): Promise<SendBitcoinResponse> {
    try {
      const data = await this.makeRequest<any>('/wallets/transfer', 'POST', {
        fromWalletId,
        toWalletId,
        amount,
        description
      });
      return {
        success: true,
        data: data.data || data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to transfer between wallets'
      };
    }
  }

  // Get exchange rates
  async getExchangeRates(): Promise<{ success: boolean; rates?: any; message?: string }> {
    try {
      const data = await this.makeRequest<any>('/rates');
      return {
        success: true,
        rates: data.data || data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get exchange rates'
      };
    }
  }
}

export const bitnobAPI = new BitnobAPI();
export type { 
  CreateWalletRequest, 
  CreateWalletResponse, 
  SendBitcoinRequest, 
  SendBitcoinResponse,
  LookupRequest,
  LookupResponse,
  MobileMoneyRequest,
  MobileMoneyResponse
};
