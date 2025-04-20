import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ItineraryService from "../itinerary.service";

export default function useGetItineraryItemById(itineraryId , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_ITINERARY_ITEM_BY_ID , itineraryId],
    queryFn: () => ItineraryService.getItineraryItemById(itineraryId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_ITINERARY_ITEM_BY_ID , itineraryId] };
}
