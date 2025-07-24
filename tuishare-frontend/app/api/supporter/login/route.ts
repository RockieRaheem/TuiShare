import { NextResponse } from "next/server";
import { supporterAPI } from "@/lib/hybridDB";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Please enter both email and password.",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Authenticate supporter
    const supporter = await supporterAPI.authenticate(email, password);
    
    if (!supporter) {
      return NextResponse.json({
        success: false,
        message: "No account found with this email. Please register first or check your email address.",
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Login successful! Welcome to your supporter dashboard.",
      user: { 
        id: supporter.id, 
        email: supporter.email, 
        name: supporter.fullName
      }
    });
  } catch (error) {
    console.error('Supporter login error:', error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during login. Please try again.",
    });
  }
}
