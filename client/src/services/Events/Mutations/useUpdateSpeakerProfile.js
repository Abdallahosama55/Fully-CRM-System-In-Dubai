import { useMutation } from "@tanstack/react-query";
import EventService from "../Events.service";

export default function useUpdateSpeakerProfile(eventId, userId, config = {}) {
  return useMutation({
    mutationFn: (data) => EventService.updateSpeakerProfile(eventId, userId, data),
    ...config,
  });
}
