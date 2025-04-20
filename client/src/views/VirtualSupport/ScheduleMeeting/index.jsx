import { Drawer } from "antd";
import Meeting from "views/Meeting";

const ScheduleMeeting = ({ open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      width={"90%"}
      title={`Meetings`}
      size="large"
      placement="right"
      onClose={onClose}
      open={open}>
      <div style={{ position: "relative" }}>
        <Meeting />
      </div>
    </Drawer>
  );
};
export default ScheduleMeeting;
