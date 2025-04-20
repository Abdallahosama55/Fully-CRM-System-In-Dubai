import { useQuery } from "@tanstack/react-query";
import CollectionsService from "../collections.service";
import { QUERY_KEY } from "../../constants";

export default function useGetDocumentByid(
  { collectionName = "", ids = "" },
  config = {}
) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_DOCUMENT_BY_ID, ids],
    queryFn: () => CollectionsService.getDocumentByid(collectionName, ids),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_DOCUMENT_BY_ID, ids] };
}
