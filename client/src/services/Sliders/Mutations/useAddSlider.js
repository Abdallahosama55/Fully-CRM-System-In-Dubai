import { useMutation } from "@tanstack/react-query";
import SliderService from "../api";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => SliderService.addSlider(data),
    ...config,
  });
  return { createSlider: mutateAsync, isPending };
};
