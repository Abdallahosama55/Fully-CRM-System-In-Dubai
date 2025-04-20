import { useMutation } from "@tanstack/react-query";
import ItineraryService from "../itinerary.service";

export default (tripId , config) => {
  const mutatino = useMutation({
    mutationFn: (payload) => ItineraryService.addItineraryDay({tripId , ...payload}),
    ...config,
  });

  return mutatino;
};
