"use server"

import Event from "@/Database/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });
    return await Event.find({ 
      _id: { $ne: event._id }, 
      tags: { $in: event.tags } 
    }).lean();
  } catch {
    return [];
  }
}

export const createEvent = async (formData: FormData) => {
  try {
    await connectDB();

    const agenda = (formData.get("agenda") as string)
      .split(",")
      .map(a => a.trim())
      .filter(Boolean);

    const tags = (formData.get("tags") as string)
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const event = await Event.create({
      title: formData.get("title"),
      description: formData.get("description"),
      overview: formData.get("overview"),
      venue: formData.get("venue"),
      location: formData.get("location"),
      date: formData.get("date"),
      time: formData.get("time"),
      mode: formData.get("mode"),
      audience: formData.get("audience"),
      organizer: formData.get("organizer"),
      image: "/images/event1.png",
      agenda,
      tags,
    });

    return { success: true, slug: event.slug };
  } catch (e) {
    console.error("createEvent failed:", e);
    return { success: false, slug: null };
  }
}