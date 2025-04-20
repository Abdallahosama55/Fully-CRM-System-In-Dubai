import CustomCollapse from "../../components/CustomCollapse";
import { Select, Avatar } from "antd";
// icons
import { CheckSVG, MessageSVG, TicketSVG } from "assets/jsx-svg";
// style
import "./styles.css";
import useDeleteTask from "services/CustomerLeadBoard/Mutations/useDeleteTask";
import useNotification from "antd/es/notification/useNotification";
import useGetAssignToEmployees from "services/Leads/Querys/useGetAssignToEmployees";
import useGetPriorityItems from "services/Pipelines/Querys/useGetPriorityItems";
import { AntDesignOutlined } from "@ant-design/icons";
import useUpdateTaskAssignTo from "services/CustomerLeadBoard/Mutations/useUpdateTaskAssignTo";
import useUpdateTaskPriority from "services/CustomerLeadBoard/Mutations/useUpdateTaskPriority";
const Task = ({ id, by, Due, isDone, title, description, priority, assignedTo, className }) => {
  const { openNotificationWithIcon } = useNotification();

  const { deleteTask, isPending } = useDeleteTask({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      openNotificationWithIcon("success", "Deleted successfully");
    },
  });
  const { updateTaskAssignTo } = useUpdateTaskAssignTo({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      openNotificationWithIcon("success", "updated successfully");
    },
  });
  const { updateTaskPriority } = useUpdateTaskPriority({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      openNotificationWithIcon("success", "updated successfully");
    },
  });
  const handelRemoveTask = () => {
    console.log("id==>", id);
    // deleteTask(id);
  };
  const { data: priorityItems } = useGetPriorityItems({
    select: (data) => data.data.data.rows,
  });
  const { data: assignToList } = useGetAssignToEmployees({
    select: (data) => {
      return data?.data?.data;
    },
  });
  const handleChangeTaskPriority = (priorityId) => {
    const obj = { taskId: id, priorityId: priorityId };
    updateTaskPriority(obj);
  };
  const handleChangeTaskAssignTo = (assignToId) => {
    const obj = { taskId: id, assignToId: assignToId };
    updateTaskAssignTo(obj);
  };
  return (
    <CustomCollapse
      onRemove={handelRemoveTask}
      className={className}
      by={by}
      by_label="Task created"
      by_icon={<MessageSVG />}
      Due={Due}>
      <div className="task_body">
        <div>
          <div className={`isDone ${isDone ? "active center-items" : ""}`}>
            {isDone && <CheckSVG color="#fff" />}
          </div>
        </div>
        <div>
          <div className={`task_content ${priority || assignedTo ? "border-bottom" : ""}`}>
            <p className="fz-14 bc">{title}</p>
            <p className="fz-12 gc">{description}</p>
          </div>

          <div className="task_footer">
            <Select
              style={{ width: "120px" }}
              size="small"
              variant="borderless"
              defaultValue={"high"}
              onChange={handleChangeTaskPriority}>
              {priorityItems?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <TicketSVG color={item.color} />
                    <div> {item.label}</div>
                  </div>
                </Select.Option>
              ))}
            </Select>

            <Select
              onChange={handleChangeTaskAssignTo}
              showSearch
              style={{ width: "150px" }}
              size="small"
              filterOption={(input, option) =>
                (option?.children.props.children[1].props.children[1] ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              variant="borderless"

              // defaultValue={assignedTo.username}
              // options={[getAssignOption(assignedTo)]}
            >
              {(assignToList?.rows || assignToList)?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {/* {item.fullName} */}
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    {!item?.profileImage ? (
                      <Avatar size={32} icon={<AntDesignOutlined />} />
                    ) : (
                      <Avatar size={32} src={item?.profileImage} />
                    )}
                    <div> {item.fullName}</div>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </CustomCollapse>
  );
};

const getPriorityOption = (priority) => {
  return {
    value: priority,
    label: (
      <div className="fz-12 priority_option">
        <div className="center-items">
          <span className={`priority_dote ${priority}`}></span>
        </div>
        <span>{priority}</span>
      </div>
    ),
  };
};

const getAssignOption = (assignedTo) => {
  return {
    value: assignedTo.username,
    label: (
      <div className="fz-12 assignedTo_option">
        <div className="center-items">
          <img src={assignedTo.avatar} alt={assignedTo.username} />
        </div>
        <span>{assignedTo.username}</span>
      </div>
    ),
  };
};

export default Task;
