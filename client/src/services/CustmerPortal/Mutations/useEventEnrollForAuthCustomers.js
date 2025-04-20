import { useMutation } from "@tanstack/react-query";
import CustmerPortalService from "../customer-portal.service";

export default function useEventEnrollForAuthCustomers(config = {}) {
  return useMutation({
    mutationFn: (eventId) => CustmerPortalService.eventEnroll(eventId),
    ...config,
  });
}
