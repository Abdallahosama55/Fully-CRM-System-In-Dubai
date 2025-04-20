import { useMutation } from "@tanstack/react-query";
import BrandingService from "../branding.service";
export default function useAddBranding(config = {}) {
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return BrandingService.addBranding(data)
        },
        ...config,
    });
    return tempMutation;
}