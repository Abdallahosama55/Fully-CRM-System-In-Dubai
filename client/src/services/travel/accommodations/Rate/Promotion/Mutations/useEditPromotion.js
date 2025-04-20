import { useMutation } from "@tanstack/react-query";
import PromotionService from "../promotions.service";
export default function useEditPromotion(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => PromotionService.updatePromotion(data),
        ...config,
    });
    return tempMutation;
}