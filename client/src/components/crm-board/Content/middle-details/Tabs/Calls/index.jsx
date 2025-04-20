import CallCard from "./CallCard";
import { Col, Row, Select, Typography } from "antd";
// icons
import { UsersThreeRegularSVG } from "assets/jsx-svg";
import useNotification from "antd/es/notification/useNotification";

// style
import "./styles.css";
import Editor from "components/crm-board/Content/Editor";
import { Form } from "antd";
import useAddCall from "services/CustomerLeadBoard/Mutations/useAddCall";
import useGetCalls from "services/CustomerLeadBoard/Querys/useGetCalls";
function Calls() {
  const { openNotificationWithIcon } = useNotification();
  const [form] = Form.useForm();
  const { data: calls, refetch: refetchCalls } = useGetCalls({});

  const { addCall, isPending } = useAddCall({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      refetchCalls();
      form.resetFields();
      // query.invalidateQueries({ queryKey: [QUERY_KEY.NOTES] })
      openNotificationWithIcon("success", "Added successfully");
    },
  });
  const mockCalls = [
    {
      title: "Call with John",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      due: "Today, 12:00 PM",
      by: "Esther Howsrd",
    },
  ];

  const handelCreateCall = (data) => {
    const dataToAdd = { ...data };
    console.log("call to add", dataToAdd);
    // addCall(dataToAdd);
  };

  return (
    <div className="calls">
      <Editor
        titlePlaceholder={"Call title"}
        showTitle={true}
        isLoading={isPending}
        form={form}
        onSubmit={handelCreateCall}
        btn_label={"Create call"}
        placeholder="Please add a description..."
      />
      <Row align="middle" justify="start" gutter={[12, 12]} style={{ marginTop: 10 }}>
        <Col span={8}>
          <Select
            className="general-table-select"
            style={{ width: "100%" }}
            defaultValue="newest"
            options={[
              {
                value: "newest",
                label: (
                  <Typography.Text className="fz-12">
                    <UsersThreeRegularSVG fill="#AEAEB2" style={{ marginRight: "8px" }} />
                    <span className="gc">All employees</span>
                  </Typography.Text>
                ),
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <Select
            className="general-table-select"
            style={{ width: "100%" }}
            defaultValue="newest"
            options={[
              {
                value: "newest",
                label: (
                  <Typography.Text className="fz-12">
                    Sort by: <span className="fw-600">Newest</span>
                  </Typography.Text>
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <div>
        <div style={{ paddingTop: "24px", paddingBottom: "16px" }}>
          Call Schedule
          {mockCalls.map((item) => (
            <CallCard
              Due={item.due}
              by={item.by}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <div>
          <div className="call_history_head">
            <div>Call history</div>
            <div className="fz-12 gc">June 24, 2023</div>
          </div>
          <CallCard
            Due={"Today, 12:00 PM"}
            type={"history"}
            by={"Esther Howsrd"}
            title={"Call with John"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Calls;
