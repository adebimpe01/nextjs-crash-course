import CreateEventForm from "@/components/CreateEventForm";

const CreateEventPage = () => {
  return (
    <main>
      <section>
        <div className="header">
          <h1>Create Event</h1>
          <p className="mt-2">Fill in the details to create a new event</p>
        </div>
        <CreateEventForm />
      </section>
    </main>
  )
}

export default CreateEventPage;