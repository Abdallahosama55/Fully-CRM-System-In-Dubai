import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import EmailConfigService from "../emailConfig.service";

export default function useGetMainGroups(params = {}, config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.EMAIL_MAIN_GROUP, params],
    queryFn: () => EmailConfigService.getMainGroups(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.EMAIL_MAIN_GROUP, params] };
}
