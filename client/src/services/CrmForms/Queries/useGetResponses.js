// services/CrmForms/Queries/useGetResponses.js

import { useMutation } from "@tanstack/react-query";
import FormsService from "../forms.service";

export default function useGetResponses(config = {}) {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ formId, page = 1 }) =>
            FormsService.getAllResponses({ formId, page }),
        ...config,
    });

    return {
        getResponses: mutateAsync,
        isGettingResponses: isPending,
    };
}