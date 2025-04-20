import { useContext } from "react";
import { Button, Col, Divider, Form, Input, Row, Typography, notification } from "antd";

import userContext from "context/userContext";
import { askForCounter } from "../HostCommands";
import {
  CounterFileSVG,
  FullNameSVG,
  SignatureSVG,
  PluseSVG,
  AEDSVG,
  SenegalFlag,
  SARSVG,
} from "assets/jsx-svg";

import "./styles.css";

export default function Counter({
  changeSettings,
  setActiveBtn,
  counterForm,
  counterActiveBtn,
  setCounterActiveBtn,
  iframeRef,
  participants,
  deskIframeRef,
  prevCounterData,
  sameCounterCliked,
  setSameCounterCliked,
  metaverseParticipants,
}) {
  const { user } = useContext(userContext);

  const onFinish = (values) => {
    if (prevCounterData.current && prevCounterData.current.dataAskedFor !== "null") {
      const data = JSON.parse(prevCounterData.current.dataAskedFor);
      if (+data.formData.type === +counterActiveBtn) {
        setSameCounterCliked((prev) => ++prev);
      }
    }
    askForCounter({
      changeSettings,
      counterActiveBtn,
      fileName: values.fileName,
      customField: values.customField,
      price: values.price,
      sameCounterCliked,
    });

    if (iframeRef) {
      metaverseParticipants.forEach((participant) => {
        if (participant.id === user.id) return;

        iframeRef.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SendInputRequest",
          JSON.stringify({
            userId: participant.id,
            type: counterActiveBtn,
            fileName: values.fileName ? values.fileName : null,
            customField: values.customField ? values.customField : null,
          }),
        );
      });
      participants.forEach((participant) => {
        if (participant.uid === user.id) return;

        iframeRef.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SendInputRequest",
          JSON.stringify({
            userId: participant.uid,
            type: counterActiveBtn,
            fileName: values.fileName ? values.fileName : null,
            customField: values.customField ? values.customField : null,
          }),
        );
      });
    }
    if (deskIframeRef) {
      participants.forEach((participant) => {
        if (participant.uid === user.id) return;
        deskIframeRef.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SendInputRequest",
          JSON.stringify({
            userId: participant.uid,
            type: counterActiveBtn,
            fileName: values.fileName ? values.fileName : null,
            customField: values.customField ? values.customField : null,
          }),
        );
      });
    }
    notification.info({
      message: "Notification has been send to participants to submit.",
    });
    setActiveBtn("counterUserSharedData");
    counterForm.resetFields();
  };

  const counterButtons = [
    { id: 1, label: "Full Name", icon: FullNameSVG },
    { id: 2, label: "Signature", icon: SignatureSVG },
    { id: 3, label: "File", icon: CounterFileSVG },
    { id: 4, label: "Custom Field", icon: PluseSVG },
  ];

  return (
    <Form
      name="counter-form"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      form={counterForm}
      className="h-100">
      <Row gutter={[0, 16]} className="counter-section">
        <Col flex={1} style={{ height: "calc(100% - 60px)" }}>
          <Row>
            <Typography.Text className="fz-18 fw-500">Counter</Typography.Text>
          </Row>

          <Row style={{ margin: "24px 0 24px" }}>
            <Typography.Text className="fz-16 fw-500">
              Ask Participants For Data or Files
            </Typography.Text>
          </Row>
          <Row gutter={[14, 16]}>
            {counterButtons.map((btn) => (
              <Col key={btn.id} xs={24} md={12}>
                <Button
                  className="counter-btn w-100"
                  type="button"
                  style={{
                    border: counterActiveBtn === btn.id && "1px solid #0318d6",
                  }}
                  onClick={() => setCounterActiveBtn(btn.id)}>
                  <Row gutter={[12, 0]} align="middle" wrap={false}>
                    <Col>
                      <Row align="middle" className={btn.id === 5 && "AED-svg"}>
                        <btn.icon />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text ellipsis>{btn.label}</Typography.Text>
                    </Col>
                  </Row>
                </Button>
              </Col>
            ))}

            {counterActiveBtn === 3 && (
              <Col xs={24}>
                <Form.Item
                  rules={[
                    {
                      required: counterActiveBtn === 3,
                      message: "Please Enter The File Name",
                    },
                  ]}
                  name="fileName"
                  label="File Name">
                  <Input placeholder="Enter Here" style={{ background: "#fff" }} />
                </Form.Item>
              </Col>
            )}

            {counterActiveBtn === 4 && (
              <Col xs={24}>
                <Form.Item
                  rules={[
                    {
                      required: counterActiveBtn === 4,
                      message: "Please Enter The Field Title",
                    },
                  ]}
                  name="customField"
                  label="Field Title">
                  <Input placeholder="Enter Here" style={{ background: "#fff" }} />
                </Form.Item>
              </Col>
            )}

            <Divider style={{ marginBlock: "0px" }} />
            <Typography.Text className="fz-16 fw-500">Ask Participants For Payment</Typography.Text>

            <Col xs={24} md={12}>
              <Button
                className="counter-btn w-100"
                type="button"
                style={{
                  border: counterActiveBtn === 5 && "1px solid #0318d6",
                }}
                onClick={() => setCounterActiveBtn(5)}>
                <Row gutter={[12, 0]} align="middle" wrap={false}>
                  <Col>
                    <Row align="middle" className={"AED-svg"}>
                      {window.location.hostname.match("airsenegal") ? (
                        <SenegalFlag />
                      ) : window.location.hostname.match("misa") ? (
                        <SARSVG />
                      ) : (
                        <AEDSVG />
                      )}
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text ellipsis>Ask To Pay</Typography.Text>
                  </Col>
                </Row>
              </Button>
            </Col>

            {/* {counterActiveBtn === 5 && (
              <Col xs={24}>
                <Form.Item
                  rules={[
                    {
                      required: counterActiveBtn === 5,
                      message: "Please Enter The Price",
                    },
                  ]}
                  name="price"
                  label="Price">
                  <Input type="number" placeholder="Enter Price" style={{ background: "#fff" }} />
                </Form.Item>
              </Col>
            )} */}
          </Row>
        </Col>

        <Col flex={1}>
          <Row gutter={[14, 16]}>
            <Col xs={24} md={14}>
              <Button
                onClick={() => setActiveBtn("counterParticipants")}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "12px",
                }}>
                <Typography.Text ellipsis>Select participants</Typography.Text>
              </Button>
            </Col>
            <Col xs={24} md={10}>
              <Button
                className="w-100"
                style={{
                  borderRadius: "12px",
                }}
                type="primary"
                htmlType="submit">
                Send to All
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}
