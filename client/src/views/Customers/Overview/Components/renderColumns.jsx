import { Avatar, Typography } from "antd";
import TableActions from "./TableActions";
import { stringAvatar } from "utils/string";
import { ComapnyOutlineSVG, StatusSVG } from "assets/jsx-svg";
import { PhoneOutlined, ProductOutlined, UserOutlined } from "@ant-design/icons";
import ContactType from "./ContactType";

export default (onOpenCustomerModal, onRefetchData, confirmationModal) => {
  return [
    {
      title: (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}>
          <UserOutlined style={{ fontSize: "16px" }} />
          Contact Name
        </div>
      ),
      dataIndex: "contact-name",
      key: "contact-name",
      ellipsis: true,
      width: 300,
      render: (_, { fullName, profileImage, email, id }) => (
        <div
          title="View Contact"
          onClick={() => onOpenCustomerModal(id)}
          style={{ display: "flex", columnGap: 12, alignItems: "center", cursor: "pointer" }}>
          <div>
            <Avatar size={38} {...stringAvatar(fullName || "")} src={profileImage}></Avatar>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ color: "#313342", fontWeight: 500, fontSize: 14 }}>{fullName}</p>
            <Typography.Text ellipsis style={{ color: "#585A72", fontSize: 14, width: "230px" }}>
              {email}
            </Typography.Text>
          </div>
        </div>
      ),
    },
    ,
    {
      title: (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}>
          <PhoneOutlined style={{ transform: "rotate(90deg)", fontSize: "16px" }} />
          Phone
        </div>
      ),
      dataIndex: "mobile",
      key: "mobile",

      ellipsis: true,
      width: 150,
      render: (_, { mobile, telephone, prefix }) => {
        let mobileWithPrefx = prefix + mobile;
        if (mobileWithPrefx && telephone) {
          return mobileWithPrefx + "/" + telephone;
        }

        return mobileWithPrefx || telephone || "-";
      },
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}>
          <ProductOutlined style={{ fontSize: "16px" }} />
          Category
        </div>
      ),
      dataIndex: "category",
      key: "Category",
      ellipsis: true,
      width: 150,
      render: (_, { category }) => {
        if (category) {
          return category?.name;
        }
        return "-";
      },
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}>
          <ComapnyOutlineSVG />
          Company
        </div>
      ),
      dataIndex: "customerCompany",
      key: "customerCompany",
      ellipsis: true,
      width: 150,
      render: (_, { customerCompany }) => {
        if (customerCompany) {
          return customerCompany?.name;
        }
        return "-";
      },
    },

    {
      title: (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}>
          <StatusSVG />
          Type
        </div>
      ),
      key: "type",
      dataIndex: "color",
      align: "center",
      width: 150,
      render: (_, record) => <ContactType record={record} />,
    },
    {
      title: " ",
      key: "actions",
      ellipsis: true,
      dataIndex: "actions",
      width: "50px",
      align: "center",

      render: (_, { id, isActive }) => {
        return (
          <TableActions
            id={id}
            isActive={isActive}
            onRefetchData={onRefetchData}
            confirmationModal={confirmationModal}
            onViewCustomer={onOpenCustomerModal}></TableActions>
        );
      },
    },
  ];
};
