import { useMutation } from "@tanstack/react-query";
import CancelationPolicyService from "../cancellation.service";
export default function useAddCancelationPolicy(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => CancelationPolicyService.addCancelationPolicy(payload),
        ...config,
    });
    return tempMutation;
}