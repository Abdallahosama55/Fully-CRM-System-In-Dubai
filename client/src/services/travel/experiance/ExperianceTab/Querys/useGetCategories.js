import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";

export default function useGetCategories(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_CATEGORIES],
    queryFn: () => ExperianceService.getCategories(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_CATEGORIES] };
}
