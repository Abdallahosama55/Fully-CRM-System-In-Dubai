import { useMutation } from "@tanstack/react-query";
import EmailConfigService from "../emailConfig.service";

export default function useAddGroupEmailConfig(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => EmailConfigService.addGroupEmailConfig(data),
    ...config,
  });

  return {
    addGroupEmailConfig: mutateAsync,
    isPending: isPending,
  };
}
