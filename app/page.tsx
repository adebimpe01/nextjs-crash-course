import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/Database/event.model";
import {  cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  "use cache";
  cacheLife("hours");
  
  let events: IEvent[] = [];

  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    events = data.events ?? [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <section className="max-w-10xl mx-auto px-5 py-10">
      <h1 className="text-center">The Hub To Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackatons, Meetups, Conferences, All In One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-6 px-5">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event.slug} className="list-none">
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <p className="text-light-200">No events found</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default page;