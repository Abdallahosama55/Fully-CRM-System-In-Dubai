import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import DeskService from "../desk.service";

export default (id, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.DESK_EMPLOYEES_BY_ID, id],
    queryFn: () => DeskService.getDeskEmployees(id),

    ...config,
  });

  return { ...query };
};
