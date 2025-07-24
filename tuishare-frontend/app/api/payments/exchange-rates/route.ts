import { NextResponse } from "next/server";
import { bitnobAPI } from "@/lib/bitnob";

export async function GET(request: Request) {
  try {
    console.log("Fetching exchange rates from Bitnob");

    const result = await bitnobAPI.getExchangeRates();

    if (result.success) {
      console.log("Exchange rates fetched successfully");
      return NextResponse.json({
        success: true,
        message: "Exchange rates fetched successfully",
        rates: result.rates,
      });
    } else {
      console.error("Failed to fetch exchange rates:", result.message);
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to fetch exchange rates",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Exchange rates API error:", error);
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
