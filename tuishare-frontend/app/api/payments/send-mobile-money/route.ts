import { NextRequest, NextResponse } from 'next/server';
import { bitnobAPI } from '@/lib/bitnob';

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      customerEmail, 
      customerName, 
      phoneNumber, 
      countryCode, 
      provider, 
      reference 
    } = await request.json();

    if (!amount || !customerEmail || !customerName || !phoneNumber || !countryCode || !provider) {
      return NextResponse.json({
        success: false,
        message: 'Amount, customer details, phone number, country code, and provider are required'
      }, { status: 400 });
    }

    console.log('Sending mobile money payment:', { 
      amount, 
      customerEmail, 
      phoneNumber, 
      countryCode, 
      provider 
    });

    const result = await bitnobAPI.sendMobileMoney({
      amount,
      customerEmail,
      customerName,
      phoneNumber,
      countryCode,
      provider,
      reference: reference || `tuishare-${Date.now()}`
    });

    if (result.success) {
      console.log('Mobile money sent successfully:', result.data);
      return NextResponse.json({
        success: true,
        message: 'Mobile money payment sent successfully',
        transaction: result.data
      });
    } else {
      console.error('Failed to send mobile money:', result.message);
      return NextResponse.json({
        success: false,
        message: result.message || 'Failed to send mobile money'
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Send mobile money API error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Internal server error'
    }, { status: 500 });
  }
}
