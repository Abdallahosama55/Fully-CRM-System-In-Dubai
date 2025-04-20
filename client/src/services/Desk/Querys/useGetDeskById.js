import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DeskService from "../desk.service";
import { queryClient } from "services/queryClient";

export default (id, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DESK_INFO_BY_ID, id],
    queryFn: () => DeskService.getById(id),
    refetchOnMount: false,
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.DESK_INFO_BY_ID, id] };
};

export const fetchDeskById = async (id) => {
  const rest = await queryClient.fetchQuery({
    queryKey: [QUERY_KEY.DESK_INFO_BY_ID, id],
    queryFn: () => DeskService.getById(id),
  });
  return rest;
};
