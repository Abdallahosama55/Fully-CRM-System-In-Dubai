import { useMutation } from "@tanstack/react-query";
import EventSessionsService from "../event-sessions.service";
export default function useEditEventSession({eventId , id}, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventSessionsService.editEventSession(eventId , id, payload)
        },
        ...config,
    });
    return tempMutation;
}