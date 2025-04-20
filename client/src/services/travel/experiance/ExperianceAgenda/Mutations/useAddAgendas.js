import { useMutation } from "@tanstack/react-query";
import AgendasService from "../agendas.service";

export default function useAddAgendas(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => AgendasService.getAgendas(id),
    ...config,
  });

  return {
    getAgendas: mutateAsync,
    isPending: isPending,
  };
}
