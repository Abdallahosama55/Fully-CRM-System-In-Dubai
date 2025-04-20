import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";
import VoucherDetailsService from "../vouchers.service";

export default function useGetVoucherDetails(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY_CLIENT.GET_VOUCHER_DETAILS, params],
    queryFn: () => VoucherDetailsService.getVoucherDetails(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY_CLIENT.GET_VOUCHER_DETAILS, params] };
}
