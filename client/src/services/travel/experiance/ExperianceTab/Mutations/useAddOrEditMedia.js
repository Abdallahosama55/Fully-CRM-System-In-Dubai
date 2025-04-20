import { useMutation } from "@tanstack/react-query";
import ExperianceService from "../experiance.service";

export default function useAddOrEditMedia(id, config = {}) {
    console.log('RUN RUN RUN RUN');
    const tempMutation = useMutation({
        mutationFn: (data) => {
            return ExperianceService.addOrEditMedia({
                images: data.images,
                videos: data.videos?.map(el => el.value),
                metaverse: data.metaverse?.map(el => el.value),
            }, id)
        },
        ...config,
    });
    return tempMutation;
}