import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import employeesService from "../Employees.service";

export default (params, config = {}) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.EMPLOYEES, params],
    queryFn: () => employeesService.getAll(params?.page ?? 1, params?.limit ?? 100),
    ...config,
  });
  return { ...query };
};
