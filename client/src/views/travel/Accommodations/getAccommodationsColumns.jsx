import { Button, Flex, Image, Space, Tooltip, Typography } from "antd";
import {
  BuildingSVG,
  CitySVG,
  Delete2SVG,
  EditSVG,
  RateStarSVG,
  TypeOfAccommodationSVG,
  WorldMapSVG,
} from "assets/jsx-svg";
import Badge from "components/common/Badge";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { Link } from "react-router-dom";
import isValidJson from "utils/isValidJson";
import default_image from "assets/images/default_image.png";

const getAccommodationsColumns = ({ handelDelete }) => {
  return [
    {
      title: (
        <p className="table_title">
          <BuildingSVG /> Hotel
        </p>
      ),
      dataIndex: "name",
      key: "name",
      fixed: "left",
      onCell: (record, index) => ({
        style: {
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Alternate row colors
        },
      }),
      render: (name, rowData) => {
        const images = isValidJson(rowData?.images)
          ? JSON.parse(rowData?.images)?.map((el) => el?.link)
          : [];
        return (
          <div className="accomdation_name_cell">
            <Image.PreviewGroup items={images}>
              <Image
                src={images?.length > 0 ? images[0] : default_image}
                className="accomdation_image"
                width={45}
                height={45}
              />
            </Image.PreviewGroup>
            <div className="accomdation_name_body">
              <Typography.Text ellipsis={{ tooltip: name }} className="fw-500">
                {name}
              </Typography.Text>
              {rowData?.rate ? (
                <Flex gap={4}>
                  {[...new Array(rowData?.rate)].map((el, index) => (
                    <RateStarSVG key={index} />
                  ))}
                </Flex>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <p className="table_title">
          <TypeOfAccommodationSVG width={16} height={16} /> Type
        </p>
      ),
      dataIndex: ["accommodationType", "name"],
      key: "type",
      render: (type) => (
        <Badge status="orange" fullWidth>
          <Typography.Text ellipsis={{ tooltip: type }} className="fz-12">
            {type}
          </Typography.Text>
        </Badge>
      ),
    },
    {
      title: (
        <p className="table_title">
          <CitySVG /> City
        </p>
      ),
      dataIndex: "city",
      key: "city",
      render: (city) => (
        <div>
          <p style={{ color: "#000" }}>{isValidJson(city) ? JSON.parse(city)?.city : city}</p>
          <Typography.Text
            style={{ color: "#aaa", marginTop: "0px" }}
            className="fz-10 fw-400"
            ellipsis={{ rows: 2 }}>
            {isValidJson(city) ? JSON.parse(city)?.country : ""}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: (
        <p className="table_title">
          <WorldMapSVG width={14} height={14} color={"#000"} /> Location
        </p>
      ),
      dataIndex: "location",
      key: "location",
      render: (value) => (
        <Typography.Paragraph style={{}} ellipsis={{ tooltip: value, rows: 2 }}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: <p className="table_title">Actions</p>,
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => {
        return (
          <Space>
            <Tooltip title={"Edit"}>
              <Link to={ROUTER_URLS.TRAVEL.ACCOMMODATION.EDIT + id}>
                <Button
                  icon={<EditSVG color={"#fff"} />}
                  type={"primary"}
                  className="table_action_button"
                />
              </Link>
            </Tooltip>
            <Tooltip title={"Delete"}>
              <Button
                onClick={() => handelDelete(id)}
                icon={<Delete2SVG color={"#fff"} />}
                type={"primary"}
                danger
                className="table_action_button"
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
};

export default getAccommodationsColumns;
