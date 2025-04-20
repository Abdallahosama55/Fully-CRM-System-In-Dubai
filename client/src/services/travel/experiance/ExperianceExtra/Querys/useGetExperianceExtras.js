import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceExtraService from "../extras.service";

export default function useGetExperianceExtras(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_EXTRAS],
    queryFn: () => ExperianceExtraService.getExtras(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_EXTRAS] };
}
