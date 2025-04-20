import { useMutation } from "@tanstack/react-query";
import DeskService from "../desk.service";

export default (config = {}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => DeskService.editDesk(data),
    ...config,
  });
  return { updateDesk: mutateAsync, isPending };
};
