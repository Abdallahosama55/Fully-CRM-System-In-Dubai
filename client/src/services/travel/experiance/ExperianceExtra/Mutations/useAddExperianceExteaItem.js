import { useMutation } from "@tanstack/react-query";
import ExperianceExtraService from "../extras.service";

export default function useAddExperianceExteaItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ productId, extra }) => ExperianceExtraService.addExteaItem(extra, productId),
    ...config,
  });

  return {
    addExteaItem: mutateAsync,
    isPending: isPending,
  };
}
