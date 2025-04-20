import { useMutation } from "@tanstack/react-query";
import DeskService from "../desk.service";

export default (config = {}) => {
  const { mutateAsync } = useMutation({
    mutationFn: (id) => DeskService.deleteAttachment(id),
    ...config,
  });
  return {
    deleteAttachment: mutateAsync,
  };
};
