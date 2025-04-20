import { useMutation } from "@tanstack/react-query";
import FrameFoldersService from "./frameFolders.service";

export default (config = {}) => {
  const { mutateAsync: addFolder, isPending: isPendingAddFolder } = useMutation({
    mutationFn: (data) => FrameFoldersService.addFolder(data),
    ...config,
  });
  const { mutateAsync: renameFolder, isPending: isPendingRenameFolder } = useMutation({
    mutationFn: ({ folderId, name }) => FrameFoldersService.renameFolder(folderId, name),
    ...config,
  });

  const { mutateAsync: deleteFolder, isPending: isPendingDeleteFolder } = useMutation({
    mutationFn: ({ folderId }) => FrameFoldersService.deleteFolder(folderId),
    ...config,
  });

  return {
    addFolder,
    renameFolder,
    deleteFolder,
    isPendingAddFolder,
    isPendingRenameFolder,
    isPendingDeleteFolder,
  };
};
