import { useDrawer } from "hooks/useDrawer";
import React, { useCallback } from "react";

const CustomerDrawer = ({ children, trigger }) => {
  const DrawerAPI = useDrawer();
  const onClose = useCallback(() => {
    DrawerAPI.close();
  }, []);
  const handleOpen = () => {
    DrawerAPI.open("50%");
    DrawerAPI.handleSetDestroyOnClose(true);
    DrawerAPI.setDrawerContent(React.cloneElement(children, { onClose: onClose }));
  };

  return <>{DrawerAPI.Render}{trigger && React.cloneElement(trigger, { onClick: handleOpen })}</>;
};
export default CustomerDrawer;
