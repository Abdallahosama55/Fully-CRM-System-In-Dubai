import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CommunityService from "../community.service";

export default function useListCommunity(config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_COMMUNITY],
    queryFn: () => CommunityService.listCommunity(),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_COMMUNITY] };
}
