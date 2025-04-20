import SUBSCRIPTION_TYPES from "constants/SUBSCRIPTION_TYPES";
import { Row } from "antd";
import { Link } from "react-router-dom";
// icons && images
import ROUTER_URLS from "constants/ROUTER_URLS";
import inventory from "assets/images/inventory.png";
import {
  DashboardSVG,
  HelpDesk3SVG,
  CollaborationSVG2,
  Management2SVG,
  Metaverse2SVG,
  Settings2SVG,
  CRMSVG2,
  EngagementsSVG,
  EventSVG2,
  OnlineBookingSVG,
  HotelsExtraNetSVG,
  ExperiencesInventorySVG,
  CarSVG,
} from "assets/jsx-svg";
import flights from "assets/images/flights.png";

function getItem(label, key, icon, children) {
  return {
    key,
    id: label,
    icon: <Row align="middle">{icon}</Row>,
    children: children?.map((el) => {
      if (el.key.includes("/")) {
        return {
          key: el.key,
          id: el?.id ?? el.label,
          label: (
            <Link unstable_viewTransition to={el.key}>
              {el.label}
            </Link>
          ),
        };
      }
      return { ...el, id: el?.label };
    }),
    label: key.includes("/") ? (
      <Link unstable_viewTransition to={key}>
        {label}
      </Link>
    ) : (
      label
    ),
  };
}
const CRM_MENU = [
  getItem("Dashboard", "/", <DashboardSVG />),
  getItem("Help Desk", "DESKS", <HelpDesk3SVG />, [
    {
      key: ROUTER_URLS.DESKS.INDEX,
      label: "Schedule Desk",
    },
    {
      key: ROUTER_URLS.DESKS.CUSTOMER_SERVICE,
      label: "Customer Service Desk",
    },
    {
      key: ROUTER_URLS.DESKS.LIVE_CHAT,
      label: "Live Chat Desk",
    },
    {
      key: ROUTER_URLS.DESKS.TICKETING_DESK,
      label: "Ticketing Desk",
    },
  ]),
  getItem("Metaverse", ROUTER_URLS.METAVERSE.INDEX, <Metaverse2SVG />),

  getItem("Meetings", ROUTER_URLS.MEETING, <CollaborationSVG2 />),
  getItem(
    "Inventory",
    "INVENTORY",
    <img src={inventory} style={{ width: "20px", height: "20px" }} />,
    [
      {
        key: ROUTER_URLS.INVENTORY.PRODUCTS,
        label: "Products",
      },
      {
        key: ROUTER_URLS.INVENTORY.ORDERS,
        label: "Orders",
      },
      {
        key: ROUTER_URLS.INVENTORY.CATEGORIES,
        label: "Categories",
      },
      {
        key: ROUTER_URLS.INVENTORY.BRANDS,
        label: "Brands",
      },
      {
        key: ROUTER_URLS.INVENTORY.WAREHOUSES,
        label: "Warehouses",
      },
    ],
  ),
  getItem("CRM", "CRM", <CRMSVG2 />, [
    {
      label: "Contacts",
      key: ROUTER_URLS.CRM.CONTACTS,
    },

    {
      label: "Companies",
      key: ROUTER_URLS.CRM.Companies,
    },
    // {
    //   key: ROUTER_URLS.CRM.PIPELINES_SETTINGS,
    //   label: "Pipelines Settings",
    // },
    {
      key: ROUTER_URLS.CRM.PIPELINES,
      label: "Pipelines",
    },
  ]),
  getItem("Employees", ROUTER_URLS.EMPLOYEES, <Management2SVG />),
  getItem("Engagements", "", <EngagementsSVG />, [
    { key: ROUTER_URLS.ENGAGEMENTS.COLLABORATION_WIDGET, label: "Widget" },
    {
      key: ROUTER_URLS.ENGAGEMENTS.SLIDER_WIDGET,
      label: "Virtual Portal",
    },
  ]),
  getItem("Event", ROUTER_URLS.EVENT.INDEX, <EventSVG2 />),
  getItem("Configure", "CONFIGURE", <Settings2SVG></Settings2SVG>, [
    {
      label: "Settings",
      key: ROUTER_URLS.CONFIGURE.SETTINGS,
    },
    {
      label: "Data management",
      key: ROUTER_URLS.CONFIGURE.DATA_MANAGEMENT,
    },
  ]),
  // getItem("Settings", "6", <Settings2SVG />, [
  //   {
  //     key: "/settings/job-titles",
  //     label: "Job Titles",
  //   },
  //   {
  //     key: "/settings/departements",
  //     label: "Departements",
  //   },
  //   getItem("Locations", "7", null, [
  //     {
  //       key: "/settings/countries",
  //       label: "Countries",
  //     },
  //     {
  //       key: "/settings/states",
  //       label: "States",
  //     },
  //     {
  //       key: "/settings/cities",
  //       label: "Cities",
  //     },
  //   ]),
  //   {
  //     key: "/settings/service-types",
  //     label: "Service Types",
  //   },
  //   {
  //     key: "/settings/labels",
  //     label: "Labels",
  //   },
  // ]),
  // getItem("Config", "8", <Settings2SVG />, [
  //   {
  //     key: "/config/email-setting",
  //     label: "Email Settings",
  //   },
  // ]),
  // getItem("Virtual studio", "/virtual-studio", <Settings2SVG />),
];
const TRAVEL_MENU = [
  getItem("Experiences Inventory", "experiences", <ExperiencesInventorySVG />, [
    {
      key: "/experiences",
      label: "Experiences Overview",
    },
  ]),
  getItem("Hotels Extra Net", "hotels", <HotelsExtraNetSVG />, [
    {
      key: ROUTER_URLS.TRAVEL.ACCOMMODATION.HOME,
      label: "Manage Hotels",
    },
  ]),
  getItem("Transfers", "/transfer", <CarSVG />),
  getItem("Flights", "flights", <img src={flights} alt="flight_icon" />, [
    {
      key: ROUTER_URLS.TRAVEL.FLIGHTS.CHARTERS,
      label: "Charters",
      id: "Charter",
    },
  ]),
  getItem("Online Booking", "bookings", <OnlineBookingSVG />, [
    {
      key: "/bookings",
      label: "Bookings",
    },
    {
      key: "/bookings/online-booking",
      label: "Online Booking",
    },
  ]),
];
export const getMenuItems = (SubscriptionType) => {
  switch (SubscriptionType) {
    case SUBSCRIPTION_TYPES.DEFAULT:
      return CRM_MENU;
    case SUBSCRIPTION_TYPES.TRAVEL:
      return [...CRM_MENU, ...TRAVEL_MENU];
    default:
      return [...CRM_MENU, ...TRAVEL_MENU];
  }
};