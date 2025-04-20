import { useMutation } from "@tanstack/react-query";
import EmailConfigService from "../emailConfig.service";

export default function useEditGroupEmailConfig(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => EmailConfigService.editGroupEmailConfig(data.groupid, data.data),
    ...config,
  });

  return {
    editGroupEmailConfig: mutateAsync,
    isPending: isPending,
  };
}
