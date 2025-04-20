import { useMutation } from "@tanstack/react-query";
import SliderService from "../api";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => SliderService.upsertSliderItem(data),
    ...config,
  });
  return { upsertSliderItem: mutateAsync, isPending };
};
