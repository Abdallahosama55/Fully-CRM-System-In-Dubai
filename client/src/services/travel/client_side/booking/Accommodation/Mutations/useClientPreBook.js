import { useMutation } from "@tanstack/react-query";
import BookingClientService from "../booking.client.service";

export default function useClientPreBook(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => BookingClientService.reserveRoom(req),
        ...config,
    });
    return tempMutation;
}