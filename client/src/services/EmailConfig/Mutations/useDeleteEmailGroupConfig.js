import { useMutation } from "@tanstack/react-query";
import EmailConfigService from "../emailConfig.service";

export default function useDeleteEmailGroupConfig(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (groupId) => EmailConfigService.deleteGroupConfig(groupId),
    ...config,
  });

  return {
    deleteGroupConfig: mutateAsync,
    isPending: isPending,
  };
}
