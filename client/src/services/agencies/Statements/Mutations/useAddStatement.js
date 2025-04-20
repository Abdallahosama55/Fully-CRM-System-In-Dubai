import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";

export default function useAddStatement(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.StatementsService.addStatement(data)
        },
        ...config,
    });
    return tempMutation;
}