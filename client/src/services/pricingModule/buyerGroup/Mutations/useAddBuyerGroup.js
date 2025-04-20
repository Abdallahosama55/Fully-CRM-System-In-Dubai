import { useMutation } from "@tanstack/react-query";
import BuyerGroupService from "../buyer_group.service";

export default function useAddBuyerGroup(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return BuyerGroupService.addBuyerGroup(data)
        },
        ...config,
    });
    return tempMutation;
}