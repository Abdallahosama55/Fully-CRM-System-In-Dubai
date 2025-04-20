import { useQueryClient } from "@tanstack/react-query";
import "../../../../style.css";
import { Switch, Row, Col } from "antd";
import { useNotification } from "context/notificationContext";
import { QUERY_KEY } from "services/constants";
import { useState } from "react";
import { ACCOUNT_STATUS_COLOR, ACCOUNT_STATUS_TEXT, ACCOUNT_STATUS_VALUE } from "../constant";
import useUpdatePortalStatus from "services/Customers/Mutations/useUpdatePortalStatus";
export default function PortalDetailsCard({
  statusTypeId,
  statusName,
  sendingDate,
  ActivationDate,
  isEditState,
  leadId,
  isActive,
  id,
}) {
  const { openNotificationWithIcon } = useNotification();

  const toggleActivationRequest = async (isActivate) => {
    try {
    } catch (error) {
      const { errors } = error?.response?.data || {};
    }
  };
  const queryClient = useQueryClient();
  const [state, setState] = useState(isActive);
  const { updatePortalsStatus } = useUpdatePortalStatus({
    onError: (errors) => {
      openNotificationWithIcon("error", errors.response.data.message ?? errors?.response?.message);
      queryClient.setQueryData([QUERY_KEY.GET_CUSTOMER_BY_ID, id], (prev) => ({
        ...prev,
        data: {
          ...prev.data,
          data: {
            ...prev.data.data,
            customerPortalAccountInfo: {
              ...prev.data.data.customerPortalAccountInfo,

              accountStatusId: state
                ? ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.INACTIVE]
                : ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.ACTIVE],
              accountStatus: state ? ACCOUNT_STATUS_TEXT.INACTIVE : ACCOUNT_STATUS_TEXT.ACTIVE,
            },
          },
        },
      }));
      setState((prev) => !prev);
    },
    onSuccess: (data, payload) => {
      openNotificationWithIcon(
        "success",
        `${
          payload.status === ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.ACTIVE]
            ? "Activated"
            : "Deactivated"
        } successfully`,
      );
    },
  });
  const onRowSwitchChanged = (checked) => {
    setState(checked);
    queryClient.setQueryData([QUERY_KEY.GET_CUSTOMER_BY_ID, id], (prev) => ({
      ...prev,
      data: {
        ...prev.data,
        data: {
          ...prev.data.data,
          customerPortalAccountInfo: {
            ...prev.data.data.customerPortalAccountInfo,
            accountStatusId: checked
              ? ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.ACTIVE]
              : ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.INACTIVE],
            accountStatus: checked ? ACCOUNT_STATUS_TEXT.ACTIVE : ACCOUNT_STATUS_TEXT.INACTIVE,
          },
        },
      },
    }));

    const data = {
      id: id,
      status: checked
        ? ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.ACTIVE]
        : ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.INACTIVE],
    };
    updatePortalsStatus(data);
  };

  return (
    <div className="portal-details-card">
      <Row>
        <Col md={8}>
          <div style={{ marginBottom: 3 }} className="title ">
            Status
          </div>
          <div className="value ">
            {isEditState && statusTypeId !== 1 ? (
              <span>
                <Switch checked={state} size="small" onChange={(e) => onRowSwitchChanged(e)} />
              </span>
            ) : (
              <span
                style={{
                  color: ACCOUNT_STATUS_COLOR[statusName],
                  textTransform: "capitalize",
                }}>
                {statusName ? ACCOUNT_STATUS_TEXT[statusName.toLocaleUpperCase()] : "-"}
              </span>
            )}
          </div>
        </Col>
        <Col md={8}>
          <div style={{ marginBottom: 3 }} className="title">
            Sending Date
          </div>
          <div className="value">{sendingDate}</div>
        </Col>
        <Col md={8}>
          <div style={{ marginBottom: 3 }} className="title">
            Activation Date
          </div>
          <div className="value">{ActivationDate}</div>
        </Col>
      </Row>
    </div>
  );
}
