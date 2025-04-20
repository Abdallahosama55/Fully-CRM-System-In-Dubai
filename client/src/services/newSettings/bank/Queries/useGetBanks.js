import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BanksService from "../banks.service";

export default (config) => {
  const query = useQuery({
    queryFn: () => BanksService.getBanks(),
    queryKey: [QUERY_KEY.GET_BANKS],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_BANKS] };
};
