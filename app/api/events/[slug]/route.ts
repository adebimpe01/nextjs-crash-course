import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/Database/event.model";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    // Await and extract slug from route params
    const { slug } = await params;

    // Validate slug exists and is a non-empty string
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug: slug.trim() }).lean();

    // Return 404 if event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    // Return event data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );

  } catch (error) {
    console.error("[GET /api/events/[slug]]", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}