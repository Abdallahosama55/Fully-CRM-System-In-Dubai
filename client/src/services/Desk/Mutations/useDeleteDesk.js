import { useMutation } from "@tanstack/react-query";
import DeskService from "../desk.service";

export default (config = {}) => {
  const { mutateAsync } = useMutation({
    mutationFn: (id) => DeskService.deleteDesk(id),
    ...config,
  });
  return {
    deleteDesk: mutateAsync,
  };
};
