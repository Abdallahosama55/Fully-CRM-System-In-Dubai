import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingModulesService from "../pricing_model.service";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";

export default (params, config) => {
  const { user } = useUserContext();
  const isAgent = user?.officerType === OFFICER_TYPES.AGENT;
  let query = {};
  if (isAgent) {
    query = useQuery({
      queryFn: () => PricingModulesService.AgentService.getPriceModelPriceAgent(params),
      queryKey: [QUERY_KEY.GET_PRICE_MODEL_PRICE, params],
      ...config,
    });
  } else {
    query = useQuery({
      queryFn: () => PricingModulesService.getPriceModelPrice(params?.supplierId),
      queryKey: [QUERY_KEY.GET_PRICE_MODEL_PRICE, params?.supplierId],
      ...config,
    });
  }

  return { ...query, key: [QUERY_KEY.GET_PRICE_MODEL_PRICE, isAgent ? params : params?.supplierId] };
};
