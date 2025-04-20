import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import EmailConfigService from "../emailConfig.service";

export default function useGetEmailConfig(params = {}, config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.EMAIL_CONFIG, params],
    queryFn: () => EmailConfigService.getEmailConfig(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.EMAIL_CONFIG, params] };
}
