import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CancelationPolicyService from "../cancellation.service";

export default function useGetCancelationPoliciesPeriodTypes(config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_CANCELATION_POLICIES_PERIOD_TYPES],
        queryFn: () => CancelationPolicyService.getCancelationPoliciesPeriodTypes(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_CANCELATION_POLICIES_PERIOD_TYPES] };
}
