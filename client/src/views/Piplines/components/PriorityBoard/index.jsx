import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CustomButton from "components/common/Button";
import { useState, useEffect, useRef } from "react";
// icons
import { PlusSVG, MenuDotsSVG, EditSVG, DeleteSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import useDragAndDrop from "hooks/useDragAndDrop";
// mock data
import { useDrawer } from "context/drawerContext";
import CreateitemForm from "./CreateEditItemForm";
import { Form, Typography } from "antd";
import WarningModal from "components/common/WarningModal";
import useDeletePriorityItem from "services/Pipelines/Mutations/useDeletePriorityItem";
import { useNotification } from "context/notificationContext";
import useUpdatePriorityItemOrder from "services/Pipelines/Mutations/useUpdatePriorityItemOrder";
import useGetPriorityItems from "services/Pipelines/Querys/useGetPriorityItems";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
const mockData = [
  {
    id: "1",
    color: "#F82E8E",
    title: "High",
    description: "That items have high priority",
    order: 1,
  },
  {
    id: "2",
    color: "#3A5EE3",
    title: "low",
    description: "That items have low priority",
    order: 2,
  },
  {
    id: "3",
    color: "#9741A5",
    title: "Medium",
    description: "That items have medium priority",
    order: 3,
  },
  {
    id: "4",
    color: "#3FB9ED",
    title: "None",
    description: "Items that aren't prioritized",
    order: 4,
  },
];
const PriorityBoard = () => {
  const query = useQueryClient();

  const [CreateEditform] = Form.useForm();
  const { openNotificationWithIcon } = useNotification();

  const { deletePriorityItem, isDeletePriorityPending } = useDeletePriorityItem({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      query.invalidateQueries({ queryKey: [QUERY_KEY.PIPELINES_PRIORITY_ITEMS] });

      openNotificationWithIcon("success", "Deleted successfully");
    },
  });
  const { updatePriorityItemOrder } = useUpdatePriorityItemOrder({
    onError: (error) => {
      var { errors } = error?.response.data;

      // openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // refetchEmailConfig();
      // openNotificationWithIcon("success", "Deleted successfully");
    },
  });
  const reorder = (list, source, destination) => {
    const result = Array.from(list);
    const [removed] = result.splice(source.index, 1);

    //get the order of this item destItemToAddAfter and +1 to submit to BE
    updatePriorityItemOrder({ leadPriorityId: removed.id, newOrder: destination.index + 1 });

    result.splice(destination.index, 0, removed);

    return result;
  };
  const { data: priorityItems, isPending } = useGetPriorityItems({
    select: (data) => data.data.data.rows,
  });

  const {
    data,
    activeDragIndex,
    setData,
    placeholder,
    handelDragEnd,
    handelDragStart,
    handleDragUpdate,
  } = useDragAndDrop(
    priorityItems?.sort((a, b) => a.order - b.order),
    reorder,
    "priority_table_body",
  );
  const mountRef = useRef(false);

  useEffect(() => {
    if (mountRef.current) {
      setData(priorityItems?.sort((a, b) => a.order - b.order));
      console.log("sss");
    } else {
      mountRef.current = true;
    }
  }, [priorityItems]);
  const DrawerAPI = useDrawer();
  const onClose = () => {
    DrawerAPI.close();
  };
  const handelEditPriorty = (id, label, color, description) => {
    CreateEditform.setFieldsValue({ description: description, label: label, color: color });
    DrawerAPI.open("37%");
    DrawerAPI.setDrawerContent(<CreateitemForm onClose={onClose} form={CreateEditform} id={id} />);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [priortyToDelete, setPriortyToDelete] = useState({});

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setPriortyToDelete(null);
  };
  const handleDeleteModalOk = () => {
    deletePriorityItem(priortyToDelete.id);
    setIsDeleteModalOpen(false);
  };
  const handelDeletePriorty = (id, title) => {
    setPriortyToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };
  return (
    <div className="priority-board">
      <WarningModal
        isloading={isDeletePriorityPending}
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${priortyToDelete?.title}" priority?`}
      />
      <div className="priority-board_head space-between">
        {/* <Typography.Text className="fz-16 fw-500">Item Priority</Typography.Text> */}
        {/* <CustomButton
          onClick={() => {
            CreateEditform.resetFields();
            DrawerAPI.open("37%");
            DrawerAPI.setDrawerContent(<CreateitemForm onClose={onClose} form={CreateEditform} />);
          }}
          color="dark"
          padding="12px 40px"
          icon={<PlusSVG color="#FFF" />}>
          Add Priority
        </CustomButton> */}
      </div>
      <div className="priority-board_body">
        <table>
          <thead>
            <tr>
              <td className="menu_column"></td>
              <td>
                <Typography.Text className="fz-14 fw-500 gc">S.NO</Typography.Text>
              </td>
              <td>
                <Typography.Text className="fz-14 fw-500 gc">Name</Typography.Text>
              </td>
            </tr>
          </thead>
          <DragDropContext
            onDragEnd={handelDragEnd}
            onDragStart={handelDragStart}
            onDragUpdate={handleDragUpdate}>
            <Droppable droppableId="priority">
              {(provided) => (
                <tbody
                  className="priority_table_body"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {console.log("data-->", data)}
                  {data?.map(({ color, label, description, id }, index) => {
                    return (
                      <Draggable key={id} draggableId={id + ""} index={index}>
                        {(provided) => (
                          <tr
                            className={`priority_row ${
                              activeDragIndex === index ? "active_drag" : ""
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <td className="menu_column_cell">
                              <MenuDotsSVG />
                            </td>
                            <td className="priority_number">{index + 1}</td>
                            <td>
                              <div className="priority_cell">
                                <div
                                  className="priority_circle"
                                  style={{ background: color }}></div>
                                <div className="priority_cell_content">
                                  <p className="fz-14 fw-600">{label}</p>
                                  <p className="fz-12">{description}</p>
                                </div>
                              </div>
                            </td>
                            <td
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                columnGap: 10,
                                justifyContent: "right",
                              }}
                              className="priority_number">
                              <span
                                title="Edit"
                                onClick={() => handelEditPriorty(id, label, color, description)}>
                                <EditSVG />
                              </span>
                              <span title="Delete" onClick={() => handelDeletePriorty(id, label)}>
                                <DeleteSVG />
                              </span>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
};

export default PriorityBoard;
