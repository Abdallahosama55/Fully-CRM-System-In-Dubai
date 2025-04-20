import { useMutation } from "@tanstack/react-query";
import OfficesService from "services/agencies/offices.service";

export default function useFlipOfficeUserActiveStatus(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return OfficesService.OfficesUsersService.flipOfficeUserActiveStatus(id)
        },
        ...config,
    });
    return tempMutation;
}