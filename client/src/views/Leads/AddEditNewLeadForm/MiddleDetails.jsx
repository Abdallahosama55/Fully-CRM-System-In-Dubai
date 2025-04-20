// constants
import Activity from "views/Customers/ViewCustomer/Components/Activity";
import PortalDetailsPage from "views/Customers/ViewCustomer/Components/NewStyleComponents/NavigationPages/PortalDetailsPage";
import "views/Customers/ViewCustomer/Components/NewStyleComponents/middleDetailsStyle.css";
import { LEAD_BOARD_DRAWER_TABS } from "./LeadContent";

function MiddleDetails({ activeTab, customerId, CustomerData, leadId }) {
  return (
    <>
      {activeTab === LEAD_BOARD_DRAWER_TABS.PORTAL_DETAILS && (
        <PortalDetailsPage leadId={leadId} customerId={customerId} />
      )}
      {activeTab === LEAD_BOARD_DRAWER_TABS.ACTIVITY && (
        <Activity CustomerData={CustomerData} customerId={customerId} leadId={leadId} />
      )}
    </>
  );
}

export default MiddleDetails;
