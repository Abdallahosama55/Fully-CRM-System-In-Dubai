import { useMutation } from "@tanstack/react-query";
import DeskService from "../desk.service";

export default (id, config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => DeskService.addAttachment(id, data),
    ...config,
  });
  return { addAttachment: mutateAsync, isPending };
};
