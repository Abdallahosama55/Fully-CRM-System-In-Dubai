import { useMutation } from "@tanstack/react-query";
import PromotionService from "../promotions.service";
export default function useDeletePromotion(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => PromotionService.deletePromotion(id),
        ...config,
    });
    return tempMutation;
}