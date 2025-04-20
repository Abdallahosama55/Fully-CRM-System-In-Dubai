import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Row, Space, Typography } from "antd";
import { ClientsSVG, CompaniesSVG, ProspectsSVG, QualitySVG } from "assets/jsx-svg";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import { useContext, useEffect, useState } from "react";
import useGetConstants from "services/Constants/Querys/useGetConstants";
import useupdateContactStatus from "services/Customers/Mutations/useupdateContactStatus";
import usePutMeetingStatus from "services/meetings/Mutations/usePutMeetingStatus";

const ContactType = ({ record, padding = "4px 10px", width = "119 px", borderRadius = "31px" }) => {
  const type = record.type;
  const { openNotificationWithIcon } = useNotification();
  const [selectedType, setSelectedType] = useState({});
  const getTypeList = (type) => {
    switch (type) {
      case "LEAD":
        return [
          {
            key: "QUALIFIED",
            label: `Qualified`,
            color: "#CC7000",
            backgroundColor: "#FFEED3",
            icon: <QualitySVG />,
          },
          {
            key: "CLIENT",
            label: `Client`,
            color: "#1C7A31",
            backgroundColor: "#E5F6E8",
            icon: <ClientsSVG />,
          },
        ];
      case "QUALIFIED":
        return [
          {
            key: "LEAD",
            label: `Lead`,
            color: "#0056B3",
            backgroundColor: "#E4F0FF",
            icon: <ProspectsSVG />,
          },
          {
            key: "CLIENT",
            label: `Client`,
            color: "#1C7A31",
            backgroundColor: "#E5F6E8",
            icon: <ClientsSVG />,
          },
        ];
      case "CLIENT":
        return [
          {
            key: "QUALIFIED",
            label: `Qualified`,
            color: "#CC7000",
            backgroundColor: "#FFEED3",
            icon: <QualitySVG />,
          },
          {
            key: "LEAD",
            label: `Lead`,
            color: "#0056B3",
            backgroundColor: "#E4F0FF",
            icon: <ProspectsSVG />,
          },
        ];
      default:
        break;
    }
  };
  const [typeList, setTypeList] = useState(getTypeList(type));

  const { updateContactStatus } = useupdateContactStatus(record.id, {
    onSuccess: (_, payload) => {
      openNotificationWithIcon("success", `Updated successfully`);
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });
  const types = [
    {
      key: "LEAD",
      label: `Lead`,
      color: "#0056B3",
      backgroundColor: "#E4F0FF",
      icon: <ProspectsSVG />,
    },
    {
      key: "QUALIFIED",
      label: `Qualified`,
      color: "#CC7000",
      backgroundColor: "#FFEED3",
      icon: <QualitySVG />,
    },
    {
      key: "CLIENT",
      label: `Client`,
      color: "#1C7A31",
      backgroundColor: "#E5F6E8",
      icon: <ClientsSVG />,
    },
  ];
  const getStatus = () => {
    const selectedStatus = types.filter((item) => item.key == type)[0];
    return selectedStatus;
  };

  useEffect(() => {
    setSelectedType(getStatus());
  }, [record]);

  const handleChangeStatus = (status) => {
    const typeSelected = types.filter((item) => item.key == status.key)[0];
    setSelectedType(typeSelected);
    setTypeList(getTypeList(status?.key));
    updateContactStatus({ type: status?.key });
    // UpdateMeetingStatus({
    //   id: record?.id,
    //   status: status ?? null,
    // });
  };

  return (
    <Dropdown
      disabled={!selectedType?.label}
      overlay={
        <Menu
          style={{
            border: "1px solid #E5E5EA",
            borderRadius: "12px",
            boxShadow: "3px 6px 16px #00000014",
          }}>
          {typeList?.map((status) => (
            <Menu.Item
              key={`${status?.key}`}
              onClick={() => handleChangeStatus(status)}
              // style={{ color: status.color }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                {status?.label}
              </div>
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={["click"]}>
      <div style={{ cursor: "pointer" }}>
        {/* <Typography.Text>{selectedStatus?.label}</Typography.Text> */}
        <div
          style={{
            display: "flex",
            padding: padding,
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: borderRadius,
            backgroundColor: selectedType?.backgroundColor || "#F1F3F5",
            color: selectedType?.color || "#313342",
            width: width,
          }}>
          <div
            style={{
              display: "flex",
              columnGap: 4,
              alignItems: "center",
            }}>
            {selectedType?.icon || <CompaniesSVG />}
            <Space style={{ paddingLeft: 4 }}>{selectedType?.label || "Company"}</Space>
          </div>
          <div>{selectedType?.label && <DownOutlined />}</div>
        </div>
      </div>
    </Dropdown>
  );
};

export default ContactType;
