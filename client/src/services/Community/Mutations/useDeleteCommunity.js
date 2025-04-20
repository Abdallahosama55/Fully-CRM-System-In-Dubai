import { useMutation } from "@tanstack/react-query";
import CommunityService from "../community.service";

export default function useDeleteCommunity(config = {}) {
  return useMutation({
    mutationFn: (communityId) => CommunityService.deleteCommunity(communityId),
    ...config,
  });
}
