import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import WebBuilderService from "../web-builder.service";

export default (id, config = {}) => {
  console.log(id , "id from hook")
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PAGE_CONTENT_BY_ID, id],
    queryFn: () => WebBuilderService.getPageById(id),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_PAGE_CONTENT_BY_ID, id] };
};
