import { useMutation } from "@tanstack/react-query";
import QuotationService from "../quotation.service";

export default function useDeleteQuotationItem(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => QuotationService.deleteQuotationItem(id),
        ...config,
    });
    return tempMutation;
}