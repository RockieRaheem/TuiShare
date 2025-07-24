import { NextRequest, NextResponse } from "next/server";
import { schoolAPI } from "@/lib/hybridDB";

export async function POST(request: Request) {
  try {
    const { schoolName, schoolEmail, schoolAddress, contactPerson, password } = await request.json();

    if (!schoolName || !schoolEmail || !schoolAddress || !contactPerson || !password) {
      return NextResponse.json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(schoolEmail)) {
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

    // Check if school already exists
    if (await schoolAPI.exists(schoolEmail)) {
      return NextResponse.json({
        success: false,
        message: "An account with this email already exists. Please use a different email or try logging in.",
      });
    }

    // Create new school record
    const newSchool = await schoolAPI.create({
      email: schoolEmail,
      schoolName,
      schoolAddress,
      contactPerson,
      password
    });

    console.log('New school registered:', { email: newSchool.email, name: newSchool.schoolName });

    return NextResponse.json({
      success: true,
      message: "School registration successful! You can now sign in to access your dashboard.",
      user: { 
        id: newSchool.id, 
        email: newSchool.email, 
        name: newSchool.schoolName
      }
    });
  } catch (error) {
    console.error('School registration error:', error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
    });
  }
}
