import { useQuery } from "@tanstack/react-query";
import CollectionsService from "../collections.service";
import { QUERY_KEY } from "../../constants";

export default function useListCollections(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.QUERY_COLLECTIONS],
    queryFn: () => CollectionsService.listCollections(),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.QUERY_COLLECTIONS] };
}
