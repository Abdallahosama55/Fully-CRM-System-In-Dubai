import { useMutation } from "@tanstack/react-query";
import BanksService from "../banks.service";

export default function useDeleteBankById(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return BanksService.deleteBankById(id)
        },
        ...config,
    });
    return tempMutation;
}