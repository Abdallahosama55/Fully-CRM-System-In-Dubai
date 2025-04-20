import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EmployeeService from "../employee.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMPLOYEE_SEARCH, params],
    queryFn: () => EmployeeService.search(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.EMPLOYEE_SEARCH, params] };
};
