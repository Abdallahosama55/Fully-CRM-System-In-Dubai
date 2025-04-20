import { useMutation } from "@tanstack/react-query";
import SeasonService from "../seasons.service";
export default function useEditSeason(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return SeasonService.updateSeason(data)
        },
        ...config,
    });
    return tempMutation;
}