import { useMutation } from "@tanstack/react-query";
import AgendasService from "../agendas.service";

export default function useDeleteAgendaItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => AgendasService.deleteAgendaItem(id),
    ...config,
  });

  return {
    deleteAgendaItem: mutateAsync,
    isPending: isPending,
  };
}
