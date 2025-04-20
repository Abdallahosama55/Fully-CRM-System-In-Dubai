import { useMutation } from "@tanstack/react-query";
import PackagesEngagementService from "../engagement.service";

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (payload) => PackagesEngagementService.addPackageMessage(payload),
    ...config,
  });

  return mutatino;
};
