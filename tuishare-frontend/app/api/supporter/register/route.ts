import { NextRequest, NextResponse } from "next/server";
import { supporterAPI } from "@/lib/hybridDB";

export async function POST(request: Request) {
  try {
    const { name, email, country, password } = await request.json();

    if (!name || !email || !country || !password) {
      return NextResponse.json({
        success: false,
        message: "All required fields must be filled.",
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

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // Check if supporter already exists
    if (await supporterAPI.exists(email)) {
      return NextResponse.json({
        success: false,
        message: "An account with this email already exists. Please use a different email or try logging in.",
      });
    }

    // Create new supporter record
    const newSupporter = await supporterAPI.create({
      email,
      fullName: name,
      country,
      password
    });

    console.log('New supporter registered:', { email: newSupporter.email, name: newSupporter.fullName });

    return NextResponse.json({
      success: true,
      message: "Supporter registration successful! You can now sign in and start supporting students.",
      user: { 
        id: newSupporter.id, 
        email: newSupporter.email, 
        name: newSupporter.fullName
      }
    });
  } catch (error) {
    console.error('Supporter registration error:', error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
    });
  }
}
