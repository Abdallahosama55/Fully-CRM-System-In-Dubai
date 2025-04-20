import { useMutation } from "@tanstack/react-query";
import CancelationPolicyService from "../cancellation.service";
export default function useDeleteCancelationPolicy(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => CancelationPolicyService.deleteCancelationPolicy(id),
        ...config,
    });
    return tempMutation;
}