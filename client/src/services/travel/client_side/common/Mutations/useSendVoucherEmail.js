import { useMutation } from "@tanstack/react-query";
import BookingsService from "../booking.service";

export default function useSendVoucherEmail(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => BookingsService.sendVoucherEmail(req),
        ...config,
    });
    return tempMutation;
}