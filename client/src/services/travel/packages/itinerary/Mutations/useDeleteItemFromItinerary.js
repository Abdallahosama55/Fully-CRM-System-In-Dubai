import { useMutation } from "@tanstack/react-query";
import ItineraryService from "../itinerary.service";

export default (tripId , config) => {
  const mutatino = useMutation({
    mutationFn: (itineraryItemId) => ItineraryService.deleteItemFromItinerary({tripId , itineraryItemId}),
    ...config,
  });

  return mutatino;
};
