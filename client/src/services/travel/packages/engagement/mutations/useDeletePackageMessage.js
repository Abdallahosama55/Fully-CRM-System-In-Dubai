import { useMutation } from "@tanstack/react-query";
import PackagesEngagementService from "../engagement.service";

export default (messageId, config) => {
  const mutatino = useMutation({
    mutationFn: () => PackagesEngagementService.deleteMessage(messageId),
    ...config,
  });

  return mutatino;
};
