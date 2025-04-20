import { useMutation } from "@tanstack/react-query";
import AccommodationMediaService from "../media.service";
export default function useAddMedia(id, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return AccommodationMediaService.addMediaInfo(id, data)
        },
        ...config,
    });
    return tempMutation;
}