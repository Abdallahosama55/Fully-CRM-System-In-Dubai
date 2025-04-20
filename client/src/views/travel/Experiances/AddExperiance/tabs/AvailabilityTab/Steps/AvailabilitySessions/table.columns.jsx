import { Button, Dropdown } from "antd";
import { BoldCalendarSVG, DeleteSVG, MenuDotsSVG } from "assets/jsx-svg";
import { REPEAT_TYPES } from "constants/EXPERIENCE";
import dayjs from "dayjs";
import ExperianceService from "services/travel/experiance";

const getTableColumns = ({ onDelete, viewSession }) => {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Start Date",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "toDate",
      key: "toDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Repeat Type",
      dataIndex: "repeatType",
      key: "repeatType",
      render: (value) => (value === REPEAT_TYPES.NO_REPEAT ? "No repeat" : value),
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
                    viewSession(id);
                  },
                  label: (
                    <div className="actions_menu_label">
                      <BoldCalendarSVG color="#000" /> View
                    </div>
                  ),
                  key: "1",
                },
                {
                  onClick: () => {
                    ExperianceService.AvailabilityTab.deleteSession(id, true)
                      .then(() => {
                        onDelete();
                      })
                      .catch(() => {});
                  },
                  label: (
                    <div className="actions_menu_label delete_action_btn">
                      <DeleteSVG color="#F40055" />
                      Delete
                    </div>
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
