import { useMutation } from "@tanstack/react-query";
import EventPartnersService from "../event-partners.service";

export default function useDeleteEventPartner(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return EventPartnersService.deleteEventPartner(id)
        },
        ...config,
    });
    return tempMutation;
}