import { useMutation } from "@tanstack/react-query";
import EventParticipantsService from "../event-participant.service";

export default function useAddEventParticipant(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventParticipantsService.addEventParticipant(eventId , payload)
        },
        ...config,
    });
    return tempMutation;
}