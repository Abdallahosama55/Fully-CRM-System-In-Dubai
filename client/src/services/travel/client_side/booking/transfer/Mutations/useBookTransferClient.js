import { useMutation } from "@tanstack/react-query";
import TransferBookingService from "../transfer.booking.service";

export default function useBookTransferClient(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => TransferBookingService.bookAnTransfer(req),
        ...config,
    });
    return tempMutation;
}