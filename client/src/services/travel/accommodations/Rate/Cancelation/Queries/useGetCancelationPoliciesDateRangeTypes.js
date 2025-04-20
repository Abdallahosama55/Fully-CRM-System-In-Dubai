import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CancelationPolicyService from "../cancellation.service";

export default function useGetCancelationPoliciesDateRangeTypes(accommodation_Id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_CANCELATION_POLICIES_DATE_RANGE_TYPES, accommodation_Id],
        queryFn: () => CancelationPolicyService.getCancelationPoliciesDateRangeTypes(),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_CANCELATION_POLICIES_DATE_RANGE_TYPES, accommodation_Id] };
}
