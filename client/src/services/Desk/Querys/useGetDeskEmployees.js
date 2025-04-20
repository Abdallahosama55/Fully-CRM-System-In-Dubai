import { useQuery } from "@tanstack/react-query";
import DeskService from "../desk.service";
import { QUERY_KEY } from "services/constants";

export default (type, config = {}) => {
  const query = useQuery({
    queryFn: () => DeskService.getDesksEmployees(type),
    queryKey: [QUERY_KEY.DESK_EMPLOYEES, type],
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.DESK_EMPLOYEES, type] };
};
