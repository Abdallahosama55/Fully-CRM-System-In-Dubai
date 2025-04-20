import { useMutation } from "@tanstack/react-query";
import SeasonService from "../seasons.service";
export default function useDeleteSeason(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return SeasonService.deleteSeason(id)
        },
        ...config,
    });
    return tempMutation;
}