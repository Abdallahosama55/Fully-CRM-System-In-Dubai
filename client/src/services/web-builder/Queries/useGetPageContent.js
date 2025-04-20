import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import WebBuilderService from "../web-builder.service";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PAGE_CONTENT, params],
    queryFn: () => WebBuilderService.getPageContent(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_PAGE_CONTENT, params] };
};
