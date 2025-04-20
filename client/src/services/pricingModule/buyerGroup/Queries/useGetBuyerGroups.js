import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BuyerGroupService from "../buyer_group.service";

export default (config) => {
  const query = useQuery({
    queryFn: () => BuyerGroupService.getBuyerGroups(),
    queryKey: [QUERY_KEY.GET_BUYER_GROUPS],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_BUYER_GROUPS] };
};
