import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import LeadService from "../Leads.service";

export default function useGetCommonData(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.COMMON_DATA],
    queryFn: () => LeadService.getCommonData(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.COMMON_DATA] };
}
