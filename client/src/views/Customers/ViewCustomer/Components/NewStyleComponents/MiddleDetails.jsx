// components
// import MetaverseActivistes from "./Tabs/metaverse-activistes";
// import WebActivistes from "./Tabs/web-activistes";
// import Carts from "./Tabs/carts";
// import Purchases from "./Tabs/Purchases";
// import Calls from "./Tabs/Calls";
// import Meetings from "./Tabs/Mettings";
// import Notes from "./Tabs/Notes";
// import Tasks from "./Tabs/Tasks";
// import Emails from "./Tabs/emails";
// constants
import { CRM_BOARD_DRAWER_TABS } from "./Content";
// style
import "./middleDetailsStyle.css";
import PortalDetailsPage from "./NavigationPages/PortalDetailsPage";
import AttachmentsPage from "./NavigationPages/AttachmentsPage";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import { useParams } from "react-router-dom";
import InvoicesPage from "./NavigationPages/InvoicesPage";
import Activity from "../Activity";
function MiddleDetails({ activeTab, customerId, CustomerData }) {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const customerData = queryClient.getQueryData([QUERY_KEY.GET_CUSTOMER_BY_ID, id ?? customerId]);
  const customData = customerData?.data?.data;
  return (
    <>
      {activeTab === CRM_BOARD_DRAWER_TABS.Portal_details && (
        <PortalDetailsPage customerId={customerId} />
      )}
      {activeTab === CRM_BOARD_DRAWER_TABS.ACTIVITY && (
        <Activity CustomerData={CustomerData} customerId={customerId} />
      )}
      {/* {activeTab === CRM_BOARD_DRAWER_TABS.Properties && (
        <CustomerPropertyPage customerDimensions={customData?.customerDimensions} />
      )} */}
      {activeTab === CRM_BOARD_DRAWER_TABS.Invoices && <InvoicesPage />}
      {activeTab === CRM_BOARD_DRAWER_TABS.Attachments && (
        <AttachmentsPage attachments={customData?.attachments} />
      )}
      {/* {activeTab === CRM_BOARD_DRAWER_TABS.WEB_ACTIVISTES && <WebActivistes />}
        {activeTab === CRM_BOARD_DRAWER_TABS.CARTS && <Carts />}
        {activeTab === CRM_BOARD_DRAWER_TABS.PURCHASES && <Purchases />}
        {activeTab === CRM_BOARD_DRAWER_TABS.NOTES && <Notes />}
        {activeTab === CRM_BOARD_DRAWER_TABS.TASKS && <Tasks />}
        {activeTab === CRM_BOARD_DRAWER_TABS.CALLS && <Calls />}
        {activeTab === CRM_BOARD_DRAWER_TABS.MEETINGS && <Meetings />}
        {activeTab === CRM_BOARD_DRAWER_TABS.EMAILS && <Emails />} */}
    </>
  );
}

export default MiddleDetails;
