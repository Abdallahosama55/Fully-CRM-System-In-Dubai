import { useQuery } from "@tanstack/react-query";
import BookingClientService from "../booking.client.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetAccommodationTypesListClient(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.GET_ACCOMMODATION_TYPE_LIST],
        queryFn: () => BookingClientService.getAccommodationTypesList(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.GET_ACCOMMODATION_TYPE_LIST] };
}
