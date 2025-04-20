import { useMutation } from "@tanstack/react-query";
import EventHallsService from "../event-halls.service";

export default function useDeleteEventHall(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return EventHallsService.deleteEventHall(id)
        },
        ...config,
    });
    return tempMutation;
}