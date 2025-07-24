import { NextRequest, NextResponse } from "next/server";
import { studentAPI } from "@/lib/hybridDB";

export async function POST(request: Request) {
  try {
    const { fullName, email, schoolId, schoolName, password, course, story } = await request.json();

    if (!fullName || !email || !schoolId || !schoolName || !password) {
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

    // Check if student already exists
    if (await studentAPI.exists(email)) {
      return NextResponse.json({
        success: false,
        message: "An account with this email already exists. Please use a different email or try logging in.",
      });
    }

    // Create new student record
    console.log('Creating student with data:', { email, fullName, schoolId, schoolName });
    const newStudent = await studentAPI.create({
      email,
      fullName,
      schoolId,
      schoolName,
      password,
      course: course || '',
      story: story || ''
    });

    console.log('New student registered:', { email: newStudent.email, name: newStudent.fullName, id: newStudent.id });

    return NextResponse.json({
      success: true,
      message: "Registration successful! You can now sign in to access your dashboard.",
      user: { 
        id: newStudent.id, 
        email: newStudent.email, 
        name: newStudent.fullName,
        schoolName: newStudent.schoolName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
    });
  }
}
