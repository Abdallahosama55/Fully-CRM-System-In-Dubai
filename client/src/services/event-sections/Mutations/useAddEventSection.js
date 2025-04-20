import { useMutation } from "@tanstack/react-query";
import EventsSectionsService from "../event-sections.service";

export default function useAddEventSection(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventsSectionsService.addEventSection(eventId , payload)
        },
        ...config,
    });
    return tempMutation;
}