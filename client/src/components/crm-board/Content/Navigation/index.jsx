import { useMemo } from "react";
// constants
import { CRM_BOARD_DRAWER_TABS } from "../index";

// icons
import { CallSVG, EmailsSVG, MeetingsSVG, NotesSVG, TasksSVG } from "assets/jsx-svg";

// style
import "./styles.css";
import PropertiesSVG from "assets/jsx-svg/PropertiesSVG";

function Navigation({ activeTab, setActiveTab, navItemsIn }) {
  const defaultItems = useMemo(
    () => [
      { id: CRM_BOARD_DRAWER_TABS.TASKS, icon: TasksSVG, lable: "Tasks" },
      { id: CRM_BOARD_DRAWER_TABS.NOTES, icon: NotesSVG, lable: "Notes" },
      { id: CRM_BOARD_DRAWER_TABS.EMAILS, icon: EmailsSVG, lable: "Emails" },
      { id: CRM_BOARD_DRAWER_TABS.CALLS, icon: CallSVG, lable: "Calls" },
      {
        id: CRM_BOARD_DRAWER_TABS.MEETINGS,
        icon: MeetingsSVG,
        lable: "Meetings",
      },
      {
        id: CRM_BOARD_DRAWER_TABS.PROPERTIES,
        icon: PropertiesSVG,
        lable: "Properties",
      },
      // {
      //   id: CRM_BOARD_DRAWER_TABS.WEB_ACTIVISTES,
      //   icon: WebActivistesSVG,
      //   lable: "Web Activistes",
      // },
      // {
      //   id: CRM_BOARD_DRAWER_TABS.METAVERSE_ACTIVISTES,
      //   icon: MetaverseActivistesSVG,
      //   lable: "Metaverse Activistes",
      // },
      // { id: CRM_BOARD_DRAWER_TABS.CARTS, icon: CartsSVG, lable: "Carts" },
      // {
      //   id: CRM_BOARD_DRAWER_TABS.PURCHASES,
      //   icon: PurchasesSVG,
      //   lable: "Purchases",
      // },
    ],
    [],
  );
  return (
    <div className="top-nav">
      {(navItemsIn || defaultItems).map((item) => (
        <div
          onClick={() => setActiveTab(item.id)}
          key={item.id}
          className={`nav-item ${activeTab === item.id ? "active" : ""}`}>
          {item?.icon && <item.icon width="16px" height="15px" />}
          <div>{item.lable}</div>
        </div>
      ))}
    </div>
  );
}

export default Navigation;
