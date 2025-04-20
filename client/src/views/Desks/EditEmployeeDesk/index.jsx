import { Button, Col, Flex, Form, Input, Radio, Row, Select, Typography } from "antd";
import "./style.css";

import { CheckSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useUpdateDesk from "services/Desk/Mutations/useUpdateDesk";
import { queryClient } from "services/queryClient";
import userContext from "context/userContext";
import { useContext } from "react";
import useGetDeskById from "services/Desk/Querys/useGetDeskById";
import { DURATION_VALUES } from "../options";

const options = [
  {
    label: "Meeting Call",
    value: "STANDARD",
  },
  {
    label: "Metaverse Meeting",
    value: "METAVERSE",
  },
];
const EditEmployeeDesk = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { data, queryKey } = useGetDeskById(user.employeeDeskId, {
    enabled: !user.employeeDeskId,
    select: (res) => {
      return res.data.data;
    },
  });
  const { updateDesk, isPending } = useUpdateDesk({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
      navigate("/employee/desk");
    },
  });
  const [form] = Form.useForm();
  const onSubmit = async (value) => {
    const deskData = new FormData();
    deskData.append("deskId", data?.id);
    deskData.append("callType", value.callType);
    deskData.append("deskType", "EMPLOYEE_DEFAULT_DESK");
    deskData.append("allowCustomerToChangeCallType", value.allowCustomerToChangeCallType);
    deskData.append("description", value.description);
    deskData.append("duration", value.duration ?? value.durationSelection);
    await updateDesk(deskData);
  };

  const durationSelection = Form.useWatch("durationSelection", form);
  const duration = Form.useWatch("duration", form);

  return (
    <section className="employee-desk-form ">
      <Form
        onFinish={onSubmit}
        initialValues={{
          callType: data?.callType,
          allowCustomerToChangeCallType: data?.allowCustomerToChangeCallType ?? false,
          description: data?.description,
          duration: data?.duration,
          durationSelection: DURATION_VALUES.includes(data?.duration) ? data?.duration : "CUSTOM",
        }}
        layout="vertical"
        form={form}>
        <Row gutter={[20, 12]}>
          <Col xs={12}>
            <Form.Item
              name="callType"
              label="Call Type"
              rules={[{ required: true, message: "Please Select Call Type" }]}
              initialValue={"STANDARD"}>
              <Radio.Group options={options}></Radio.Group>
              {/* <Checkbox.Group  /> */}
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              initialValue={true}
              label="Allow Customer To Change Call Type"
              name="allowCustomerToChangeCallType">
              <Radio.Group
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}></Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Row gutter={20}>
              <Col xs={12}>
                <Form.Item
                  initialValue={DURATION_VALUES.includes(duration) ? duration : "CUSTOM"}
                  name="durationSelection"
                  label="Duration">
                  <Select
                    placeholder="Select"
                    options={[
                      ...DURATION_VALUES.map((item) => ({
                        label: `${item} min`,
                        value: item,
                      })),
                      { label: "Custom", value: "CUSTOM" },
                    ]}
                    onSelect={(val) => {
                      if (val !== "CUSTOM") {
                        form.setFieldValue("duration", val);
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              {durationSelection === "CUSTOM" && (
                <Col xs={12}>
                  <Form.Item
                    initialValue={duration ? duration : 30}
                    name="duration"
                    label="Custom Duration">
                    <Input type="number" placeholder="Duration" />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Form>

      <footer className="footer">
        <Flex justify="space-between" align="center">
          <div>
            <Row gutter={[12, 0]}>
              <Col>
                <Row align="middle" gutter={[8, 0]}>
                  <Col>
                    <Row align="middle">
                      <CheckSVG />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text style={{ color: "#AEAEB2" }}>Last Saved</Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Typography.Text className="fw-500">
                  {dayjs(data?.updatedAt).format("MMM D, YYYY HH:mm A")}
                </Typography.Text>
              </Col>
            </Row>
          </div>
          <div>
            <Button
              onClick={() => {
                navigate("/employee/desk");
              }}
              type="primary"
              style={{
                marginRight: "8px",
                background: "#df1b62",
              }}>
              Cancel
            </Button>
            <Button
              loading={isPending}
              onClick={() => {
                form.submit();
              }}
              type="primary"
              htmlType="submit"
              style={{ background: "#272942", display: "inline-flex" }}>
              Save
            </Button>
          </div>
        </Flex>
      </footer>
    </section>
  );
};
export default EditEmployeeDesk;
