import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";
import { useEffect } from "react";

export default function useGetExperianceType(
  id,
  config = { onSuccess: () => {}, onError: () => {} },
) {
  const query = useQuery({
    queryKey: [QUERY_KEY.EXPERIANCE_TYPE, id],
    queryFn: () => ExperianceService.getExperianceType(id),
    ...config,
  });

  useEffect(() => {
    if (query.isSuccess) {
      config.onSuccess(query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      config.onError(query?.error);
    }
  }, [query?.isSuccess, query?.error]);

  return { ...query, key: [QUERY_KEY.EXPERIANCE_TYPE, id] };
}
