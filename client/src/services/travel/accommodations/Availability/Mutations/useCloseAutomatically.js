import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useCloseAutomatically(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => {
            return AvailabilityService.closeAutomatically(req)
        },
        ...config,
    });
    return tempMutation;
}