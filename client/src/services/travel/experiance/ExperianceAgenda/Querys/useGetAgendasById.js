import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AgendasService from "../agendas.service";

export default function useGetAgendasById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_AGENDAS_BY_ID, id],
    queryFn: () => AgendasService.getById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_EXPERIANCE_AGENDAS_BY_ID, id] };
}
