import { NextResponse } from "next/server";
import { bitnobAPI } from "@/lib/bitnob";

export async function POST(request: Request) {
  try {
    const { countryCode, accountNumber } = await request.json();

    if (!countryCode || !accountNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Country code and account number are required",
        },
        { status: 400 }
      );
    }

    console.log("Looking up account:", { countryCode, accountNumber });

    const result = await bitnobAPI.lookupAccount({
      countryCode,
      accountNumber,
    });

    if (result.success) {
      console.log("Account lookup successful:", result.data);
      return NextResponse.json({
        success: true,
        message: "Account lookup successful",
        account: result.data,
      });
    } else {
      console.error("Account lookup failed:", result.message);
      return NextResponse.json(
        {
          success: false,
          message:
            result.message ||
            "Account lookup failed. Make sure the country is supported and enabled in settings.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Account lookup API error:", error);
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
