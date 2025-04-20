import { Drawer } from "antd";
import { useCallback } from "react";
import { useState } from "react";
// style
import "./styles.css"
export const useDrawer = ( children = <></> ) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState("70%");
    const [destroyOnClose, setDestroyOnClose] = useState(true);
    const [drawerContent, setDrawerContent] = useState(children);
    const [rootClassName, setRootClassName] = useState("");
    const open = useCallback((width) => {
        setIsDrawerOpen(true);
        setDrawerWidth(width || "70%");
        setRootClassName("");
    }, []);

    const handleSetDestroyOnClose = (data) => {
        setDestroyOnClose(data);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const close = useCallback(() => {
        setIsDrawerOpen(false);
        setRootClassName("");
    }, []);

    return {
        Render: <Drawer
            rootClassName={`right-drawer ${rootClassName ? rootClassName : ""}`}
            title={null}
            width={drawerWidth}
            onClose={close}
            styles={{
                header: {
                    border: "none",
                    padding: "0px",
                },
            }}
            open={isDrawerOpen}
            destroyOnClose={destroyOnClose}>
            {drawerContent}
        </Drawer>,
        isDrawerOpen,
        drawerContent,
        drawerWidth,
        open,
        close,
        toggleDrawer,
        setDrawerContent,
        handleSetDestroyOnClose,
        destroyOnClose,
        rootClassName,
        setRootClassName,
    }
};
