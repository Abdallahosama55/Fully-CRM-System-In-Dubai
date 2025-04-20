import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CommonService from "services/common.service";

export default function useCheckEmailEventAccessAndEnroll({ eventId, email }, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CHECK_EMAIL_EVENT_ACCESS, eventId, email],
    queryFn: () => CommonService.checkEmailEventAccessAndEnroll(eventId, email),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.CHECK_EMAIL_EVENT_ACCESS, eventId, email] };
}
