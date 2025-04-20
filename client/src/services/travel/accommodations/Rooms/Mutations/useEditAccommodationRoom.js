import { useMutation } from "@tanstack/react-query";
import AccommodationRoomsService from "../rooms.service";
export default function useEditAccommodationRoom(roomID, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (payload) => {
            return AccommodationRoomsService.editRoom(roomID, payload)
        },
        ...config,
    });
    return tempMutation;
}