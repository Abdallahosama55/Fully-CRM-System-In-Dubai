import { useMutation } from "@tanstack/react-query";
import EventsSectionsService from "../event-sections.service";
export default function useEditEventSection(id, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventsSectionsService.editEventSection(id, payload)
        },
        ...config,
    });
    return tempMutation;
}