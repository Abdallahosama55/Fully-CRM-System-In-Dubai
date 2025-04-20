import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import LeadService from "../Leads.service";

export default function useGetSourceList(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LEADS_SOURCE_LIST],
    queryFn: () => LeadService.getSourceList(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.LEADS_SOURCE_LIST] };
}
