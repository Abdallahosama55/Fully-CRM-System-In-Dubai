import {
  CodeOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Avatar, Col, Row, Tooltip } from "antd";
import { Link } from "react-router-dom";

export const columns = (editSlider, deleteSlide, copyIfram, handleEditSlider) => {
  return [
    {
      title: "Image",
      key: "avatar",
      align: "center",
      width: 150,
      render: ({ media, mediaType }) => {
        if (mediaType === "VIDEO") {
          return <Avatar size={38} icon={<PlayCircleOutlined />} />;
        }
        return (
          <Avatar
            size={38}
            style={{ backgroundColor: "#0318D626", color: "#0318D699" }}
            src={media}></Avatar>
        );
      },
    },
    {
      render: (data) => <Link to={"" + data?.id + window?.location?.search}>{data?.name}</Link>,
      title: "Name",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 140,
      render: (_) => (
        <Row justify="center" align="middle" gutter={[10, 0]}>
          <Col>
            <Tooltip title="Edit Virtual Portal">
              <EditOutlined onClick={() => handleEditSlider(_)} style={{ color: "#3A5EE3" }} />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Edit Virtual Portal items">
              <SettingOutlined onClick={() => editSlider(_)} style={{ color: "#3A5EE3" }} />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Copy Embedded Code">
              <CodeOutlined onClick={() => copyIfram(_.id)} style={{ color: "#3A5EE3" }} />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="Preview Virtual Portal">
              <Link to={"" + _.id + window?.location?.search}>
                <EyeOutlined />{" "}
              </Link>
            </Tooltip>
          </Col>
          <Col>
            <Row align="middle">
              <Tooltip title="Delete Virtual Portal">
                <DeleteOutlined
                  onClick={() => deleteSlide(_)}
                  style={{ width: "12px", height: "12px", color: "red" }}
                  className="clickable"
                  color="#3A5EE3"
                />
              </Tooltip>
            </Row>
          </Col>
        </Row>
      ),
    },
  ];
};
