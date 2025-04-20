import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";
import TransferBookingService from "../transfer.booking.service";

export default function useGetTransferSearchResultsClient(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_TRANSFERS, params],
        queryFn: () => TransferBookingService.getTransferSearchResults(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_GET_TRANSFERS, params] };
}
