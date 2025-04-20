import { useMutation } from "@tanstack/react-query";
import DeskService from "../desk.service";
export default function useEditDeskAI(deskId, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return DeskService.editDeskAI({ ...payload, deskId })
        },
        ...config,
    });
    return tempMutation;
}