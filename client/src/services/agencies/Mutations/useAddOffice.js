import { useMutation } from "@tanstack/react-query";
import OfficesService from "../offices.service";

export default function useAddOffice(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.addOffice(data)
        },
        ...config,
    });
    return tempMutation;
}