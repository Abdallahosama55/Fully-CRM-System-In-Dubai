import { useMutation } from "@tanstack/react-query";
import ItineraryService from "../itinerary.service";

export default (id , config) => {
  const mutatino = useMutation({
    mutationFn: (description) => ItineraryService.editItineraryDescription({id ,description }),
    ...config,
  });

  return mutatino;
};
