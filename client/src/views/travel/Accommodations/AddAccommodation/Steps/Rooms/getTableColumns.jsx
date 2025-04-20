import { Button, Dropdown, Flex } from "antd";
import { DeleteSVG, EditSVG, MenuDotsSVG } from "assets/jsx-svg";
import RoomPNG from "assets/images/RoomPNG.png";

const getTableColumns = ({ onDelete, onEditStart }) => {
  return [
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (_, rowData) => <img src={RoomPNG} alt={rowData.name} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <p className="fz-12 fw-700">{name}</p>,
    },
    {
      title: "Guests",
      dataIndex: "numberOfGuest",
      key: "numberOfGuest",
    },
    {
      title: "Single Beds",
      dataIndex: "singleBed",
      key: "singleBed",
      width: "100px",
    },
    {
      title: "Doubel Beds",
      dataIndex: "doubelBed",
      key: "doubelBed",
      width: "120px",
    },
    {
      title: "Large Beds",
      dataIndex: "largeBed",
      key: "largeBed",
      width: "100px",
    },
    {
      title: "Extra Large Bed",
      dataIndex: "extraLargeBed",
      key: "extraLargeBed",
      width: "180px",
    },
    {
      title: "Room of this type",
      dataIndex: "numberOfRooms",
      key: "numberOfRooms",
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      width: "120px",
      render: (id) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  onClick: () => {
                    onEditStart(id);
                  },
                  label: (
                    <Flex gap={6} align="center">
                      <EditSVG color="#000" /> Edit
                    </Flex>
                  ),
                  key: "1",
                },
                {
                  onClick: () => onDelete(id),
                  label: (
                    <Flex gap={6} align="center">
                      <DeleteSVG color="#F40055" /> Delete
                    </Flex>
                  ),
                  key: "2",
                },
              ],
            }}
            trigger={["click"]}
            placement="bottom">
            <Button type="default" size="small" className="actions_btn center-items">
              <MenuDotsSVG />
            </Button>
          </Dropdown>
        );
      },
    },
  ];
};

export default getTableColumns;
