import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../index";

export default function useGetAllExperiances(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_EXPERIANCES , params],
    queryFn: () => ExperianceService.getAllExperiances(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_ALL_EXPERIANCES , params] };
}
