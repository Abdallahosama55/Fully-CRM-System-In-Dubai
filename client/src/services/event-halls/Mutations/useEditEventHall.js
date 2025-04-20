import { useMutation } from "@tanstack/react-query";
import EventHallsService from "../event-halls.service";
export default function useEditEventHall(id, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventHallsService.editEventHall(id, payload)
        },
        ...config,
    });
    return tempMutation;
}