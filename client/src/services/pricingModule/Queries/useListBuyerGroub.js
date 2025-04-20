import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingModulesService from "../pricing_model.service";

export default (config) => {
  const query = useQuery({
    queryFn: () => PricingModulesService.listBuyerGroub(),
    queryKey: [QUERY_KEY.LIST_BUYER_GROUB],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.LIST_BUYER_GROUB] };
};
