import { useMutation } from "@tanstack/react-query";
import QuotationService from "../quotation.service";

export default function useBookQuotation(config = {}) {
  const tempMutation = useMutation({
    mutationFn: (payload) => QuotationService.bookQuotation(payload),
    ...config,
  });
  return tempMutation;
}
