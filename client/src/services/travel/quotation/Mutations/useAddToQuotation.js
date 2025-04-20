import { useMutation } from "@tanstack/react-query";
import QuotationService from "../quotation.service";

export default function useAddToQuotation(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => QuotationService.addToQuotation(payload),
        ...config,
    });
    return tempMutation;
}