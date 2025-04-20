import { useMutation } from "@tanstack/react-query";
import EventsSectionsService from "../event-sections.service";

export default function useDeleteEventSection(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return EventsSectionsService.deleteEventSection(id)
        },
        ...config,
    });
    return tempMutation;
}