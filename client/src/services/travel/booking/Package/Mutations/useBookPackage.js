import { useMutation } from "@tanstack/react-query";
import ExperienceBookingService from "../package.booking.service";

export default function useBookPackage(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => ExperienceBookingService.bookPackage(req),
        ...config,
    });
    return tempMutation;
}