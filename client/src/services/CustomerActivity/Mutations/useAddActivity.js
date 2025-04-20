import { useMutation } from "@tanstack/react-query";
import customerActivityService from "../customerActitvity.services";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => customerActivityService.addActivity(data),
    ...config,
  });
  return { addActivity: mutateAsync, isPending };
};
