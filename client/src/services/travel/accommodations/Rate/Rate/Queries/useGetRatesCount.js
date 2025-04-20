import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import RateService from "../rate.service";

export default function useGetRatesCount(accommodationid, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_RATES_COUNT, accommodationid],
        queryFn: () => RateService.getRatesCount(accommodationid),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_RATES_COUNT, accommodationid] };
}
