import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useEditOffice(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.editOffice(data)
        },
        ...config,
    });
    return tempMutation;
}