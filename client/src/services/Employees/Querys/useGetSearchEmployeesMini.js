import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import employeesService from "../Employees.service";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SEARCH_EMPLOYEES, params, "mini"],
    queryFn: () => employeesService.getAllSearchMini(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.SEARCH_EMPLOYEES, params, "mini"] };
};
