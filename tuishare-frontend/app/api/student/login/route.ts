import { NextRequest, NextResponse } from "next/server";
import { studentAPI } from "@/lib/hybridDB";

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

    // Authenticate user
    console.log('Attempting login for email:', email);
    const user = await studentAPI.authenticate(email, password);
    console.log('Authentication result:', user ? 'SUCCESS' : 'FAILED');
    
    if (!user) {
      console.log('Login failed - checking if user exists');
      const existingUser = await studentAPI.findByEmail(email);
      console.log('User exists:', existingUser ? 'YES' : 'NO');
      
      return NextResponse.json({
        success: false,
        message: "Invalid email or password. Please check your credentials and try again.",
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Login successful! Welcome to your dashboard.",
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.fullName,
        schoolName: user.schoolName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during login. Please try again.",
    });
  }
}
