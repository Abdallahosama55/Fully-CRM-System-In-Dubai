import { Dropdown, Flex, List, message } from "antd";
import { DeleteSVG, EditSVG, MenuDotsSVG } from "assets/jsx-svg";
import useDeleteAgendaItem from "services/travel/experiance/ExperianceAgenda/Mutations/useDeleteAgendaItem";

const AgendaCard = ({ agenda, startEdit, endEdit, handelDelete }) => {
  const { deleteAgendaItem, isPending } = useDeleteAgendaItem({
    onSuccess: () => {
      message.success("agenda deleted successfully");
      handelDelete(agenda.id);
      endEdit();
    },
    onError: (error) => message.error(error.message),
  });

  return (
    <List.Item className="space-between" style={{ paddingInline: "24px" }}>
      <div>
        <p className="fz-14 fw-500">{agenda.title}</p>
        <p className="gc fz-12" dangerouslySetInnerHTML={{ __html: agenda.description }} />
      </div>
      <Dropdown
        disabled={isPending}
        menu={{
          items: [
            {
              onClick: () => {
                startEdit(agenda?.id);
              },
              label: (
                <Flex align="center" gap={4}>
                  <EditSVG />
                  <p>Edit</p>
                </Flex>
              ),
              key: "0",
            },
            {
              onClick: () => deleteAgendaItem(agenda.id),
              label: (
                <Flex align="center" gap={4}>
                  <DeleteSVG color="#F40055" />
                  <p>Delete</p>
                </Flex>
              ),
              key: "1",
            },
          ],
        }}
        trigger={["click"]}
        placement="bottom">
        <MenuDotsSVG />
      </Dropdown>
    </List.Item>
  );
};

export default AgendaCard;
