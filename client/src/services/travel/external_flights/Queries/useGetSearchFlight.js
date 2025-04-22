import { useQuery } from "@tanstack/react-query";
import ChartersService from "../external_flights.service";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import { useEffect, useRef } from "react";

export default (params, config = {}) => {
  const previousPageRef = useRef(params?.page);

  const query = useQuery({
    queryFn: () => ChartersService.getSearchFlight(params),
    queryKey: [QUERY_KEY.CHARTER_SEARCH_FLIGHTS, params],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true, // Smooth transitions between pages
    enabled: false,
    ...config,
  });

  const search = () => {
    if (params) {
      query?.refetch();
    }
  };

  useEffect(() => {
    if (params && previousPageRef.current !== params?.page) {
      query?.refetch();
      previousPageRef.current = params?.page;
    }
  }, [params, params?.page, query]);

  return {
    ...query,
    search,
    key: [QUERY_KEY.CHARTER_SEARCH_FLIGHTS, params],
    currentPage: params?.page || 1,
  };
};

export const fetchFlights = (params, config = {}) => {
  return queryClient.fetchQuery({
    queryFn: () => ChartersService.getSearchFlight(params),
    queryKey: [QUERY_KEY.CHARTER_SEARCH_FLIGHTS, params],
    ...config,
  });
};
