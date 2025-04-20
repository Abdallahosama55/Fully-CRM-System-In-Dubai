import { useMutation } from "@tanstack/react-query";
import BuyerGroupService from "../buyer_group.service";

export default function useDeleteBuyerGroupById(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return BuyerGroupService.deleteBuyerGroupById(id)
        },
        ...config,
    });
    return tempMutation;
}