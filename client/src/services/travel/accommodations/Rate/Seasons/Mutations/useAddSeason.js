import { useMutation } from "@tanstack/react-query";
import SeasonService from "../seasons.service";
export default function useAddSeason(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return SeasonService.addSeason(data)
        },
        ...config,
    });
    return tempMutation;
}