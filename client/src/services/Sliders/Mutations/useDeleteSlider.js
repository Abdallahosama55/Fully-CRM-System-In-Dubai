import { useMutation } from "@tanstack/react-query";
import SliderService from "../api";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => SliderService.deleteSlider(id),
    ...config,
  });
  return { deleteSlider: mutateAsync, isPending };
};
