import { Avatar } from "antd";
import { stringAvatar } from "utils/string";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => [
  {
    title: "Contact Name",
    dataIndex: "avatar",
    key: "avatar",
    ellipsis: true,
    width: 160,

    render: (_, { fullName, profileImage, email }) => (
      <div style={{ display: "flex", columnGap: 12, alignItems: "center" }}>
        <div>
          <Avatar
            size={38}
            {...stringAvatar(fullName || "")}
            // style={{ backgroundColor: "#0318D626", color: "#0318D69A" }}
            src={profileImage}>
            {/* {!profileImage &&
          `${fullName
            .split(" ")
            .map((i) => i.charAt(0))
            .join("")
            .toUpperCase()}`} */}
          </Avatar>
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ color: "#313342", fontWeight: 500, fontSize: 14 }}>{fullName}</p>
          <p style={{ color: "#585A72", fontSize: 14 }}>{email}</p>
        </div>
      </div>
    ),
  },
  // {
  //   title: "Employee Name",
  //   dataIndex: "fullName",
  //   key: "fullName",
  //   ellipsis: true,
  //   width: 150,
  // },
  // {
  //   title: "Email",
  //   dataIndex: "email",
  //   key: "email",
  //   ellipsis: true,
  //   width: 180,
  // },
  {
    title: "Phone Number",
    dataIndex: "mobile",
    key: "mobile",
    ellipsis: true,
    width: 150,
  },
];
