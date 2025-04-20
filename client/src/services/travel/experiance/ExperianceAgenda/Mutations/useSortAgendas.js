import { useMutation } from "@tanstack/react-query";
import AgendasService from "../agendas.service";

export default function useSortAgendas(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ sortingData, productId }) => AgendasService.sortAgendas(sortingData, productId),
    ...config,
  });

  return {
    sortAgendas: mutateAsync,
    isPending: isPending,
  };
}
