import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useDeleteNote(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => CustomerLeadBoardService.deleteNote(id),
    ...config,
  });

  return {
    deleteNote: mutateAsync,
    isPending: isPending,
  };
}
