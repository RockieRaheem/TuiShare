import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://kamwangaraheem2050:<db_password>@tuisharecluster.1vpetcg.mongodb.net/tuishare?retryWrites=true&w=majority";
mongoose.connect(uri);

const schoolSchema = new mongoose.Schema({
  schoolName: String,
  schoolEmail: { type: String, unique: true },
  schoolAddress: String,
  contactPerson: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const School = mongoose.models.School || mongoose.model("School", schoolSchema);

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
    const school = await School.findOne({ schoolEmail: email, password });
    if (!school) {
      return NextResponse.json({
        success: false,
        message:
          "No account found with this email. Please register first or check your email address.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful! Welcome to your school dashboard.",
      user: {
        id: school._id,
        email: school.schoolEmail,
        name: school.schoolName,
      },
    });
  } catch (error) {
    console.error("School login error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during login. Please try again.",
    });
  }
}
