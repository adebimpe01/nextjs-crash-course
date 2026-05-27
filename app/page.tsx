import EventCard from "@/components/EventCard";
import  ExploreBtn  from "@/components/ExploreBtn";
import { events } from "@/lib/constant";

const page = () => {
  return (

    <section>
      <h1 className="text-center">The Hub To Every Dev <br /> Event You Can't Miss</h1>
      <div className="text-center mt-5">
      </div>
      <p className="text-center mt-5">Hackatons,Meetups, Conferences, All In One Place</p>
        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>
          <ul className="events">
            {events.map((event) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>
    </section>
  )
}

export default page