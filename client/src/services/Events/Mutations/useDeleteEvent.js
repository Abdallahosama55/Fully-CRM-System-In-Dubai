import { useMutation } from "@tanstack/react-query";
import EventService from "../Events.service";

export default function useDeleteEvent(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => EventService.deleteEvent(id),
    ...config,
  });

  return {
    deleteEvent: mutateAsync,
    isPending: isPending,
  };
}
