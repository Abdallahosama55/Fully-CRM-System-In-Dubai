import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useEditAvailability(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => {
            return AvailabilityService.updateAvailability(req)
        },
        ...config,
    });
    return tempMutation;
}