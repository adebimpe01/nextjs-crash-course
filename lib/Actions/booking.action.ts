"use server";

import Booking from "@/Database/booking.model";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export const createBooking = async ({ 
  eventId, 
  email 
}: { 
  eventId: string; 
  email: string 
}) => {
  try {
    await connectDB();

    if (!eventId) throw new Error("eventId is required");
    
    const objectId = new mongoose.Types.ObjectId(eventId);
    await Booking.create({ eventId: objectId, email });
    
    return { success: true };
  } catch (e: any) {
    console.error("create Booking failed:", e.message);
    return { success: false };
  }
}