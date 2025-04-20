import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useDeleteOfficeById(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return OfficesService.deleteOfficeById(id)
        },
        ...config,
    });
    return tempMutation;
}