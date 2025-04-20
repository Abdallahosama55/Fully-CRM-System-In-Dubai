import { useMutation } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";

export default function useBookExperience(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => ExperienceBookingClientService.bookAnExperiance(req),
        ...config,
    });
    return tempMutation;
}