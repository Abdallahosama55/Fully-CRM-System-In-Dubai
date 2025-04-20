import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetPrintVoucher(params, config = {}) {
    console.log('config', config)
    console.log('params', params)
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_PRINT_VOUCHER, params],
        queryFn: () => BookingsService.getPrintVoucher(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_PRINT_VOUCHER, params] };
}
