import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CommunityService from "../community.service";

export default function useGetCommunityById(communityId, config) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_COMMUNITY, communityId],
    queryFn: () => CommunityService.getCommunityById(communityId),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.GET_COMMUNITY, communityId] };
}
