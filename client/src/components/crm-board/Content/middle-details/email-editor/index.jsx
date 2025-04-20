import { useState, useContext } from "react";
import "./styles.css";
import { Avatar, Col, Input, Row, Select } from "antd";
import { AntDesignOutlined, CloseOutlined, PlusSquareOutlined } from "@ant-design/icons";
import Editor from "../../Editor";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import userContext from "context/userContext";
import newColorFind from "utils/randomColor";
import useSendEmail from "services/CustomerLeadBoard/Mutations/useSendEmail";
import useNotification from "antd/es/notification/useNotification";

const { Option } = Select;

function EmailEditor({ setNewEmail }) {
  const { user, setUser } = useContext(userContext);
  const { openNotificationWithIcon } = useNotification();

  const [value, setValue] = useState({
    sender: user.email,
    to: [],
    subject: "",
    body: "",
  });
  const { sendEmail, isPending } = useSendEmail({
    onError: (error) => {
      var { errors } = error?.response.data;

      openNotificationWithIcon("error", errors[0]);
    },
    onSuccess: (data, payload) => {
      // onClose();
      openNotificationWithIcon("success", "Email sent successfully");
    },
  });
  const onSubmit = () => {
    console.log(value);
    // sendEmail(value);
  };
  const { data: Customersers } = useGetCustomers(
    {},
    {
      select: (data) => {
        return data?.data?.data?.rows;
      },
    },
  );

  return (
    <div className="email-editor">
      <div className="email-title">
        <Row justify={"space-between"}>
          <Col>
            <Row gutter={10}>
              <Col>
                <PlusSquareOutlined />
              </Col>
              <Col>Create email</Col>
            </Row>
          </Col>

          <Col>
            <CloseOutlined onClick={() => setNewEmail(false)} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
      </div>

      <div className="email-body">
        <Row align={"middle"} gutter={15} className="sender">
          <Col>
            <Avatar
              src={user.profileImage}
              size={40}
              icon={<div>{user?.fullName?.slice(0, 2)}</div>}
              style={{
                backgroundColor: !user.profileImage && `${newColorFind(user.id)}`,
              }}
            />
          </Col>
          <Col className="fw-500">{user?.fullName}</Col>
        </Row>

        <Row align={"middle"} gutter={10} justify={"space-between"} className="cc">
          <Col span={20}>
            <Row align={"middle"} gutter={10}>
              <Col span={2} className="fw-500">
                To
              </Col>
              <Col span={22}>
                <Select
                  // bordered={false}
                  variant="borderless"
                  showSearch
                  style={{ width: "100%" }}
                  onChange={(data) => setValue((prev) => ({ ...prev, to: data }))}
                  mode="multiple"
                  filterOption={(input, option) =>
                    (option?.children.props.children[1].props.children[1] ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  optionLabelProp="label">
                  {Customersers?.map((item) => (
                    <Select.Option key={item.id} value={item.email}>
                      {/* {item.fullName} */}
                      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        {!item?.profileImage ? (
                          <Avatar size={32} icon={<AntDesignOutlined />} />
                        ) : (
                          <Avatar size={32} src={item?.profileImage} />
                        )}
                        <div> {item.email}</div>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={4} style={{ color: "#AEAEB2" }}>
            <Input
              variant="borderless"
              onChange={(data) => setValue((prev) => ({ ...prev, cc: data.target.value }))}
              placeholder="CC"
              type="email"
            />
          </Col>
        </Row>

        <Row className="cc">
          <Input
            variant="borderless"
            onChange={(data) => setValue((prev) => ({ ...prev, subject: data.target.value }))}
            placeholder="Subject"
          />
        </Row>
        <div>
          <Editor
            value={value.body}
            onChange={(data) => setValue((prev) => ({ ...prev, body: data }))}
            onSubmit={onSubmit}
            btn_label={"send"}
          />
        </div>
      </div>
    </div>
  );
}

export default EmailEditor;
