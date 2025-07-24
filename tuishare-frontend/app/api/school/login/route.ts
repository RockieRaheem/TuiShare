import { NextRequest, NextResponse } from "next/server";
import { schoolAPI } from "@/lib/hybridDB";

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

    // Authenticate school
    const school = await schoolAPI.authenticate(email, password);
    
    if (!school) {
      return NextResponse.json({
        success: false,
        message: "No account found with this email. Please register first or check your email address.",
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Login successful! Welcome to your school dashboard.",
      user: { 
        id: school.id, 
        email: school.email, 
        name: school.schoolName
      }
    });
  } catch (error) {
    console.error('School login error:', error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during login. Please try again.",
    });
  }
}
