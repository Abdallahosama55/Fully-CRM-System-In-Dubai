import { useMutation } from "@tanstack/react-query";
import EventHallsService from "../event-halls.service";

export default function useAddEventHall(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventHallsService.addEventHall(eventId , payload)
        },
        ...config,
    });
    return tempMutation;
}