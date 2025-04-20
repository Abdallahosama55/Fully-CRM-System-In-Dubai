import { useMutation } from "@tanstack/react-query";
import EventParticipantsService from "../event-participant.service";

export default function useDeleteEventParticipant(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return EventParticipantsService.deleteEventParticipant(eventId , id)
        },
        ...config,
    });
    return tempMutation;
}