import { NextResponse } from "next/server";
import { bitnobAPI } from "@/lib/bitnob";

export async function POST(request: Request) {
  try {
    const { customerEmail, customerName, label } = await request.json();

    if (!customerEmail || !customerName) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer email and name are required",
        },
        { status: 400 }
      );
    }

    console.log("Creating Bitnob wallet for:", {
      customerEmail,
      customerName,
      label,
    });

    const result = await bitnobAPI.createWallet({
      customerEmail,
      customerName,
      label: label || `TuiShare Wallet - ${customerName}`,
    });

    if (result.success) {
      console.log("Wallet created successfully:", result.data);
      return NextResponse.json({
        success: true,
        message: "Bitcoin wallet created successfully",
        wallet: result.data,
      });
    } else {
      console.error("Failed to create wallet:", result.message);
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to create wallet",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Create wallet API error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          typeof error === "object" &&
          error &&
          "message" in error &&
          typeof (error as { message?: unknown }).message === "string"
            ? (error as { message: string }).message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}
