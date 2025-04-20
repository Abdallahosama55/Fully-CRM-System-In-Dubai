import { useMutation } from "@tanstack/react-query";
import AgendasService from "../agendas.service";

export default function useUpdateAgendaItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ editId, agenda }) => AgendasService.updateAgendaItem(editId, agenda),
    ...config,
  });

  return {
    updateAgendaItem: mutateAsync,
    isPending: isPending,
  };
}
