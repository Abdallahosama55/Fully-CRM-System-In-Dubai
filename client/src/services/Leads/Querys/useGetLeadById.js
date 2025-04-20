import { useQuery } from "@tanstack/react-query";
import LeadService from "../Leads.service";
import { QUERY_KEY } from "services/constants";

export default (id, config = {}) => {
  const query = useQuery({
    queryFn: () => LeadService.getLeadById(id),
    queryKey: [QUERY_KEY.LEAD_BY_ID, id],
    ...config,
  });
  return {
    ...query,
    queryKey: [QUERY_KEY.LEAD_BY_ID, id],
  };
};
