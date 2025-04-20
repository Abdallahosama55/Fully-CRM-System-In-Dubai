import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../experiance.service";
export default function useAddOrEditInclusions(id, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (values) => {
            return ExperianceService.addOrEditInclusions(values, id)
        },
        ...config,
    });
    return tempMutation;
}