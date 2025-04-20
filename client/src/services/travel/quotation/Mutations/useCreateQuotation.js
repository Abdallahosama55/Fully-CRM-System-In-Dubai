import { useMutation } from "@tanstack/react-query";
import QuotationService from "../quotation.service";

export default function useCreateQuotation(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => QuotationService.createQuotation(payload),
    ...config,
  });
  return tempMutation;
}
