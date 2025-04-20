import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CancelationPolicyService from "../cancellation.service";

export default function useGetCancelationPoliciesList(experience_Id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_CANCELATION_POLICIES_LIST_EXPERIANCE, experience_Id],
        queryFn: () => CancelationPolicyService.getCancelationPolicies(experience_Id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_CANCELATION_POLICIES_LIST_EXPERIANCE, experience_Id] };
}
