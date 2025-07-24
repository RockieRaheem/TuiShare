import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://kamwangaraheem2050:<db_password>@tuisharecluster.1vpetcg.mongodb.net/tuishare?retryWrites=true&w=majority";
mongoose.connect(uri);

const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  fullName: String,
  schoolId: String,
  schoolName: String,
  password: String,
  course: String,
  story: String,
  createdAt: { type: Date, default: Date.now },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export async function POST(request: Request) {
  try {
    const { fullName, email, schoolId, schoolName, password, course, story } =
      await request.json();

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
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json({
        success: false,
        message:
          "An account with this email already exists. Please use a different email or try logging in.",
      });
    }

    // Create new student record
    const newStudent = await Student.create({
      email,
      fullName,
      schoolId,
      schoolName,
      password,
      course: course || "",
      story: story || "",
    });

    if (!newStudent) {
      return NextResponse.json({
        success: false,
        message: "Failed to create student account. Please try again.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to TuiShare.",
      user: {
        id: newStudent._id,
        email: newStudent.email,
        name: newStudent.fullName,
        fullName: newStudent.fullName,
        schoolName: newStudent.schoolName,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
    });
  }
}
