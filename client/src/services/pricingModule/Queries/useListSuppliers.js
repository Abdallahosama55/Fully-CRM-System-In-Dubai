import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingModulesService from "../pricing_model.service";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";

export default (inventory_type, config) => {
  const { user } = useUserContext();
  const isAgent = user?.officerType === OFFICER_TYPES.AGENT;
  let query = {};
  if (isAgent) {
    query = useQuery({
      queryFn: () => PricingModulesService.AgentService.listDmcSuppliersAgent(inventory_type),
      queryKey: [QUERY_KEY.LIST_SUPPLIERS, inventory_type],
      ...config,
    });
  } else {
    query = useQuery({
      queryFn: () => PricingModulesService.listSuppliers(inventory_type),
      queryKey: [QUERY_KEY.LIST_SUPPLIERS, inventory_type],
      ...config,
    });
  }

  return { ...query, key: [QUERY_KEY.LIST_SUPPLIERS, inventory_type] };
};
