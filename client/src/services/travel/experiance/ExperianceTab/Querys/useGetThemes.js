import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";

export default function useGetThemes(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_THEMES],
    queryFn: () => ExperianceService.getThemes(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_THEMES] };
}
