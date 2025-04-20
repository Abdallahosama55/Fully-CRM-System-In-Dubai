import { useMutation } from "@tanstack/react-query";
import { updatePortalStatus } from "../customer.service";

export default function useUpdatePortalStatus(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, status }) => updatePortalStatus(id, status),
    ...config,
  });

  return {
    isPending,
    updatePortalsStatus: mutateAsync,
  };
}
