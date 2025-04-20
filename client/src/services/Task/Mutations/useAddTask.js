import { useMutation } from "@tanstack/react-query";
import taskService from "../task.service";

export default (config) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => taskService.addTask(data),
    ...config,
  });

  return { addTask: mutateAsync, isPending };
};
