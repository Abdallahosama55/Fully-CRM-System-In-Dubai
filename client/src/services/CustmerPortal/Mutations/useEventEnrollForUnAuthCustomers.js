import { useMutation } from "@tanstack/react-query";
import CustmerPortalService from "../customer-portal.service";

export default function useEventEnrollForUnAuthCustomers(config = {}) {
  return useMutation({
    mutationFn: ({ eventId, email }) => CustmerPortalService.unAuthEventEnroll(eventId, email),
    ...config,
  });
}
