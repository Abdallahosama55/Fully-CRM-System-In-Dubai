import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import OfficesService from "../offices.service";

export default (id , config) => {
  const query = useQuery({
    queryFn: () => OfficesService.getOfficeById(id),
    queryKey: [QUERY_KEY.GET_OFFICE_BY_ID , id],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_OFFICE_BY_ID] };
};
