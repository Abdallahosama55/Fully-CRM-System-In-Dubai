import { useMutation } from "@tanstack/react-query";
import BookingService from "../booking.service";

export default function usePreBook(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => BookingService.reserveRoom(req),
        ...config,
    });
    return tempMutation;
}