import { useQuery } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";
import { QUERY_KEY } from "services/constants";

export default (id , config) => {
  const query = useQuery({
    queryFn: () => OfficesService.OfficesUsersService.getOfficeUserById(id),
    queryKey: [QUERY_KEY.GET_OFFICE_USER_BY_ID , id],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_OFFICE_USER_BY_ID] };
};
