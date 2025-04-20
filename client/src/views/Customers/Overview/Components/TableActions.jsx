import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { MoreSVG } from "assets/jsx-svg";
import { useNotification } from "context/notificationContext";
import { useMemo } from "react";
import useUpdatePortalStatus from "services/Customers/Mutations/useUpdatePortalStatus";
import {
  ACCOUNT_STATUS_TEXT,
  ACCOUNT_STATUS_VALUE,
} from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/constant";

const TableActions = ({ id, isActive, onViewCustomer, onRefetchData, confirmationModal }) => {
  const { openNotificationWithIcon } = useNotification();

  const { updatePortalsStatus } = useUpdatePortalStatus({
    onError: (errors) => {
      openNotificationWithIcon(
        "error",
        errors?.response?.data?.message ?? errors?.response?.message,
      );
    },
    onSuccess: (_, payload) => {
      openNotificationWithIcon(
        "success",
        `${
          payload.status === ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.ACTIVE]
            ? "Activated"
            : "Deactivated"
        } successfully`,
      );
      onRefetchData();
    },
  });

  const handleDeactivateCustomer = () => {
    updatePortalsStatus({
      id,
      status: ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.INACTIVE],
    });
  };

  const handleActivateCustomer = () => {
    updatePortalsStatus({
      id,
      status: ACCOUNT_STATUS_VALUE[ACCOUNT_STATUS_TEXT.ACTIVE],
    });
  };

  const confirm = (isActivating) => {
    confirmationModal?.confirm({
      title: "Toggle Activation Confirmation",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to ${isActivating ? "activate" : "deactivate"} this Contact?`,
      okText: "Yes",
      cancelText: "No",
      onOk: isActivating ? () => handleActivateCustomer(id) : () => handleDeactivateCustomer(id),
    });
  };

  const items = useMemo(
    () => [
      {
        label: "View",
        onClick: () => onViewCustomer(id),
      },
      {
        label: isActive ? "Deactivate" : "Activate",
        onClick: () => confirm(!isActive),
      },
    ],
    [confirm, onViewCustomer, isActive, id],
  );

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="more-btn">
        <MoreSVG style={{ rotate: "90deg" }} />
      </div>
    </Dropdown>
  );
};

export default TableActions;
