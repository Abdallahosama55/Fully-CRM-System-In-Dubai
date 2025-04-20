import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceExtraService from "../extras.service";

export default function useGetExperianceExtrasById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_EXTRAS_BY_ID],
    queryFn: () => ExperianceExtraService.getById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_EXTRAS_BY_ID] };
}
