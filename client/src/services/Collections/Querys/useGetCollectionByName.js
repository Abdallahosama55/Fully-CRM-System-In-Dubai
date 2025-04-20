import { useQuery } from "@tanstack/react-query";
import CollectionsService from "../collections.service";
import { QUERY_KEY } from "../../constants";

export default function useGetCollectionByName(collectionName, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_COLLECTION_BY_NAME, collectionName],
    queryFn: () => CollectionsService.getCollectionByName(collectionName),
    ...config,
  });

  return {
    ...query,
    queryKey: [QUERY_KEY.GET_COLLECTION_BY_NAME, collectionName],
  };
}
