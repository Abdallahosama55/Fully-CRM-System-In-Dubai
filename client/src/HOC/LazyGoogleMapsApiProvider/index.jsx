import React, { useState, useEffect } from 'react';
import { APIProvider } from "@vis.gl/react-google-maps";

const LazyGoogleMapsApiProvider = ({ children }) => {
  const [isApiLoaded, setApiLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (window.google) {
      setApiLoaded(true); // API already loaded
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP}&libraries=places,routes`;
      script.async = true;
      script.defer = true;

      script.onload = () => setApiLoaded(true); // Set API as loaded
      script.onerror = () => setError('Google Maps API failed to load'); // Handle error if load fails

      document.head.appendChild(script);
    }
  }, []);

  if (error) {
    console.error("GOOGLE MAP LOADING ERROR" , error);
    return <div>{children}</div>;
  }

  if (!isApiLoaded) {
    // Show a loading spinner or placeholder content until API is ready
    return <div>{children}</div>;
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP} libraries={["places", "routes"]}>
      {children}
    </APIProvider>
  );
};

export default LazyGoogleMapsApiProvider;
