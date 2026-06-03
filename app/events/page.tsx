import EventCard from "@/components/EventCard";
import { IEvent } from "@/Database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsPage = async () => {
  let events: IEvent[] = [];

  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    events = data.events ?? [];
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-8 mt-5">All Events</h1>
      <ul className="events px-5">
        {events.length > 0 ? (
          events.map((event: IEvent) => (
            <li key={event.slug} className="list-none">
              <EventCard {...event} />
            </li>
          ))
        ) : (
          <p>No events found</p>
        )}
      </ul>
    </section>
  );
};

export default EventsPage;