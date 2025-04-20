import { useMutation } from "@tanstack/react-query";
import NotesService from "../notes.service";

export default function useDeleteNote(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => NotesService.deleteNote(id),
    ...config,
  });

  return {
    deleteNote: mutateAsync,
    isPending: isPending,
  };
}
