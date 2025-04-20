import { useMutation } from "@tanstack/react-query";
import EmailConfigService from "../emailConfig.service";

export default function useSaveEmailConfig(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => EmailConfigService.saveEmailConfig(data),
    ...config,
  });

  return {
    saveEmailConfig: mutateAsync,
    isPending: isPending,
  };
}
