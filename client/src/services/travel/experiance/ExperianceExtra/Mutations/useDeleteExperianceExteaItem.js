import { useMutation } from "@tanstack/react-query";
import ExperianceExtraService from "../extras.service";

export default function useDeleteExperianceExteaItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => ExperianceExtraService.deleteExtraItem(id),
    ...config,
  });

  return {
    deleteExtraItem: mutateAsync,
    isPending: isPending,
  };
}
