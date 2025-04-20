import { useQuery } from "@tanstack/react-query";
import CollectionsService from "../collections.service";
import { QUERY_KEY } from "../../constants";

export default function useGetMetadata(collectionName, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_METADATA, collectionName],
    queryFn: () => CollectionsService.getMetadata(collectionName),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_METADATA, collectionName] };
}
