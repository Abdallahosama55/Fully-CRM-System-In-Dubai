import { useQuery } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";
import { QUERY_KEY } from "services/constants";

export default (params , config) => {
  const query = useQuery({
    queryFn: () => OfficesService.StatementsService.getAgentStatements(params),
    queryKey: [QUERY_KEY.GET_AGENT_OFFICES_STATEMENTS , params],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_AGENT_OFFICES_STATEMENTS , params] };
};
