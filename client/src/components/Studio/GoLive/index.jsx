import { Button } from "antd";

import "./styles.css";
import AddEvent from "./AddEvent";
import { useDrawer } from "hooks/useDrawer";
export default function GoLive() {
  const DrawerAPI = useDrawer();

  return (
    <>
      {DrawerAPI.Render}
      <Button
        onClick={() => {
          DrawerAPI.open();
          DrawerAPI.setDrawerContent(<AddEvent DrawerAPI={DrawerAPI}/>);
        }}
        style={{ backgroundColor: "#272942", color: "#FFFFFF" }}>
        Create Event
      </Button>
    </>
  );
}
