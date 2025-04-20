import { useMutation } from "@tanstack/react-query";
import PricingModulesService from "../pricing_model.service";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";

export default function useDeletePriceModel(config = {}) {
    const { user } = useUserContext();
    const isAgent = user?.officerType === OFFICER_TYPES.AGENT;
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return isAgent ? PricingModulesService.AgentService.deletePriceModelAgent(id):  PricingModulesService.deletePriceModel(id)
        },
        ...config,
    });
    return tempMutation;
}