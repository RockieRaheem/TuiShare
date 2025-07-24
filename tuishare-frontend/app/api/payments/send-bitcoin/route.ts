import { NextRequest, NextResponse } from 'next/server';
import { bitnobAPI } from '@/lib/bitnob';

export async function POST(request: NextRequest) {
  try {
    const { walletId, address, amount, description, customerEmail } = await request.json();

    if (!walletId || !address || !amount || !customerEmail) {
      return NextResponse.json({
        success: false,
        message: 'Wallet ID, address, amount, and customer email are required'
      }, { status: 400 });
    }

    console.log('Sending Bitcoin payment:', { walletId, address, amount, customerEmail });

    const result = await bitnobAPI.sendBitcoin({
      walletId,
      address,
      amount,
      description: description || 'TuiShare tuition payment',
      customerEmail
    });

    if (result.success) {
      console.log('Bitcoin sent successfully:', result.data);
      return NextResponse.json({
        success: true,
        message: 'Bitcoin payment sent successfully',
        transaction: result.data
      });
    } else {
      console.error('Failed to send Bitcoin:', result.message);
      return NextResponse.json({
        success: false,
        message: result.message || 'Failed to send Bitcoin'
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Send Bitcoin API error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal server error'
    }, { status: 500 });
  }
}
