import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";

export default function useUpdateStatementStatus(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.StatementsService.updateStatementStatus(data)
        },
        ...config,
    });
    return tempMutation;
}