import { useMutation } from "@tanstack/react-query";
import SeasonService from "../seasons.service";
export default function useDisabelOpenSeason(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (parms) => {
            return SeasonService.disabelOpenSeason(parms)
        },
        ...config,
    });
    return tempMutation;
}