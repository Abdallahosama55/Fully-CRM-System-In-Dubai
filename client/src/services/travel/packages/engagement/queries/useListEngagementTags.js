import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesEngagementService from "../engagement.service";

export default function useListEngagementTags(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_ENGAGEMENT_TAGS],
    queryFn: () => PackagesEngagementService.listEngagementTags(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_ENGAGEMENT_TAGS] };
}
