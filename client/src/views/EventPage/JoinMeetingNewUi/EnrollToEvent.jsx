import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Grid, Input, Row, Typography } from "antd";

import { ArrowLeftSVG } from "assets/jsx-svg";
import userContext from "context/userContext";
import { useNotification } from "context/notificationContext";
import { JOIN_TO_MEETING, REGISTRATION } from "./RegistrationFlow";
import useEventEnrollForAuthEmployess from "services/Events/Mutations/useEventEnrollForAuthEmployess";
import useEventEnrollForAuthCustomers from "services/CustmerPortal/Mutations/useEventEnrollForAuthCustomers";
import useEventEnrollForUnAuthCustomers from "services/CustmerPortal/Mutations/useEventEnrollForUnAuthCustomers";

import "./styles.css";

const EnrollToEvent = ({ setNavigateStatus, setShowSuccessIcon }) => {
  const { eventId } = useParams();
  const { user } = useContext(userContext);
  const { openNotificationWithIcon } = useNotification();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { lg } = screens;

  const {
    mutate: eventEnrollForUnAuthCustomers,
    isPending: isEventEnrollForUnAuthCustomersPending,
  } = useEventEnrollForUnAuthCustomers({
    onSuccess: () => {
      openNotificationWithIcon("success", "Enroll sucessfully");
      setShowSuccessIcon(true);
      setTimeout(() => {
        setShowSuccessIcon(false);
        setNavigateStatus(JOIN_TO_MEETING);
      }, 3000);
    },
    onError: (error) => {
      if (error.response.status === 409) {
        openNotificationWithIcon("success", "You have already Enrolled");
      } else {
        openNotificationWithIcon("error", error?.response?.data?.message);
      }
    },
  });

  const { mutate: eventEnrollForAuthEmployess, isPending: isEventEnrollForAuthEmployessPending } =
    useEventEnrollForAuthEmployess({
      onSuccess: () => {
        openNotificationWithIcon("success", "Enroll sucessfully");
      },
      onError: (error) => {
        if (error.response.status === 409) {
          openNotificationWithIcon("info", "You have already Enrolled");
        } else {
          openNotificationWithIcon("error", error?.response?.data?.message);
        }
      },
    });
  const { mutate: eventEnrollForAuthCustomers, isPending: isEventEnrollForAuthCustomersPending } =
    useEventEnrollForAuthCustomers({
      onSuccess: () => {
        openNotificationWithIcon("success", "Enroll sucessfully");
      },
      onError: (error) => {
        if (error.response.status === 409) {
          openNotificationWithIcon("info", "You have already Enrolled");
        } else {
          openNotificationWithIcon("error", error?.response?.data?.message);
        }
      },
    });

  const onFinish = async (values) => {
    if (user && user.type === "EMPLOYEE") {
      eventEnrollForAuthEmployess(eventId);
    } else if (user) {
      eventEnrollForAuthCustomers(eventId);
    } else {
      eventEnrollForUnAuthCustomers({ eventId, email: values.email });
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="registration-flow"
      style={{ width: "100%" }}>
      <Row>
        <Button
          type="text"
          icon={<ArrowLeftSVG />}
          onClick={() => {
            setNavigateStatus(REGISTRATION);
          }}
          style={{ padding: "0px", width: "20px", height: "40px" }}
        />
      </Row>

      <Row gutter={[0, 18]}>
        <Col lg={12} xs={24}>
          <div className="flex-column">
            <Typography.Text className="text-title">Enroll</Typography.Text>
            <Typography.Text className="text-description">
              Please enter E-mail in to enroll in this event
            </Typography.Text>
          </div>
        </Col>

        <Col lg={12} xs={24} className="flex-row-reverse">
          <Button
            type="primary"
            htmlType="submit"
            loading={
              isEventEnrollForUnAuthCustomersPending ||
              isEventEnrollForAuthCustomersPending ||
              isEventEnrollForAuthEmployessPending
            }>
            Enroll
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: lg && "20px", marginBottom: "20px" }}>
        <Col xs={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email address",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EnrollToEvent;
