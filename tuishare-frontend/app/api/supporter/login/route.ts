import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://kamwangaraheem2050:<db_password>@tuisharecluster.1vpetcg.mongodb.net/tuishare?retryWrites=true&w=majority";
mongoose.connect(uri);

const supporterSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  country: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const Supporter =
  mongoose.models.Supporter || mongoose.model("Supporter", supporterSchema);

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

    // Authenticate supporter
    const supporter = await Supporter.findOne({ email, password });
    if (!supporter) {
      return NextResponse.json({
        success: false,
        message:
          "No account found with this email. Please register first or check your email address.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful! Welcome to your supporter dashboard.",
      user: {
        id: supporter._id,
        email: supporter.email,
        name: supporter.fullName,
      },
    });
  } catch (error) {
    console.error("Supporter login error:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during login. Please try again.",
    });
  }
}
