import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesEngagementService from "../engagement.service";

export default function useListEngagementMessages(tripId , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGES_ENGAGEMENT_MESSAGES , tripId],
    queryFn: () => PackagesEngagementService.listEngagementMessages(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGES_ENGAGEMENT_MESSAGES , tripId] };
}
