import { useMutation } from "@tanstack/react-query";
import EventPartnersService from "../event-partners.service";

export default function useAddEventPartner(eventId , config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return EventPartnersService.addEventPartner(eventId , payload)
        },
        ...config,
    });
    return tempMutation;
}