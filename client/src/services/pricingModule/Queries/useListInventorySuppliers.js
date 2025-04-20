import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingModulesService from "../pricing_model.service";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";

export default (buyerGroupId, config) => {
  const { user } = useUserContext();
  const isAgent = user?.officerType === OFFICER_TYPES.AGENT;
  let query = {};
  if (isAgent) {
    query = useQuery({
      queryFn: () => PricingModulesService.AgentService.listInventorySuppliersAgent(buyerGroupId),
      queryKey: [QUERY_KEY.LIST_INVENTORY_SUPPLIERS, buyerGroupId],
      ...config,
    });
   } else {
    query = useQuery({
      queryFn: () => PricingModulesService.listInventorySuppliers(buyerGroupId),
      queryKey: [QUERY_KEY.LIST_INVENTORY_SUPPLIERS, buyerGroupId],
      ...config,
    });
  }

  return { ...query, key: [QUERY_KEY.LIST_INVENTORY_SUPPLIERS, buyerGroupId] };
};
