import { useMutation } from "@tanstack/react-query";
import EventSessionsService from "../event-sessions.service";

export default function useAddEventSession(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventSessionsService.addEventSession(eventId , payload)
        },
        ...config,
    });
    return tempMutation;
}