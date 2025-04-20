import { useMutation } from "@tanstack/react-query";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingBookExperience(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => ManualBookingService.Experience.bookExperience(payload),
        ...config,
    });
    return tempMutation;
}