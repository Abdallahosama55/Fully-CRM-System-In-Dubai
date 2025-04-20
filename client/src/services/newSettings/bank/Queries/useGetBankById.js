import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BanksService from "../banks.service";

export default (id , config) => {
  const query = useQuery({
    queryFn: () => BanksService.getBankById(id),
    queryKey: [QUERY_KEY.GET_BANK_BY_ID , id],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_BANK_BY_ID] };
};
