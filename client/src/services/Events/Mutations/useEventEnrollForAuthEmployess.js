import { useMutation } from "@tanstack/react-query";
import EventService from "../Events.service";

export default function useEventEnrollForAuthEmployess(config = {}) {
  return useMutation({
    mutationFn: (eventId) => EventService.eventEnroll(eventId),
    ...config,
  });
}
