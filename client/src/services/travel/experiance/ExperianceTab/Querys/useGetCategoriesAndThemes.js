import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";

export default function useGetCategoriesAndThemes(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_CATEGORIES_AND_THEMES],
    queryFn: () => ExperianceService.getCategoriesAndThemes(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_CATEGORIES_AND_THEMES] };
}
