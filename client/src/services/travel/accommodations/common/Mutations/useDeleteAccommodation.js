
import { useMutation } from "@tanstack/react-query";
import AccommodationAPI from "../../accommodation.service";
export default function useDeleteAccommodation(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (id) => {
            return AccommodationAPI.deleteAccommodation(id)
        },
        ...config,
    });
    return tempMutation;
}