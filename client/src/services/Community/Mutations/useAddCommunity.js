import { useMutation } from "@tanstack/react-query";
import CommunityService from "../community.service";

export default function useAddCommunity(config = {}) {
  return useMutation({
    mutationFn: (data) => CommunityService.addCommunity(data),
    ...config,
  });
}
