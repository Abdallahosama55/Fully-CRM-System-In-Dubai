import { useMutation } from "@tanstack/react-query";
import PricingModulesService from "../pricing_model.service";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";

export default function useSetSupplierToBuyerGroub(config = {}) {
    const { user } = useUserContext();
    const isAgent = user?.officerType === OFFICER_TYPES.AGENT;
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return isAgent ? PricingModulesService.AgentService.setSupplierToBuyerGroubAgent(data) 
            : PricingModulesService.setSupplierToBuyerGroub(data)
        },
        ...config,
    });
    return tempMutation;
}