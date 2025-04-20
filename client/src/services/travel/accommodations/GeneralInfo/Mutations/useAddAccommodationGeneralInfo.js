import { useMutation } from "@tanstack/react-query";
import AccommodationGeneralInfoService from "../generalInfo.service";

export default function useAddAccommodationGeneralInfo(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return AccommodationGeneralInfoService.addGeneralInfo(data)
        },
        ...config,
    });
    return tempMutation;
}