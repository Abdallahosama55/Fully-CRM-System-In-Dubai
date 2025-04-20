function EventsList({ displayedEvents }) {
  return (
    <div className="events-list">
      {displayedEvents.map((event, idx) => (
        <div key={idx} className="list-item">
          <div className="item-img">
            <img src={event.images && event.images[0]} alt="item-image" />
          </div>
          <div className="item-txt">
            <h4 className="event-title">{event.title}</h4>
            <p className="event-description">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsList;
