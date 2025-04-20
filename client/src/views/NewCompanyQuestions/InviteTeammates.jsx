import { Button, Col, Form, Row, Select, notification } from "antd";
import Input from "antd/es/input/Input";
import { ArrowDownSVG, Delete2SVG, PlusSVG } from "assets/jsx-svg";
import { useNavigate } from "react-router-dom";
import EmployeeService from "services/Employee/employee.service";
import { axiosCatch } from "utils/axiosUtils";

export default function InviteTeammates({ form, setLoading }) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await EmployeeService.inviteEmployee({
        data: values.users?.map((user) => ({
          jobTitle: user.type,
          email: user.email,
          fullName: user.email.split("@")[0],
        })),
      });
      if (values.users.length) {
        notification.success({ message: "Invites Send Sucessfully" });
      }
      navigate("/");
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginTop: "40px" }}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[12, 0]} align="middle" style={{ marginBottom: "12px" }}>
                <Col xs={16}>
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    rules={[{ required: true, message: "Missing Email" }]}>
                    <Input placeholder="Email Here" />
                  </Form.Item>
                </Col>
                <Col xs={8}>
                  <Row align="middle" gutter={[12, 0]}>
                    <Col flex={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        rules={[{ required: true, message: "Select Teammate Job" }]}
                        initialValue={"Sales"}>
                        <Select
                          options={[
                            { label: "Founder", value: "Founder" },
                            { label: "Manager", value: "Manager" },
                            { label: "Marketing", value: "Marketing" },
                            { label: "Sales", value: "Sales" },
                            { label: "HR", value: "HR" },
                            { label: "Finance", value: "Finance" },
                            { label: "Designer", value: "Designer" },
                            { label: "Developer", value: "Developer" },
                            { label: "Operations", value: "Operations" },
                            { label: "Other", value: "Other" },
                          ]}
                          placeholder="Last Name"
                          suffixIcon={<ArrowDownSVG />}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <div
                        className="delete-field clickable center-items"
                        onClick={() => remove(name)}>
                        <Delete2SVG color="#454545" />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button onClick={() => add()} className="add-btn">
                <Row align="middle" gutter={[4, 0]}>
                  <Col>
                    <Row align="middle">
                      <PlusSVG fill="#3A5EE3" style={{ height: "13px" }} />
                    </Row>
                  </Col>
                  <Col>Add</Col>
                </Row>
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
