import { Flex, Typography } from "antd";
import { ShareSVG } from "assets/jsx-svg";
import Box from "components/Box";
import LoadingPage from "components/common/LoadingPage";
import Navigation from "components/crm-board/Content/Navigation";
import userContext from "context/userContext";
import { useContext, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useGetDeskById from "services/Desk/Querys/useGetDeskById";
import ShareModal from "views/Desks/DeskInformation/ShareModal";
const TABS = {
  DESK_INFORMATION: "DESK_INFORMATION",
  EMPLOYEES: "EMPLOYEES",
  CUSTOMER_REQUIRED_INFORMATION: "CUSTOMER_REQUIRED_INFORMATION",
  FILES: "FILES",
  METAVERSES: "METAVERSES",
};
const ITEMS = [
  {
    id: TABS.DESK_INFORMATION,

    lable: "Desk Information",
  },
  {
    id: TABS.EMPLOYEES,
    to: "employees",
    lable: "Employees",
  },
  {
    id: TABS.METAVERSES,
    lable: "Metaverses",
    to: "metaverses",
  },
  {
    id: TABS.FILES,
    lable: "Files",
    to: "files",
  },
];
const employeeDiskTabs = [TABS.DESK_INFORMATION, TABS.METAVERSES, TABS.FILES];

const HelpDeskLayout = ({ children, type }) => {
  const data = useLoaderData();
  const { user } = useContext(userContext);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data: employeeDeskData } = useGetDeskById(user.employeeDeskId, {
    enabled: !data,
    select: (res) => {
      return res.data.data;
    },
  });
  const nav = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    ITEMS.find((item) => location.pathname.includes("/" + item.to))?.id ?? TABS.DESK_INFORMATION,
  );
  const omitNavBar = location.pathname.includes("/edit-information");
  const handleOnActiveTab = (id) => {
    const item = ITEMS.find((item) => item.id === id);
    nav(item.to, {
      unstable_viewTransition: true,
      unstable_flushSync: true,
    });
    setActiveTab(id);
  };
  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
  };

  if (data?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Box
      sx={{
        background: "white",
      }}>
      <Box
        sx={{
          marginInline: "32px",
          display: "flex",
          gap: "24px",
          flexDirection: "column",
        }}>
        <Flex align="center" justify="space-between">
          {type !== "EMPLOYEE_DEFAULT_DESK" && !omitNavBar && (
            <Typography.Text
              style={{
                color: "#313342",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "600",
              }}>
              {data?.data?.data?.name}
            </Typography.Text>
          )}
          {["EMPLOYEE_DEFAULT_DESK"].includes(
            data?.data?.data?.deskType ?? employeeDeskData?.deskType,
          ) && <div></div>}
          {["MEETING_DESK", "EMPLOYEE_DEFAULT_DESK"].includes(
            data?.data?.data?.deskType ?? employeeDeskData?.deskType,
          ) && (
            <Box
              onClick={handleOpenShareModal}
              className="clickable d-flex align-center"
              sx={{
                gap: "4px",
                color: "#3a5ee3",
                marginLeft: 16,
              }}>
              <ShareSVG color="#3a5ee3" width={12} />
              Share
            </Box>
          )}
          <ShareModal
            deskId={data?.data?.data?.id ?? employeeDeskData?.id}
            deskName={data?.data?.data?.name ?? employeeDeskData?.name}
            isOpen={isShareModalOpen}
            setIsOpen={setIsShareModalOpen}
          />
        </Flex>
        {!omitNavBar && (
          <Box
            sx={{
              "& .nav-item": {
                background: "#FAFAFB",
                borderColor: "#E8E8F0",
                color: "#030713",
                fontSize: "12px",
                Weight: 500,
                borderRadius: "12px",
              },
            }}>
            <Navigation
              activeTab={activeTab}
              setActiveTab={handleOnActiveTab}
              navItemsIn={ITEMS.filter((item) => {
                if (type === "EMPLOYEE_DEFAULT_DESK") {
                  return employeeDiskTabs.includes(item.id);
                }
                return true;
              })}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          paddingInline: "34px",
          paddingTop: "16px",
        }}>
        {children}
      </Box>
    </Box>
  );
};
export default HelpDeskLayout;
