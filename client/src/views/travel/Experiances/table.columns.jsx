import { Button, Image, Space, Switch, Tooltip, Typography } from "antd";
import { EditSVG, Delete2SVG, RateStarSVG } from "assets/jsx-svg";
import default_image from "assets/images/default_image.png";
import { NavLink } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import Badge from "components/common/Badge";
import SvgImage from "components/common/SvgImage";

const getExperiancesTableColumns = ({ handelDelete, handelStatusChange, flipStateLocal }) => {
  return [
    {
      title: <p className="table_title">Experiance</p>,
      dataIndex: "title",
      key: "title",
      fixed: 'left',
      width: "30%",
      onCell: () => ({ style: { verticalAlign: 'middle' } }),
      render: (name, rowData) => {
        const images = rowData?.productPhotos?.map(el => el?.url) || []
        return <div className="experiances_name_cell">
          <Image.PreviewGroup items={images}>
            <Image src={images?.length > 0 ? images[0] : default_image} className="experiances_image" width={45} height={45} />
          </Image.PreviewGroup>
          <div className="experiances_name_body">
            <Typography.Text ellipsis={{ tooltip: name }} className="fw-500">{name}</Typography.Text>
            {rowData?.themesData && rowData?.themesData?.length > 0 ?
              <p className="experiances_name_themes">
                {rowData?.themesData?.map((el) => el?.image ? <Tooltip title={el?.name} key={el?.id}>
                  <SvgImage svgContent={el?.image} />
                </Tooltip> : "")}
              </p> : ""}
          </div>
        </div>
      }
    },
    {
      width: "30%",
      onCell: () => ({ style: { verticalAlign: 'middle' } }),
      title: <p className="table_title">Location</p>,
      dataIndex: "location",
      key: "location",
      render: (value) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            tooltip: value,
          }}>
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      width: "100px",
      onCell: () => ({ style: { verticalAlign: 'middle' } }),
      title: <p className="table_title">Vbooking ID</p>,
      dataIndex: "code",
      key: "code",
      render: (value) => <p style={{ color: "#000" }}>#{value}</p>,
    },
    {
      width: "110px",
      onCell: () => ({ style: { verticalAlign: 'middle' } }),
      title: <p className="table_title">Status</p>,
      dataIndex: "metaverse",
      key: "metaverse",
      render: (value, rowData) => <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Badge status={rowData?.isActive ? "success" : "error"}>{rowData?.isActive ? "Active" : "Inactive"}</Badge>
        {value && value.length > 0 && <Badge status={"orange"}>Metaverse</Badge>}
      </div>,
    },
    {
      width: "80px",
      onCell: () => ({ style: { verticalAlign: 'middle' } }),
      title: <p className="table_title">Action</p>,
      dataIndex: "id",
      key: "id",
      render: (id, rowData) => {
        return (
          <Space>
            <NavLink to={ROUTER_URLS.TRAVEL.EXPERIANCES.EDIT + id}>
              <Tooltip title="Edit">
                <Button icon={<EditSVG color={"#fff"} />} type="primary" className="table_action_button" />
              </Tooltip>

            </NavLink>
            <Tooltip title="Delete">
              <Button
                icon={<Delete2SVG color={"#fff"} />}
                onClick={() => handelDelete(id)} type="primary"
                danger
                className="table_action_button"
              />
            </Tooltip>
            <Tooltip title={!rowData?.isActive ? "Activate" : "Deactivate"}>
              <Switch checked={rowData?.isActive} onChange={() => {
                flipStateLocal(id)
                handelStatusChange(id)
              }} />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
};

export default getExperiancesTableColumns;
