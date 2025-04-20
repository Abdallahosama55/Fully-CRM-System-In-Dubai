import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Col, Image, Popconfirm, Row, Tooltip, Typography } from "antd";
import videoImg from "assets/images/video.jpg";
import { useState } from "react";

export default function MediaElement({ item, updateMedia }) {
  const [deleteLoading, setIsDeleteLoading] = useState(false);

  const handelOnDelete = () => {
    setIsDeleteLoading(true);
    updateMedia(
      { mediaId: item.id, folderId: null },
      {
        onSuccess: () => {
          setIsDeleteLoading(false);
        },
        onSettled: () => {
          setIsDeleteLoading(false);
        },
      },
    );
  };
  return (
    <Row align="middle">
      <Col flex={1}>
        <Row align="middle" gutter={[12, 12]}>
          <Col>
            <Image
              width={52}
              height={52}
              preview={false}
              src={item.type === "image" ? item.file || videoImg : item.image || videoImg}
            />
          </Col>
          <Col>
            <Row align="middle">
              <Typography.Text ellipsis style={{ maxWidth: "150px" }}>
                {item.name}
              </Typography.Text>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        {deleteLoading ? (
          <LoadingOutlined />
        ) : (
          <Tooltip title={"Delete media from folder"}>
            <Popconfirm
              title={"Delete media from folder"}
              description={`Are you sure to delete this media?`}
              onConfirm={handelOnDelete}
              okText="Yes"
              cancelText="No">
              <DeleteOutlined />
            </Popconfirm>
          </Tooltip>
        )}
      </Col>
    </Row>
  );
}
