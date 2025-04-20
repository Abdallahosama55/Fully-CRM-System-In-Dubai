import { useState } from "react";
import Editor from "components/crm-board/Content/Editor";
import { DatePicker, Select, Steps, Form } from "antd";
import Task from "./Task";
import useAddTask from "services/CustomerLeadBoard/Mutations/useAddTask";
import useNotification from "antd/es/notification/useNotification";
// icons
import { ArrowDownSVG, FilterSVG, UsersThreeRegularSVG } from "assets/jsx-svg";

// style
import "./styles.css";
import useGetTasks from "services/CustomerLeadBoard/Querys/useGetTasks";
const Tasks = () => {
  const [dateFilter, setDateFilter] = useState(new Date().toDateString());
  const [assignToId, setAssignToIdFilter] = useState();

  const { openNotificationWithIcon } = useNotification();
  const { data: tasks, refetch: refetchTasks } = useGetTasks(
    { date: dateFilter, assignToId: assignToId },
    {},
  );
  const [mocktasks, setTasks] = useState([
    {
      id: "1",
      by: "John Doe",
      Due: "12/12/2021",
      title: "This is task title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, doloribus et consequuntur hic vel dicta?",
      isDone: false,
      priorityId: 1,
      assignedToId: 1,
    },
    {
      id: "2",
      by: "John Doe",
      Due: "12/12/2021",
      title: "This is task title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, doloribus et consequuntur hic vel dicta?",
      isDone: true,
    },
    {
      id: "3",
      by: "John Doe",
      Due: "12/12/2021",
      title: "This is task title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, doloribus et consequuntur hic vel dicta?",
      isDone: false,
    },
  ]);
  const [form] = Form.useForm();

  const { addTask, isPending } = useAddTask({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      refetchTasks();
      form.resetFields();
      openNotificationWithIcon("success", "Added successfully");
    },
  });

  const handelAddTask = (data) => {
    const dataToAdd = { ...data };
    addTask(dataToAdd);
  };
  const handleChangeDateFilter = (e) => {
    setDateFilter(new Date(e).toDateString());
    console.log("handleChangeDateFilter-->", new Date(e).toDateString());
  };
  const handleChangeAssignToFilter = (e) => {
    setAssignToIdFilter(e);
  };
  return (
    <div>
      <Editor
        showTitle={true}
        form={form}
        isLoading={isPending}
        isTask={true}
        onSubmit={handelAddTask}
        btn_label={"Create task"}
        titlePlaceholder="Task Title"
        placeholder="Start typing to assign a task…"
      />
      <div className="filter_label fz-14">
        <FilterSVG />
        Filter Tasks
      </div>
      <div className="filters">
        <DatePicker
          onChange={handleChangeDateFilter}
          style={{ width: "200px", border: "unset" }}
          size="small"
          placeholder={new Date().toDateString()}
          suffixIcon={<ArrowDownSVG />}
        />
        <Select
          onChange={handleChangeAssignToFilter}
          className="general-table-select"
          style={{ width: "150px" }}
          defaultValue="all"
          suffixIcon={<ArrowDownSVG />}
          options={[
            {
              value: "all",
              label: (
                <div className="fz-12">
                  <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                  <span>All employees</span>
                </div>
              ),
            },
            {
              value: "all3",
              label: (
                <div className="fz-12">
                  <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                  <span>All3 employees</span>
                </div>
              ),
            },
            {
              value: "all4",
              label: (
                <div className="fz-12">
                  <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                  <span>All4 employees</span>
                </div>
              ),
            },
          ]}
        />
      </div>

      <div className="tasks">
        {mocktasks.map((task) => (
          <Task key={task.id} {...task} priority={task.priorityId} assignedTo={task.assignedToId} />
        ))}
      </div>

      <div className="tasks_history">
        <div className="tasks_history_head">
          <p className="fz-16">Activities history</p>
          <p className="fz-14 gc">Tue, June 1, 2023</p>
        </div>
        <Steps
          direction="vertical"
          size="small"
          progressDot
          current={-1}
          items={[
            {
              title: (
                <Task
                  className="history-task"
                  {...mocktasks[0]}
                  priority={mocktasks[0].priorityId}
                  assignedTo={mocktasks[0].assignedToId}
                />
              ),
            },
            {
              title: (
                <Task
                  className="history-task"
                  {...mocktasks[1]}
                  priority={mocktasks[1].priorityId}
                  assignedTo={mocktasks[1].assignedToId}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Tasks;
