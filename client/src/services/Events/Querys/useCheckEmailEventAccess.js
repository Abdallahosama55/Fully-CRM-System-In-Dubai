import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import EventService from "../Events.service";

export default function useCheckEmailEventAccess({ eventId, email }, config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.CHECK_EMAIL_EVENT_ACCESS, eventId, email],
    queryFn: () => EventService.checkEmailEventAccess(eventId, email),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CHECK_EMAIL_EVENT_ACCESS, eventId, email] };
}
