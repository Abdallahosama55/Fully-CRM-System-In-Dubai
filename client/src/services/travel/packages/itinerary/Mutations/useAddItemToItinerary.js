import { useMutation } from "@tanstack/react-query";
import ItineraryService from "../itinerary.service";

export default (tripId , config) => {
  const mutatino = useMutation({
    mutationFn: (details) => ItineraryService.addItemToItinerary({tripId , details}),
    ...config,
  });

  return mutatino;
};
