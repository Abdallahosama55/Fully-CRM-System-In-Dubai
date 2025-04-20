import { useMutation } from "@tanstack/react-query";
import frameService from "./frame.service";

export default (config = {}) => {
  const { mutateAsync: upsertFrames, isPendingUpsert } = useMutation({
    mutationFn: (data) => frameService.upsert(data),
    ...config,
  });

  const { mutateAsync: updateFavorite, isPending: isPendingStatusUpdate } = useMutation({
    mutationFn: ({ frameId, isFav }) => frameService.updateFavorite(frameId, isFav),
    ...config,
  });

  const { mutateAsync: addToFolder, isPending: isPendingAddToFolder } = useMutation({
    mutationFn: ({ frameId, folderId }) => frameService.addToFolder(frameId, folderId),
    ...config,
  });

  return {
    upsertFrames,
    updateFavorite,
    addToFolder,
    isPendingUpsert,
    isPendingStatusUpdate,
    isPendingAddToFolder,
  };
};
