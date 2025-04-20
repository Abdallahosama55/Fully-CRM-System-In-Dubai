import useEvents from "./hooks/useEvents";
import EventsCard from "./EventsCard";
import EventsList from "./EventsList";

const EventsComponent = ({ title, api, viewStyle, itemsLimit }) => {
  const { events, loading, displayedEvents } = useEvents({ api, itemsLimit });

  return (
    <div className="events-container">
      {loading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          {title && <h3>{title}</h3>}
          {viewStyle === "card" ? (
            <EventsCard displayedEvents={displayedEvents} />
          ) : (
            <EventsList displayedEvents={displayedEvents} />
          )}
          {events.length > itemsLimit && (
            <div>
              <a href="#" className="view-all">
                View All
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventsComponent;
