import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";

export default function useAddCreditLineLimit(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return OfficesService.StatementsService.addCreditLineLimit(payload)
        },
        ...config,
    });
    return tempMutation;
}