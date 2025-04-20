import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import LeadService from "../Leads.service";

export default function useGetAssignToEmployees(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.ASSIGN_TO_EMPLYEES],
    queryFn: () => LeadService.getAssignToEmplyees(1, 100),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.ASSIGN_TO_EMPLYEES] };
}
