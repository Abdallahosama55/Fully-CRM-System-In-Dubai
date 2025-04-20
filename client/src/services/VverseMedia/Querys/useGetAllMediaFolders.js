import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import VverseMediaService from "../vverse-media.service";

export default function useGetAllMediaFolders(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_MEDIA_FOLDERS],
    queryFn: () => VverseMediaService.getAllFolders(),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_ALL_MEDIA_FOLDERS] };
}
