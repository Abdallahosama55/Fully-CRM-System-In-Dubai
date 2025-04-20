import { Typography, Button, Form } from "antd";
import Box from "components/Box";
import Navigation from "components/crm-board/Content/Navigation";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateitemForm from "../components/PriorityBoard/CreateEditItemForm";
import { useDrawer } from "context/drawerContext";
import CreateTemplateForm from "../CreateTemplateForm";
import usePageTitle from "hooks/usePageTitle";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { BackArrow } from "assets/jsx-svg";

const TABS = {
  PIPLINE_TEMPLATE: "PIPLINE_TEMPLATE",
  PRIORITES: "PRIORITES",
};
const ITEMS = [
  {
    id: TABS.PIPLINE_TEMPLATE,
    to: "pipline-template",
    lable: "Pipeline Template",
  },
  {
    id: TABS.PRIORITES,
    to: "priorities",
    lable: "Priorities",
  },
];
const PiplineLayout = ({ children }) => {
  // const data = useLoaderData();
  const nav = useNavigate();
  const location = useLocation();
  usePageTitle("Pipeline Settings");
  const [activeTab, setActiveTab] = useState(
    ITEMS.find((item) => location.pathname.includes("/" + item.to))?.id ?? TABS.PIPLINE_TEMPLATE,
  );

  const handleOnActiveTab = (id) => {
    const item = ITEMS.find((item) => item.id === id);
    nav(item.to);
    setActiveTab(id);
  };

  // if (data?.isLoading) {
  //   return <LoadingPage></LoadingPage>;
  // }
  const [CreateEditform] = Form.useForm();
  const [CreateTemplateform] = Form.useForm();
  const DrawerAPI = useDrawer();
  const onClose = () => {
    DrawerAPI.close();
  };
  const handelCreatePriorty = () => {
    CreateEditform.resetFields();
    DrawerAPI.open("37%");
    DrawerAPI.setDrawerContent(<CreateitemForm onClose={onClose} form={CreateEditform} />);
  };
  const handelCreateTemplate = () => {
    CreateTemplateform.resetFields();
    DrawerAPI.open("37%");
    DrawerAPI.setDrawerContent(<CreateTemplateForm onClose={onClose} form={CreateTemplateform} />);
  };
  return (
    <Box
      sx={{
        marginInline: "32px",

        background: "white",
      }}>
      <Link to={ROUTER_URLS.CRM.PIPELINES}>
        <Button size="small" type="primary" style={{ marginBottom: "8px" }} icon={<BackArrow />}>
          Back
        </Button>
      </Link>
      <Box
        sx={{
          display: "flex",
          // width: "100%",
          gap: "24px",

          flexDirection: "column",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Typography.Text
            style={{
              color: "#313342",
              fontSize: "16px",
              lineHeight: "24px",
            }}>
            {ITEMS.find((item) => item.id === activeTab).lable}
          </Typography.Text>

          {/* {activeTab == TABS.PIPLINE_TEMPLATE && (
            <Button
              style={{ background: "#272942", color: "#fff", padding: "0px 10px" }}
              size="small"
              // onClick={showAddNewEmailConfig}
            >
              + New Template
            </Button>
          )} */}

          <Button
            style={{ background: "#272942", color: "#fff", padding: "0px 10px" }}
            size="small"
            onClick={() => {
              activeTab === TABS.PRIORITES && handelCreatePriorty();
              activeTab === TABS.PIPLINE_TEMPLATE && handelCreateTemplate();
            }}
            // onClick={showAddNewEmailConfig}
          >
            {activeTab === TABS.PRIORITES && "+ New Priorty"}
            {activeTab === TABS.PIPLINE_TEMPLATE && "+ New Template"}
          </Button>
        </Box>
        <Box
          sx={{
            "& .nav-item": {
              background: "#FAFAFB",
              borderColor: "#E8E8F0",
              color: "#030713",
              fontSize: "12px",
              Weight: 500,
              borderRadius: "8px",
            },
          }}>
          <Navigation activeTab={activeTab} setActiveTab={handleOnActiveTab} navItemsIn={ITEMS} />
        </Box>
      </Box>
      <div style={{ justifyContent: "space-between" }}></div>
      {children}
    </Box>
  );
};
export default PiplineLayout;
