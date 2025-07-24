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
    const { schoolName, schoolEmail, schoolAddress, contactPerson, password } =
      await request.json();

    if (
      !schoolName ||
      !schoolEmail ||
      !schoolAddress ||
      !contactPerson ||
      !password
    ) {
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
    const existingSchool = await School.findOne({ schoolEmail });
    if (existingSchool) {
      return NextResponse.json({
        success: false,
        message:
          "An account with this email already exists. Please use a different email or try logging in.",
      });
    }

    // Create new school record
    const newSchool = await School.create({
      schoolName,
      schoolEmail,
      schoolAddress,
      contactPerson,
      password,
    });

    if (!newSchool) {
      return NextResponse.json({
        success: false,
        message: "Failed to create school account. Please try again.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to TuiShare.",
      user: {
        id: newSchool._id,
        schoolEmail: newSchool.schoolEmail,
        schoolName: newSchool.schoolName,
        schoolAddress: newSchool.schoolAddress,
        contactPerson: newSchool.contactPerson,
      },
    });
  } catch (error) {
    console.error("School registration error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
    });
  }
}
