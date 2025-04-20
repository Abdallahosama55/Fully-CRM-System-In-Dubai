import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TransferBookingService from "../transfer.booking.service";

export default function useGetTransferSearchResults(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_GET_TRANSFERS, params],
        queryFn: () => TransferBookingService.getTransferSearchResults(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_GET_TRANSFERS, params] };
}
