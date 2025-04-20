import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingListHotels(params, config = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTELS, params],
    queryFn: ({ pageParam }) => {
      return ManualBookingService.Accommodation.listHotels({
        ...params,
        page: pageParam,
        size: 30,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage?.currentPage === lastPage?.totalPages) return null;
      return lastPage?.currentPage + 1;
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTELS, params] };
}
