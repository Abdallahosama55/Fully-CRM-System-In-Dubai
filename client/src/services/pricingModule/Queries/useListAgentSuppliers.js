import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingModulesService from "../pricing_model.service";
import { useEffect } from "react";

export default (config) => {
  const localConfig = {
    onSuccess: () => {},
    onError: () => {},
    ...config,
  };
  const query = useQuery({
    queryFn: () => PricingModulesService.listAgentSuppliers(),
    queryKey: [QUERY_KEY.LIST_AGENT_SUPPLIERS],
    ...localConfig,
  });

  useEffect(() => {
    if (query.isSuccess) {
      localConfig.onSuccess(query.data);
    }
  }, [query.isSuccess]);

  useEffect(() => {
    if (query.isError) {
      localConfig.onError(query.error);
    }
  }, [query.isError]);

  return { ...query, key: [QUERY_KEY.LIST_AGENT_SUPPLIERS] };
};
