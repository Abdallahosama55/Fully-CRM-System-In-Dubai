import { useMemo, useState } from "react";
import { useParticipants } from "@livekit/components-react";
import { RemoteParticipant } from "livekit-client";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Typography,
  notification,
} from "antd";

import { askForCounter } from "../HostCommands";
import { ArrowRightSVG, SearchSVG } from "assets/jsx-svg";

import "./styles.css";

export default function SelectParticipants({
  changeSettings,
  setActiveBtn,
  counterForm,
  counterActiveBtn,
  type = "counter",
}) {
  const [participantsForm] = Form.useForm();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [showParticipants, setShowParticipants] = useState([]);
  const allParticipants = useParticipants();

  useMemo(() => {
    if (searchValue) {
      setShowParticipants(
        allParticipants.filter(
          (participant) =>
            participant instanceof RemoteParticipant &&
            participant.name.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    } else {
      setShowParticipants(
        allParticipants.filter((participant) => participant instanceof RemoteParticipant),
      );
    }
  }, [searchValue, allParticipants.length]);

  const onSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value.trim());
  };

  const onFinish = () => {
    if (type === "counter") {
      const fileName = counterForm.getFieldValue("fileName");
      const customField = counterForm.getFieldValue("customField");
      const price = counterForm.getFieldValue("price");

      if (selectedUsers.length) {
        if ((counterActiveBtn === 3 && !fileName) || (counterActiveBtn === 4 && !customField)) {
          notification.error({
            message: `You should fill the ${
              counterActiveBtn === 4 ? "custom field" : "file name"
            } `,
          });
          setActiveBtn("counter");
          return;
        }

        askForCounter({
          changeSettings,
          counterActiveBtn,
          fileName,
          customField,
          price,
          users: selectedUsers.join(","),
        });
        participantsForm.setFieldValue("users", undefined);
        notification.success({
          message: "Notification has been send to participants to submit.",
        });

        setActiveBtn("counterUserSharedData");
      }
    } else {
      // SystemMessage.askSelectedUserForDesk({
      //   users: selectedUsers,
      //   deskId: selectedDeskId,
      // });
      // setActiveBtn("desks");
    }
  };

  const onChange = (list) => {
    setSelectedUsers(list);
    setIndeterminate(!!list.length && list.length < showParticipants.length);
    setCheckAll(list.length === showParticipants.length);
  };

  const onCheckAllChange = (e) => {
    setSelectedUsers(e.target.checked ? showParticipants.map((participant) => participant.id) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <section className="h-100">
      <Row
        wrap={false}
        align="middle"
        gutter={[8, 0]}
        style={{ width: "fit-content" }}
        className="clickable"
        onClick={() => (type === "desk" ? setActiveBtn("desks") : setActiveBtn("counter"))}>
        <Col>
          <Row align="middle">
            <ArrowRightSVG color="#8E8E93" style={{ rotate: "180deg" }} />
          </Row>
        </Col>
        <Col>
          <Typography.Text className="gc">Back</Typography.Text>
        </Col>
      </Row>

      <Form form={participantsForm} onFinish={onFinish} className="h-100">
        <ConfigProvider
          theme={{
            components: {
              Checkbox: {
                borderRadiusSM: 4,
                colorBgContainer: "transparent",
                colorPrimary: "#3A5EE3",
                colorWhite: "#fff",
                colorPrimaryHover: "#3A5EE3",
                colorPrimaryBorder: "#eee",
              },
            },
          }}>
          <Row
            gutter={[0, 14]}
            style={{ flexDirection: "column" }}
            justify="space-between"
            className="w-100">
            <Col flex={1}>
              <Row gutter={[0, 14]} className="mt-1">
                <Row>
                  <Typography.Text className="fz-16 fw-500">Select Participants</Typography.Text>
                </Row>
                <Col xs={24} style={{ paddingRight: "0.5rem" }}>
                  <Row>
                    <Input
                      onChange={onSearch}
                      placeholder="Search"
                      prefix={<SearchSVG color="#dedede" style={{ scale: "0.8" }} />}
                    />
                  </Row>
                </Col>

                <Col
                  xs={24}
                  style={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                    paddingRight: "0.5rem",
                  }}>
                  <Row gutter={[0, 20]} className="custome-checkbox-reversed">
                    <Form.Item name="users" noStyle>
                      {showParticipants.length > 0 && (
                        <Checkbox
                          indeterminate={indeterminate}
                          onChange={onCheckAllChange}
                          checked={checkAll}>
                          Check all
                        </Checkbox>
                      )}
                      <Checkbox.Group
                        style={{
                          height: "calc(100% - 40px)",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "16px",
                        }}
                        className="w-100"
                        onChange={onChange}
                        value={selectedUsers}>
                        {showParticipants.map((user) => {
                          if (user.metadata) {
                            const metaData = JSON.parse(user.metadata);
                            user.id = metaData.id;
                            user.profileImage = metaData.profileImage;
                          }
                          return (
                            <Checkbox value={user.id} key={user.id}>
                              <Row align="middle" gutter={[12, 0]} wrap={false}>
                                <Col>
                                  <Avatar src={user.profileImage} alt={user.name} size={35} />
                                </Col>
                                <Col>
                                  <Typography.Text className="fw-500">{user.name}</Typography.Text>
                                </Col>
                              </Row>
                            </Checkbox>
                          );
                        })}
                      </Checkbox.Group>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: "14px",
                  height: "36px",
                  padding: "0px 16px",
                  fontWeight: "500",
                  fontSize: "14px",
                  textOverflow: "ellipsis",
                }}
                className="w-100"
                disabled={!selectedUsers.length}>
                Send
              </Button>
            </Col>

            {allParticipants.length === 1 && type === "desk" && (
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    borderRadius: "14px",
                    height: "36px",
                    padding: "0px 16px",
                    fontWeight: "500",
                    fontSize: "14px",
                    textOverflow: "ellipsis",
                  }}
                  className="w-100">
                  Start Alone
                </Button>
              </Col>
            )}
          </Row>
        </ConfigProvider>
      </Form>
    </section>
  );
}
