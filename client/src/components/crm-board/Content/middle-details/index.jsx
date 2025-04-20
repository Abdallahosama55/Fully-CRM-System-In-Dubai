// components
import MetaverseActivistes from "./Tabs/metaverse-activistes";
import WebActivistes from "./Tabs/web-activistes";
import Carts from "./Tabs/carts";
import Purchases from "./Tabs/Purchases";
import Calls from "./Tabs/Calls";
import Meetings from "./Tabs/Mettings";
import Properties from "./Tabs/Properties";
import Notes from "./Tabs/Notes";
import Tasks from "./Tabs/Tasks";
import Emails from "./Tabs/emails";
// constants
import { CRM_BOARD_DRAWER_TABS } from "../index";
// style
import "./styles.css";

function MiddleDetails({ activeTab }) {
  return (
    <div className="content">
      <div>
        {activeTab === CRM_BOARD_DRAWER_TABS.METAVERSE_ACTIVISTES && <MetaverseActivistes />}
        {activeTab === CRM_BOARD_DRAWER_TABS.WEB_ACTIVISTES && <WebActivistes />}
        {activeTab === CRM_BOARD_DRAWER_TABS.CARTS && <Carts />}
        {activeTab === CRM_BOARD_DRAWER_TABS.PURCHASES && <Purchases />}
        {activeTab === CRM_BOARD_DRAWER_TABS.NOTES && <Notes />}
        {activeTab === CRM_BOARD_DRAWER_TABS.TASKS && <Tasks />}
        {activeTab === CRM_BOARD_DRAWER_TABS.CALLS && <Calls />}
        {activeTab === CRM_BOARD_DRAWER_TABS.MEETINGS && <Meetings />}
        {activeTab === CRM_BOARD_DRAWER_TABS.PROPERTIES && <Properties />}
        {activeTab === CRM_BOARD_DRAWER_TABS.EMAILS && <Emails />}
      </div>
    </div>
  );
}

export default MiddleDetails;
