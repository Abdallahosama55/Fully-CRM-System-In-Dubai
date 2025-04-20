import { useMutation } from "@tanstack/react-query";
import ExperianceExtraService from "../extras.service";

export default function useAddExperianceExteaItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (extra) => ExperianceExtraService.updateExtraItem(extra),
    ...config,
  });

  return {
    updateExtraItem: mutateAsync,
    isPending: isPending,
  };
}
