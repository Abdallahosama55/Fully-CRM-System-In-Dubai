import { useMutation } from "@tanstack/react-query";
import TransferBookingService from "../transfer.booking.service";

export default function useBookTransfer(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => TransferBookingService.bookAnTransfer(req),
        ...config,
    });
    return tempMutation;
}