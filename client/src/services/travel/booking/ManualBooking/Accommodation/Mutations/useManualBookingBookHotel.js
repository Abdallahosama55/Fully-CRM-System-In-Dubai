import { useMutation } from "@tanstack/react-query";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingBookHotel(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => ManualBookingService.Accommodation.bookHotel(payload),
        ...config,
    });
    return tempMutation;
}