import { Dropdown } from "antd";
import { FolderColoredSVG } from "assets/jsx-svg";
import { useEffect, useMemo, useState } from "react";
import VverseMediaService from "services/VverseMedia/vverse-media.service";
import { axiosCatch } from "utils/axiosUtils";

const BrowseFolders = ({ onFolderSelected, children }) => {
  const [foldersLibrary, setFoldersLibrary] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSelectedFolderPath = (folder) => {
    const path = [{ name: folder.name, id: folder.id }];
    let parent = foldersLibrary[folder?.parentId];
    while (parent) {
      path.unshift({ name: parent.name, id: parent.id });
      parent = foldersLibrary[parent?.parentId];
    }
    return path;
  };

  const handleFolderClick = ({ key }) => {
    const selectedFolder = foldersLibrary[key];
    const path = getSelectedFolderPath(selectedFolder);
    onFolderSelected({
      selectedFolder,
      path,
    });
    setIsMenuOpen(false);
  };

  const fetchFolders = async () => {
    try {
      let response = await VverseMediaService.getAllFolders();
      setFoldersLibrary(
        response.data.data?.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
      );
    } catch (err) {
      axiosCatch(err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const getFoldersList = (parentId) => {
    const allSubFolders = Object.values(foldersLibrary)?.filter(
      (folder) => folder.parentId == parentId,
    );
    return allSubFolders?.length > 0
      ? allSubFolders?.map((folder) => ({
          key: folder.id,
          label: folder.name,
          icon: <FolderColoredSVG width={14} height={14} />,
          onTitleClick: handleFolderClick,
          children: getFoldersList(folder.id)?.sort((a, b) => a.key - b.key),
        }))
      : undefined;
  };

  const foldersArray = useMemo(() => {
    return getFoldersList(null)?.sort((a, b) => a.key - b.key) ?? [];
  }, [foldersLibrary]);

  return (
    <Dropdown
      open={isMenuOpen}
      onOpenChange={setIsMenuOpen}
      menu={{
        items: foldersArray,
        onClick: handleFolderClick,
      }}
      trigger={["click"]}>
      {children}
    </Dropdown>
  );
};
export default BrowseFolders;
