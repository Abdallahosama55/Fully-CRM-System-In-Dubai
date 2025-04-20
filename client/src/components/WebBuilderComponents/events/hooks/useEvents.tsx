import { useState, useEffect } from "react";
function useEvents({ api, itemsLimit }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(api);
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [api]);

  const displayedEvents = events.slice(0, itemsLimit);
  return { events, loading, displayedEvents };
}

export default useEvents;
