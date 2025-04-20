import { useMutation } from "@tanstack/react-query";
import ExperienceBookingService from "../booking.service";

export default function useBookExperience(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => ExperienceBookingService.bookAnExperiance(req),
        ...config,
    });
    return tempMutation;
}