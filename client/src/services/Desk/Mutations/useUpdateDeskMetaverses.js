import { useMutation } from "@tanstack/react-query";
import DeskService from "../desk.service";

export default (config) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, ...data }) => DeskService.updateMetaverse(id, data),
    ...config,
  });

  return { updateMetaverse: mutateAsync, isPending };
};
