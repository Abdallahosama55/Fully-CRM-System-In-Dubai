import { useMutation } from "@tanstack/react-query";
import EventParticipantsService from "../event-participant.service";
export default function useEditEventParticipant({eventId , id}, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventParticipantsService.editEventParticipant(eventId , id, payload)
        },
        ...config,
    });
    return tempMutation;
}