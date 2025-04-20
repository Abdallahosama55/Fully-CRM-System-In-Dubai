import { useMutation } from "@tanstack/react-query";
import EventService from "../Events.service";

export default function useAddEvent(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => EventService.addEvent(data),
    ...config,
  });

  return {
    addEvent: mutateAsync,
    isPending: isPending,
  };
}
