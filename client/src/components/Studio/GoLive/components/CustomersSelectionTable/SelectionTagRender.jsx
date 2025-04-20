import { Tag, Avatar } from "antd";

const SelectionTagRender = ({ label, value, closable, onClose }) => {
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
        height: 36,
        borderRadius: 10,
        padding: "0px 12px",
        backgroundColor: "rgba(39, 41, 66, 0.02)",
        border: "1px solid rgba(39, 41, 66, 0.06);",
        display: "flex",
        alignItems: "center",
      }}>
      <Avatar
        size={28}
        style={{ backgroundColor: "#0318D626", color: "#0318D69A", marginRight: 8 }}
        src={value?.profileImage}>
        {(!value?.profileImage || value?.profileImage != "null") &&
          `${value?.fullName
            ?.split(" ")
            ?.map((i) => i.charAt(0))
            ?.join("")
            ?.toUpperCase()}`}
      </Avatar>
      {label}
    </Tag>
  );
};

export default SelectionTagRender;
