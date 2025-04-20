import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";
export default function useAddReverseStatment(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.StatementsService.addReverseStatment(data)
        },
        ...config,
    });
    return tempMutation;
}