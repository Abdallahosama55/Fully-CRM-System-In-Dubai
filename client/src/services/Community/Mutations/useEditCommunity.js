import { useMutation } from "@tanstack/react-query";
import CommunityService from "../community.service";

export default function useEditCommunity(communityId, config = {}) {
  return useMutation({
    mutationFn: (data) => CommunityService.editCommunity(communityId, data),
    ...config,
  });
}
