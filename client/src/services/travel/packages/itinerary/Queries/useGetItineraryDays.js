import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ItineraryService from "../itinerary.service";

export default function useGetItineraryDays(tripId , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_DAYS , tripId],
    queryFn: () => ItineraryService.getItineraryDays(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_DAYS , tripId] };
}
