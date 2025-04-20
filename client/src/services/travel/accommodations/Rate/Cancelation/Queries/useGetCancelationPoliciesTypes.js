import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CancelationPolicyService from "../cancellation.service";
import { useEffect } from "react";

export default function useGetCancelationPoliciesTypes(config = {onSuccess: () => {}}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_CANCELATION_POLICIES_TYPES],
    queryFn: () => CancelationPolicyService.getCancelationPoliciesTypes(),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...config,
  });

  useEffect(() => {
    if (query?.isSuccess) {
      config?.onSuccess();
    }
  }, [query?.isSuccess]);
  return { ...query, key: [QUERY_KEY.GET_CANCELATION_POLICIES_TYPES] };
}
