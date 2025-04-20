import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ItineraryService from "../itinerary.service";

export default function useGetPackageLibraryItems(params , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_LIBRARY_ITEMS , params],
    queryFn: () => ItineraryService.getLibraryItems(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_LIBRARY_ITEMS , params] };
}
