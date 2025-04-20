import { Drawer } from "antd";

import { useDrawer } from "context/drawerContext";

import "./styles.css";

export default function RightDrawer() {
  const DrawerAPI = useDrawer();

  return (
    <Drawer
      rootClassName={`right-drawer ${DrawerAPI.rootClassName ? DrawerAPI.rootClassName : ""}`}
      title={null}
      width={DrawerAPI.drawerWidth}
      onClose={DrawerAPI.close}
      styles={{
        header: {
          border: "none",
          padding: "0px",
        },
      }}
      open={DrawerAPI.isDrawerOpen}
      destroyOnClose={DrawerAPI.destroyOnClose}>
      {DrawerAPI.drawerContent}
    </Drawer>
  );
}
