import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useAddAutomatically(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (req) => {
            return AvailabilityService.addAutomatically(req)
        },
        ...config,
    });
    return tempMutation;
}