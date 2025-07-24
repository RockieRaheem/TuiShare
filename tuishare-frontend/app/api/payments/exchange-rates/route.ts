import { NextRequest, NextResponse } from 'next/server';
import { bitnobAPI } from '@/lib/bitnob';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching exchange rates from Bitnob');

    const result = await bitnobAPI.getExchangeRates();

    if (result.success) {
      console.log('Exchange rates fetched successfully');
      return NextResponse.json({
        success: true,
        message: 'Exchange rates fetched successfully',
        rates: result.rates
      });
    } else {
      console.error('Failed to fetch exchange rates:', result.message);
      return NextResponse.json({
        success: false,
        message: result.message || 'Failed to fetch exchange rates'
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Exchange rates API error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal server error'
    }, { status: 500 });
  }
}
