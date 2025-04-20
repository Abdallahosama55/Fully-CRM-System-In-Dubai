import { useMutation } from "@tanstack/react-query";
import AgendasService from "../agendas.service";

export default function useAddAgendaItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, agenda }) => AgendasService.addAgendaItem(agenda, id),
    ...config,
  });

  return {
    addAgendaItem: mutateAsync,
    isPending: isPending,
  };
}
