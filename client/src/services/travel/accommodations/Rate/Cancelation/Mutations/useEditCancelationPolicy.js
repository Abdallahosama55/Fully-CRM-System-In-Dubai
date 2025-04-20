import { useMutation } from "@tanstack/react-query";
import CancelationPolicyService from "../cancellation.service";
export default function useEditCancelationPolicy(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => CancelationPolicyService.updateCancelationPolicy(payload),
        ...config,
    });
    return tempMutation;
}