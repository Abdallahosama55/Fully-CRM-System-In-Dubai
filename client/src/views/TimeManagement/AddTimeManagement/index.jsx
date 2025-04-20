import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import "./styles.css";
import { TimeSVG } from "assets/jsx-svg";

export default function TimeOffManagement() {
  const [form] = Form.useForm();
  const employeesType = Form.useWatch("employees", form);

  return (
    <section className="body-content">
      <div className="form-layout">
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Title level={4}>Time-Off Management</Typography.Title>
          </Col>
          <Col>
            <Typography.Text
              style={{ color: "#0318D6" }}
              className="clickable"
              onClick={() => form.resetFields()}
            >
              CLEAR DATA
            </Typography.Text>
          </Col>
        </Row>

        <Form
          req
          form={form}
          layout="vertical"
          style={{ marginTop: "24px" }}
          onFinish={(e) => console.log(e)}
        >
          <Form.Item
            name="name"
            label="Name (Description)"
            rules={[
              { required: true, message: "Please Enter Name (Description)" },
            ]}
          >
            <Input placeholder="Describe Here" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date & Time From/To"
            rules={[{ required: true, message: "Please Enter Date" }]}
            className="w-100 custome-date-picker-icon"
          >
            <DatePicker.RangePicker
              showTime
              className="w-100"
              suffixIcon={<TimeSVG />}
              format="HH:MM A"
              placeholder={["Start From", "End"]}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please Select Type" }]}
          >
            <Radio.Group>
              <Radio value={1}>Leave</Radio>
              <Radio value={2}>Vacation</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="employees"
            label="Employees"
            rules={[{ required: true, message: "Please Select Type" }]}
          >
            <Radio.Group>
              <Radio value={1}>All</Radio>
              <Radio value={2}>Spacific</Radio>
            </Radio.Group>
          </Form.Item>

          {employeesType === 2 && (
            <Form.Item
              name="selectedEmployees"
              label="Select EMPLOYEES"
              rules={[{ required: true, message: "Please Select EMPLOYEES" }]}
            >
              <Select
                options={options}
                maxTagCount="responsive"
                mode="multiple"
                placeholder="Search Employee Here"
              />
            </Form.Item>
          )}

          <Row justify="end" className="mt-1" gutter={[16, 16]}>
            <Col>
              <Button type="ghost">Cancel</Button>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}

const options = [];

for (let i = 0; i < 10; i++) {
  const value = i;
  options.push({
    label: `Employee ${value}`,
    value: value.toString(),
  });
}
