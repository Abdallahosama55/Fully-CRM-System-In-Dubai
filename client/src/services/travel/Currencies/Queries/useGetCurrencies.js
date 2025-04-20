import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CurrencyAPI from "services/travel/currency.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryFn: () => CurrencyAPI.getCurrencyTypes(params),
    queryKey: [QUERY_KEY.CURRENCIES, params],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.CURRENCIES, params] };
};
