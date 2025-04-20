import { useMutation } from "@tanstack/react-query";
import EventService from "../Events.service";

export default function useUpdateEvent(id, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => EventService.updateEvent(data, id),
    ...config,
  });

  return {
    updateEvent: mutateAsync,
    isPending: isPending,
  };
}
