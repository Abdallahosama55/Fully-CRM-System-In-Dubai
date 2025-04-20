import { PhoneOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { OneToOneMessageSVG, SaveSVG, TasksSVG, TimeSVG } from "assets/jsx-svg";
import Box from "components/Box";
import allTimezones from "constants/TIME_ZONES";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";
import useAddActivity from "services/CustomerActivity/Mutations/useAddActivity";
import useGetSearchEmployees from "services/Employees/Querys/useGetSearchEmployees";
import CommonService from "services/common.service";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import { axiosCatch } from "utils/axiosUtils";
const CreateActivity = ({ customerId, leads, leadId }) => {
  const [isCrete, setIsCreate] = useState(false);
  const [form] = useForm();
  const [customersList, setCustomersList] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [employeesSearch, setEmployeesSearch] = useState("");
  const queryEmployeesSearch = useDebounce(employeesSearch);
  const type = useWatch("type", form);

  const { data: dataEmployees, isLoading } = useGetSearchEmployees(
    {
      limit: 100,
      searchKey: queryEmployeesSearch,
      offset: 0,
    },
    {
      select: (res) => {
        return res.data.data.data;
      },
    },
  );
  const { addActivity, isPending } = useAddActivity({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CUSTOMER_ACTIVITY] });
    },
  });
  const leadOptions = useMemo(() => {
    return leads.map((item) => ({
      label: item.title,
      value: item.id,
    }));
  }, [leads]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        (async () => {
          try {
            const res = await CommonService.customerSearch({
              limit: 100,
              searchKey: customerSearch,
            });

            setCustomersList(res.data.data);
          } catch (err) {
            axiosCatch(err);
          }
        })();
      },
      customerSearch.length > 0 ? 500 : 0,
    );

    return () => clearTimeout(delayDebounceFn);
  }, [customerSearch]);

  const onFinish = async (data) => {
    const items = {
      title: data.title,
      meetingType: data?.type === "BOOKED" ? data?.meetingType : "VINDO_MEETING_CALL",
      reason: data.description,
      timeZone: data.timeZone,
      dealId: leadId ?? data.leadId,
      priority: data.priority,
      durationInMinutes: data.durationInMinutes,
      activityType: data.type,
      customerId: customerId,
      date:
        data.date &&
        dayjs(data.date)
          .tz(data.timeZone)
          .set("hour", dayjs(data.timeFrom).format("HH"))
          .set("minutes", dayjs(data.timeFrom).format("mm"))

          ?.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),

      participants: [
        ...(data?.participants || []).map((item) => ({
          customerId: item,
        })),
        ...(data?.employees || []).map((item) => ({
          employeeId: item,
        })),
      ],
    };

    await addActivity({ customerId, ...items });
    setIsCreate(false);
    form.resetFields();
  };
  const handleSelectTypeActivity = (value) => {
    form.setFieldValue("type", value);
    setIsCreate(true);
  };

  return (
    <Card
      title={"Activity"}
      className={`view-customer-activity-comp-create-activity ${!isCrete ? "hide-card-body" : ""}`}
      extra={
        <Box>
          {!isCrete ? (
            <Dropdown
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              menu={{
                items: [
                  {
                    id: 1,
                    label: "Task",
                    onClick: () => {
                      handleSelectTypeActivity("TASK");
                    },
                    icon: <TasksSVG fill="#030713"></TasksSVG>,
                  },
                  {
                    id: 2,
                    label: "Call",
                    onClick: () => {
                      handleSelectTypeActivity("CALL");
                    },
                    icon: <PhoneOutlined style={{ fontSize: "16px" }}></PhoneOutlined>,
                  },
                  {
                    id: 3,
                    label: "Meetings",
                    onClick: () => {
                      handleSelectTypeActivity("BOOKED");
                    },
                    icon: <OneToOneMessageSVG />,
                  },
                ],
              }}>
              <Button
                // onClick={() => setIsCreate(true)}
                icon={<PlusCircleOutlined color="white"></PlusCircleOutlined>}
                size="small"
                type="primary"
                color="primary">
                Add
              </Button>
            </Dropdown>
          ) : (
            <Flex gap={8}>
              <Button
                onClick={() => {
                  form.resetFields();
                  form.resetFields();
                  setIsCreate(false);
                }}
                size="small"
                type="default">
                Cancel
              </Button>
              <Button
                onClick={() => form.submit()}
                style={{
                  background: "#007d3d !important",
                  color: "white !important",
                  borderColor: "#007d3d !important",
                }}
                loading={isPending}
                icon={<SaveSVG color="white"></SaveSVG>}
                size="small"
                type="default">
                Save
              </Button>
            </Flex>
          )}
        </Box>
      }>
      <Form
        initialValues={{
          durationInMinutes: 30,
          timeFrom: dayjs(new Date()),
          date: dayjs(new Date()),
          meetingType: "VINDO_MEETING_CALL",
          timeZone:
            localStorage.getItem("time-zone") ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
          priority: "medium",
          title: "New Meet",

          type: "CALL",
        }}
        layout="vertical"
        onFinish={onFinish}
        form={form}>
        <Row gutter={12}>
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please Enter Title" }]}
              initialValue={"New Meet"}>
              <Input placeholder="Write Here" />
            </Form.Item>
          </Col>
          <Col xs={type === "BOOKED" ? 14 : 24}>
            <Form.Item
              required
              name="type"
              rules={[{ required: true, message: "Please Select Meeting Type" }]}
              label="Meeting type">
              <Select options={meetingTypes}></Select>
            </Form.Item>
          </Col>

          {type === "BOOKED" && (
            <Col xs={10}>
              <Form.Item
                required
                name="meetingType"
                rules={[{ required: true, message: "Please Select Meeting Type" }]}
                label="Location">
                <Radio.Group>
                  <Radio value="VINDO_MEETING_CALL">Online Meeting</Radio>
                  <Radio value="ONSITE">on Site</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={[8, 8]} style={{ marginBottom: "12px" }}>
          <Col xs={24} lg={24}>
            <Form.Item
              required
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please Enter Date" }]}>
              <DatePicker className="w-100" placeholder="Select" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24}>
            <Row gutter={[12, 12, 12]}>
              <Col xs={24} lg={10}>
                <Form.Item
                  label="Time"
                  required
                  name="timeFrom"
                  rules={[{ required: true, message: "Please Enter Time From" }]}>
                  <DatePicker.TimePicker
                    className="w-100"
                    placeholder="Select"
                    format={"HH:mm"}
                    suffixIcon={
                      <Row gutter={[5, 0]} align="middle">
                        <Col>
                          <Row align="middle">
                            <TimeSVG style={{ width: "14px", height: "14px" }} color="#AEAEB2" />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text className="fz-12" style={{ color: "#AEAEB2" }}>
                            From
                          </Typography.Text>
                        </Col>
                      </Row>
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={7}>
                <Form.Item
                  name="durationInMinutes"
                  label="Duration"
                  rules={[{ required: true, message: "Please Enter Duration" }]}>
                  <Input type="number" suffix="min" placeholder="Duration"></Input>
                </Form.Item>
              </Col>
              <Col xs={24} lg={7}>
                <Form.Item name="timeZone" label="Time zone">
                  <Select
                    showSearch
                    options={allTimezones.map((item) => ({ label: item, value: item }))}></Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item
          name="priority"
          rules={[{ required: true, message: "Please Select Meeting Type" }]}
          label="Priority">
          <Select
            optionRender={(option) => (
              <div style={{ color: priority.find((item) => item.value === option.value)?.color }}>
                {option.label}
              </div>
            )}
            options={priority}></Select>
        </Form.Item>
        <Form.Item label="Note" name="description">
          <Input.TextArea rows={2} placeholder="Write Note here" />
        </Form.Item>
        {!leadId && (
          <Form.Item
            name="leadId"
            rules={[{ required: false, message: "Please Select Meeting Type" }]}
            label="Select lead">
            <Select placeholder="Select lead" options={leadOptions}></Select>
          </Form.Item>
        )}
        <Form.Item name="employees" label="Employees">
          <Select
            placeholder="Select employees"
            mode="multiple"
            loading={isLoading}
            onSearch={(text) => setEmployeesSearch(text)}
            options={(dataEmployees || []).map((item) => ({
              value: item.id,
              label: item.email,
            }))}></Select>
        </Form.Item>
        <Form.Item name="participants" label="Participants">
          <Select
            mode="tags"
            onSearch={(text) => setCustomerSearch(text)}
            options={(customersList || [])
              .filter((item) => item.id !== customerId)
              .map((customer) => ({
                label: customer.email,
                value: customer.id,
              }))}
            placeholder="Select or Add"
          />
        </Form.Item>
      </Form>
    </Card>
  );
};
const priority = [
  {
    label: "High",
    value: "high",
    color: "#E41E2D",
  },
  {
    label: "Medium",
    value: "medium",
    color: "#981DA9",
  },
  {
    label: "Low",
    value: "low",
    color: "#2D5FEB",
  },
];
const meetingTypes = [
  {
    label: "Task",
    value: "TASK",
  },
  {
    label: "Call",
    value: "CALL",
  },
  {
    label: "Meeting",
    value: "BOOKED",
  },
];
export default CreateActivity;
