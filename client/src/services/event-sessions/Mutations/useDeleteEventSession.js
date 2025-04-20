import { useMutation } from "@tanstack/react-query";
import EventSessionsService from "../event-sessions.service";

export default function useDeleteEventSession(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return EventSessionsService.deleteEventSession(eventId , id)
        },
        ...config,
    });
    return tempMutation;
}