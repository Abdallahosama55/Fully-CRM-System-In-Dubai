import { Col, Row, Breadcrumb } from "antd";
import FoldersTreeSVG from "assets/jsx-svg/FoldersTreeSVG";
import { useMemo } from "react";

const FoldersBreadcrumb = ({ folderPath, onFetchFolderData }) => {
  const itemsList = useMemo(() => {
    return folderPath.reduce((acc, curr) => {
      acc.push({
        type: "separator",
        separator: ">",
      });
      acc.push({
        title: curr.name,
        className: "clickable",
        onClick: () => handleFetchFolderData(curr.id),
      });
      return acc;
    }, []);
  }, [folderPath]);

  const handleFetchFolderData = (folderId) => {
    onFetchFolderData(folderId);
  };

  return (
    <Row gutter={[12]} align="middle">
      <Col>
        <Breadcrumb
          separator=""
          items={[
            {
              title: <FoldersTreeSVG style={{ marginTop: 4 }} />,
            },
            {
              type: "separator",
              separator: "",
            },
            {
              title: "Root",
              className: "clickable",
              onClick: () => handleFetchFolderData(),
            },
            ...itemsList,
          ]}
        />
      </Col>
    </Row>
  );
};
export default FoldersBreadcrumb;
