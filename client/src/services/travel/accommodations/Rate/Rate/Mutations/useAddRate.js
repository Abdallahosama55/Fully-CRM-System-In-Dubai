import { useMutation } from "@tanstack/react-query";
import RateService from "../rate.service";
export default function useAddRate(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return RateService.addRate(data)
        },
        ...config,
    });
    return tempMutation;
}