import React from "react";

function EventsCard({ displayedEvents }) {
  return (
    <div className="events-card">
      {displayedEvents.map((event, idx) => (
        <div
          key={idx}
          className="card-item"
          style={{
            backgroundImage: `url(${event.images && event.images[0]})`,
          }}
        >
          <div className="card-txt">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">
              {event.description.substr(0, 100)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsCard;
