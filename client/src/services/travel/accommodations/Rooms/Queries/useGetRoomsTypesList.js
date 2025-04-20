import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationRoomsService from "../rooms.service";
import { useEffect } from "react";

export default function useGetRoomsTypesList(config = { onSuccess: () => {} }) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ACCOMMODATION_ROOMS_TYPES_LIST],
    queryFn: () => AccommodationRoomsService.getRoomsTypesList(),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...config,
  });
  
  useEffect(() => {
    if (query?.isSuccess) {
      config?.onSuccess();
    }
  }, [query?.isSuccess]);

  return { ...query, key: [QUERY_KEY.GET_ACCOMMODATION_ROOMS_TYPES_LIST] };
}
