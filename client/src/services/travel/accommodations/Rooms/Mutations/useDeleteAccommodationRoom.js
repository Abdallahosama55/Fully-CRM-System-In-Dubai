import { useMutation } from "@tanstack/react-query";
import AccommodationRoomsService from "../rooms.service";
export default function useDeleteAccommodationRoom(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (roomID) => AccommodationRoomsService.deleteRoom(roomID),
        ...config,
    });
    return tempMutation;
}