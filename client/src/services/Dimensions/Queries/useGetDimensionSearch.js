import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DimensionsService from "services/dimensions.service";

export default (params, config = {}) => {
  return useQuery({
    queryFn: () => DimensionsService.searchDimensions(params),
    queryKey: [QUERY_KEY.DIMENSION_SEARCH, params],
    ...config,
    refetchOnMount: false,
  });
};
