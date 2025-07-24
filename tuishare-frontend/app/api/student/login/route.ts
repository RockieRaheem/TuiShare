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
    const user = await Student.findOne({ email, password });
    if (!user) {
      return NextResponse.json({
        success: false,
        message:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful! Welcome to your dashboard.",
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        schoolName: user.schoolName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during login. Please try again.",
    });
  }
}
