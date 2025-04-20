import { useQuery } from "@tanstack/react-query";
import BookingClientService from "../booking.client.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetAccommodationPensionsListClient(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.GET_ACCOMMODATION_PENSIONS_LIST],
        queryFn: () => BookingClientService.getAccommodationPensionsList(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.GET_ACCOMMODATION_PENSIONS_LIST] };
}
