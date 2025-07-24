import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://kamwangaraheem2050:<db_password>@tuisharecluster.1vpetcg.mongodb.net/tuishare?retryWrites=true&w=majority";
mongoose.connect(uri);

const supporterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  country: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const Supporter =
  mongoose.models.Supporter || mongoose.model("Supporter", supporterSchema);

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
    const existingSupporter = await Supporter.findOne({ email });
    if (existingSupporter) {
      return NextResponse.json({
        success: false,
        message:
          "An account with this email already exists. Please use a different email or try logging in.",
      });
    }

    // Create new supporter record
    const newSupporter = await Supporter.create({
      name,
      email,
      country,
      password,
    });

    if (!newSupporter) {
      return NextResponse.json({
        success: false,
        message: "Failed to create supporter account. Please try again.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to TuiShare.",
      user: {
        id: newSupporter._id,
        email: newSupporter.email,
        name: newSupporter.name,
        country: newSupporter.country,
      },
    });
  } catch (error) {
    console.error("Supporter registration error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during registration. Please try again.",
    });
  }
}
