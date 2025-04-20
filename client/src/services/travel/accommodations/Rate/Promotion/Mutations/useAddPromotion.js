import { useMutation } from "@tanstack/react-query";
import PromotionService from "../promotions.service";
export default function useAddPromotion(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => PromotionService.addPromotion(data),
        ...config,
    });
    return tempMutation;
}