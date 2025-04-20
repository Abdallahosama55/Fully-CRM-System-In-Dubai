import { useMutation } from "@tanstack/react-query";
import SeasonService from "../seasons.service";
export default function useSetActivateSeasonType(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return SeasonService.setActivateSeasonType(data)
        },
        ...config,
    });
    return tempMutation;
}