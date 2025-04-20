import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BuyerGroupService from "../buyer_group.service";

export default (id , config) => {
  console.log({id})
  const query = useQuery({
    queryFn: () => BuyerGroupService.getBuyerGroupById(id),
    queryKey: [QUERY_KEY.GET_BUYER_GROUP_BY_ID , id],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_BUYER_GROUP_BY_ID] };
};
