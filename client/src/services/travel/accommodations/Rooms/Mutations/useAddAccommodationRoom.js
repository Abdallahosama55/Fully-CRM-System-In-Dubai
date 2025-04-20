import { useMutation } from "@tanstack/react-query";
import AccommodationRoomsService from "../rooms.service";
export default function useAddAccommodationRoom(accommodationID, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return AccommodationRoomsService.addRoom(accommodationID, payload)
        },
        ...config,
    });
    return tempMutation;
}