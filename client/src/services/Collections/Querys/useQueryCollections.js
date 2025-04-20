import { useQuery } from "@tanstack/react-query";
import CollectionsService from "../collections.service";
import { QUERY_KEY } from "../../constants";

export default function useQueryCollections(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUERY_COLLECTIONS, params],
    queryFn: () => CollectionsService.queryCollections(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.QUERY_COLLECTIONS, params] };
}
