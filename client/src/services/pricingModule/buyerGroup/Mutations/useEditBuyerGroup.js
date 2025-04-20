import { useMutation } from "@tanstack/react-query";
import BuyerGroupService from "../buyer_group.service";

export default function useEditBuyerGroup(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return BuyerGroupService.editBuyerGroup(data)
        },
        ...config,
    });
    return tempMutation;
}