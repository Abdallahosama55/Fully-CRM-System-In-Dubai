import { useMutation } from "@tanstack/react-query";
import EventPartnersService from "../event-partners.service";
export default function useEditEventPartner(id, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventPartnersService.editEventPartner(id, payload)
        },
        ...config,
    });
    return tempMutation;
}