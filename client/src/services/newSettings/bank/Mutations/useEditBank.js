import { useMutation } from "@tanstack/react-query";
import BanksService from "../banks.service";

export default function useEditBank(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return BanksService.editBank(data)
        },
        ...config,
    });
    return tempMutation;
}