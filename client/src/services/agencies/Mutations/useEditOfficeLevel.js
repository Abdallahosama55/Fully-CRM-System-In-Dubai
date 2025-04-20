import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useEditOfficeLevel(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            console.log(data)
            return OfficesService.editOfficeLevel(data)
        },
        ...config,
    });
    return tempMutation;
}