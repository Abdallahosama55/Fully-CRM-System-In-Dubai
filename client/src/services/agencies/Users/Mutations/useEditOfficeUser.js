import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";
export default function useEditOfficeUser(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return OfficesService.OfficesUsersService.editOfficeUser(data)
        },
        ...config,
    });
    return tempMutation;
}