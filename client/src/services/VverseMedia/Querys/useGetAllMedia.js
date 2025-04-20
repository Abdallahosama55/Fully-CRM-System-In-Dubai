import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import VverseMediaService from "../vverse-media.service";

export default function useGetAllMedia(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_MEDIA],
    queryFn: () => VverseMediaService.getAll({ limit: 1000 }),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_ALL_MEDIA] };
}
