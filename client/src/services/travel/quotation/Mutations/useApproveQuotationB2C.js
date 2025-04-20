import { useMutation } from "@tanstack/react-query";
import QuotationService from "../quotation.service";

export default function useApproveQuotationB2C(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (id) => QuotationService.approveQuotationB2C(id),
    ...config,
  });
  return tempMutation;
}
