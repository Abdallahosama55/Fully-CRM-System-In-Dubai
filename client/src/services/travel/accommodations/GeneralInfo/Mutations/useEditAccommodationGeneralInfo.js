import { useMutation } from "@tanstack/react-query";
import AccommodationGeneralInfoService from "../generalInfo.service";
export default function useEditAccommodationGeneralInfo(id, config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return AccommodationGeneralInfoService.editGeneralInfo(id, data)
        },
        ...config,
    });
    return tempMutation;
}