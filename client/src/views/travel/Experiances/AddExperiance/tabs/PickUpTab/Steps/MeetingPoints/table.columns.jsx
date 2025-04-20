import { Button, Dropdown, Space } from "antd";
import { DeleteSVG, EditSVG, MenuDotsSVG } from "assets/jsx-svg";
import ExperianceService from "services/travel/experiance";

const getTableCoulmns = ({ startEdit, onDelete }) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id, rowData) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  onClick: () => {
                    startEdit(id);
                  },
                  label: (
                    <Space size={2}>
                      <EditSVG />
                      <p>Edit</p>
                    </Space>
                  ),
                  key: "0",
                },
                {
                  onClick: () => {
                    ExperianceService.PickUpTab.deletePickUpMeetingPoint(id)
                      .then(() => {
                        onDelete();
                      })
                      .catch(() => {});
                  },
                  label: (
                    <div className="actions_menu_label delete_action_btn">
                      <Space size={2}>
                        <DeleteSVG color="#F40055" />
                        <p>Delete</p>
                      </Space>
                    </div>
                  ),
                  key: "1",
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

export default getTableCoulmns;
