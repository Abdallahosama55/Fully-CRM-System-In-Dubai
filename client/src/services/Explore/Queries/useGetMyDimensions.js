import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExploreService from "services/explore.service";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SEARCH_MY_DIMENSIONS],
    queryFn: () => ExploreService.search(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.MY_DIMENSIONS] };
};
