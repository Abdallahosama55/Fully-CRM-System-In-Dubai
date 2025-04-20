import { useMutation } from "@tanstack/react-query";
import BanksService from "../banks.service";

export default function useAddBank(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return BanksService.addBank(data)
        },
        ...config,
    });
    return tempMutation;
}