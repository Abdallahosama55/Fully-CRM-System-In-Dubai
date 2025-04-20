import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import WebBuilderService from "../web-builder.service";

export default (config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PAGES_LIST],
    queryFn: () => WebBuilderService.getPagesList(),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_PAGES_LIST] };
};
