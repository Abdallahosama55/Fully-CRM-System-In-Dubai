import { useMutation } from "@tanstack/react-query";
import SliderService from "../api";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, formData }) => SliderService.updateSliderInfo(id, formData),
    ...config,
  });
  return { updateSlider: mutateAsync, isPending };
};
