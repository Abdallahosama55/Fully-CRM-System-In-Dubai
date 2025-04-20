import { useQuery, useMutation } from "@tanstack/react-query";
import TravelDashboard from "./travel.dashboard.service";

export const useAddAirportHotelTransfer = (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => TravelDashboard.add(data),
    ...config,
  });

  return mutatino;
};
export const useAirportHotelTransferBooking = (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => TravelDashboard.airportHotelTransferBooking(data),
    ...config,
  });

  return mutatino;
};
export const useEditAirportHotelTransfer = (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => TravelDashboard.edit(data.id, data),
    ...config,
  });

  return mutatino;
};

export const useSearchAirportHotelTransfer = (config = {}) => {
  const mutatino = useMutation({
    mutationFn: (data) => TravelDashboard.searchAirportHotelTransfer(data),
    ...config,
  });
  return mutatino;
};
export const useSearchEngine = (config = {}) => {
  const mutatino = useMutation({
    mutationFn: (data) => TravelDashboard.searchEngine(data),
    ...config,
  });
  return mutatino;
};

export const AirportSearchHotelTransfer = (params, config = {}) => {
  const query = useQuery({
    queryKey: ["AIRPORT_SEARCH_HOTEL_TRANSFER", params],
    queryFn: () => TravelDashboard.airportSearch(params),
    ...config,
  });
  return { ...query, key: ["AIRPORT_SEARCH_HOTEL_TRANSFER", params] };
};
export const AccommodationList = (params = { page: 1, size: 10, name: "Park" }, config = {}) => {
  const query = useQuery({
    queryKey: ["AIRPORT_SEARCH_HOTEL_TRANSFER", params],
    queryFn: () => TravelDashboard.accommodationList(params),
    ...config,
  });
  return { ...query, key: ["AIRPORT_SEARCH_HOTEL_TRANSFER", params] };
};

export const useGetListVehicle = (
  params = { page: 1, size: 5000, classification: "TRANSFER" },
  config = {},
) => {
  const query = useQuery({
    queryKey: ["GET_LIST_VEHICLE", params],
    queryFn: () => TravelDashboard.getListVehicle(params),
    ...config,
  });
  return { ...query, key: ["GET_LIST_VEHICLE", params] };
};

export const useGetOneOfAirportHotelTransfer = (id, config = {}) => {
  const query = useQuery({
    queryKey: ["GET_LIST_VEHICLE"],
    queryFn: () => TravelDashboard.getOneOfAirportHotelTransfer(id),
    ...config,
  });
  return { ...query, key: ["GET_LIST_VEHICLE"] };
};
export const useAirportsAccommodationList = (data, config = {}) => {
  const query = useQuery({
    queryKey: ["GET_AIRPORTS_ACCOMMODATION_LIST", data],
    queryFn: () => TravelDashboard.airportsAccommodationList(data),
    ...config,
  });
  return { ...query, key: ["GET_AIRPORTS_ACCOMMODATION_LIST", data] };
};
