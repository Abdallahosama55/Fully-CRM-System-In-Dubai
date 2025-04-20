import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useAddAvailability(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => {
            return AvailabilityService.addAvailability(req)
        },
        ...config,
    });
    return tempMutation;
}