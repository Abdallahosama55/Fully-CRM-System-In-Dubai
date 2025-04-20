import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CancelationPolicyService from "../cancellation.service";

export default function useGetCancelationPoliciesList(accommodation_Id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_CANCELATION_POLICIES_LIST, accommodation_Id],
        queryFn: () => CancelationPolicyService.getCancelationPolicies(accommodation_Id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_CANCELATION_POLICIES_LIST, accommodation_Id] };
}
