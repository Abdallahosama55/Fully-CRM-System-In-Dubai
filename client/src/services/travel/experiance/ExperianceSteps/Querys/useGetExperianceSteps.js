import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceStepsService from "../steps.service";

export default function useGetExperianceSteps(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_STEPS],
    queryFn: () => ExperianceStepsService.getExperianceSteps(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_STEPS] };
}
