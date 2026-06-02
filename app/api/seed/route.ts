import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/Database/event.model";

export async function GET() {
  try {
    await connectDB();

    // Clear existing events first
    await Event.deleteMany({});

    await Event.insertMany([
      {
        title: "React Conf 2024",
        description: "A conference about React and the future of web development",
        overview: "Join us for a day of talks and workshops",
        image: "/images/event1.png",
        venue: "Convention Center",
        location: "San Francisco, CA",
        date: "2024-03-15",
        time: "09:00 AM",
        mode: "offline",
        audience: "Developers",
        agenda: ["Opening keynote", "React 19 features", "Q&A"],
        organizer: "Meta",
        tags: ["react", "javascript", "frontend"],
        slug: "react-conf-2024",
      },
      {
        title: "Next.js Summit",
        description: "A conference about Next.js and the future of web",
        overview: "Join us for a day of talks and workshops",
        image: "/images/event2.png",
        venue: "Convention Center",
        location: "Austin, TX",
        date: "2024-04-22",
        time: "10:00 AM",
        mode: "offline",
        audience: "Developers",
        agenda: ["Keynote", "Workshops", "Q&A"],
        organizer: "Vercel",
        tags: ["nextjs", "react"],
        slug: "nextjs-summit",
      },
      {
        title: "JavaScript World Conference",
        description: "A conference about JavaScript",
        overview: "Join us for a day of talks",
        image: "/images/event3.png",
        venue: "Convention Center",
        location: "New York, NY",
        date: "2024-05-08",
        time: "08:30 AM",
        mode: "hybrid",
        audience: "Developers",
        agenda: ["Keynote", "Workshops", "Q&A"],
        organizer: "JS Foundation",
        tags: ["javascript", "web"],
        slug: "javascript-world",
      },
    ]);

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}