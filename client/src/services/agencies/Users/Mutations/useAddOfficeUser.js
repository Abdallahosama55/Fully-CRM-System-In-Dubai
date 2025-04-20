import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";

export default function useAddOfficeUser(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.OfficesUsersService.addOfficeUser(data)
        },
        ...config,
    });
    return tempMutation;
}