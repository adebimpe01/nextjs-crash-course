"use client"

import { useState } from "react";
import { createEvent } from "@/lib/Actions/EventActions";
import { useRouter } from "next/navigation";

const CreateEventForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        overview: "",
        venue: "",
        location: "",
        date: "",
        time: "",
        mode: "offline",
        audience: "",
        organizer: "",
        agenda: "",
        tags: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const { success, slug } = await createEvent(formData);

        if (success && slug) {
            router.push(`/events/${slug}`);
        } else {
            console.error("Failed to create event");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-event-form">
            <div className="flex flex-col gap-2">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Event title" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Event description" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Overview</label>
                <textarea name="overview" value={form.overview} onChange={handleChange} placeholder="Short overview" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Venue</label>
                <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue name" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Time</label>
                <input type="time" name="time" value={form.time} onChange={handleChange} required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Mode</label>
                <select name="mode" value={form.mode} onChange={handleChange}>
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label>Audience</label>
                <input name="audience" value={form.audience} onChange={handleChange} placeholder="Target audience" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Organizer</label>
                <input name="organizer" value={form.organizer} onChange={handleChange} placeholder="Organizer name" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Agenda (comma separated)</label>
                <input name="agenda" value={form.agenda} onChange={handleChange} placeholder="Keynote, Workshop, Q&A" required />
            </div>
            <div className="flex flex-col gap-2">
                <label>Tags (comma separated)</label>
                <input name="tags" value={form.tags} onChange={handleChange} placeholder="react, javascript, web" required />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Event"}
            </button>
        </form>
    )
}

export default CreateEventForm;