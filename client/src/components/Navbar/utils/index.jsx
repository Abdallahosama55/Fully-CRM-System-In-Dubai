import SUBSCRIPTION_TYPES from "constants/SUBSCRIPTION_TYPES";
import { Row } from "antd";
import { Link } from "react-router-dom";
// icons && images
import {
  DashboardSVG,
  HelpDesk3SVG,
  Events2SVG,
  CollaborationSVG2,
  CRMSVG2,
  IntegrationsSVG,
  Inventory2SVG,
  Management2SVG,
  Marketing2SVG,
  Metaverse2SVG,
  Settings2SVG,
  WebBuilderSVG,
  VindoDeskSVG,
} from "assets/jsx-svg";
import ROUTER_URLS from "constants/ROUTER_URLS";
function getItem(label, key, icon, children) {
  return {
    key,
    icon: <Row align="middle">{icon}</Row>,
    children: children?.map((el) => {
      if (el.key.includes("/")) {
        return {
          key: el.key,
          label: <Link to={el.key}>{el.label}</Link>,
        };
      }
      return el;
    }),
    label: key.includes("/") ? <Link to={key}>{label}</Link> : label,
  };
}

export const getMenuItems = (SubscriptionType) => {
  switch (SubscriptionType) {
    case SUBSCRIPTION_TYPES.DEFAULT:
      return [
        getItem("Dashboasd", "/", <DashboardSVG />),
        getItem("Help Desk", "/desks", <HelpDesk3SVG />, [
          {
            key: ROUTER_URLS.DESKS.INDEX,
            label: "Meeting Desk",
          },
          {
            key: ROUTER_URLS.DESKS.LIVE_CHAT,
            label: "Live Chat Desk",
          },
          {
            key: ROUTER_URLS.DESKS.TICKETING_DESK,
            label: "Ticketing Desk",
          },
          {
            key: ROUTER_URLS.DESKS.CUSTOMER_SERVICE,
            label: "Customer Service Desk",
          },
          // {
          //   key: ROUTER_URLS.DESKS.ACTIVITIES,
          //   label: "Activities",
          // },
          {
            key: ROUTER_URLS.DESKS.WIDGET,
            label: "Widget",
          },
        ]),
        // getItem("Events", "/events", <Image preview={false} src={date} />),
        getItem("Collaboration", "/collaboration/meeting-query", <CollaborationSVG2 />),
        getItem("Inventory", "", <Inventory2SVG id={3} />, [
          getItem("Products", "/inventory/products"),
          getItem("Inventory Managements", "/desks/Payment-Gateway"),
          getItem("Orders", "/inventory/orders"),
          getItem("Categories", "/inventory/categoreis"),
          getItem("Brands", "/inventory/brands"),
          getItem("Warehouses", "/inventory/warehouse"),
        ]),
        getItem("Contacts", "/customers", <Management2SVG />),
        getItem("Employees", "/employees", <Management2SVG />),

        // getItem("CRM", "/CRM", <CRMSVG2 />),
        getItem("Metaverse", "/metaverse/verses", <Metaverse2SVG />),
        getItem("Projects", "/verses/projects", <Metaverse2SVG />),

        // getItem("Marketing", "/marketing", <Marketing2SVG/>),
        // getItem("Web Builder", "/web-builder", <WebBuilderSVG/>),
        // getItem("Integrations", "/integrations", <IntegrationsSVG />),
        getItem("Settings", "5", <Settings2SVG />, [
          {
            key: "/settings/job-titles",
            label: "Job Titles",
          },
          {
            key: "/settings/departements",
            label: "Departements",
          },
          getItem("Locations", "7", null, [
            {
              key: "/settings/countries",
              label: "Countries",
            },
            {
              key: "/settings/states",
              label: "States",
            },
            {
              key: "/settings/cities",
              label: "Cities",
            },
          ]),

          {
            key: "/settings/service-types",
            label: "Service Types",
          },
        ]),
        getItem("Config", "8", <Settings2SVG />, [
          {
            key: "/config/email-setting",
            label: "Email Settings",
          },
        ]),
        getItem("Virtual studio", "/virtual-studio", <Settings2SVG />, [
          {
            key: "/virtual-studio/events",
            label: "Events",
          },
        ]),
        getItem("CRM", "10", <Settings2SVG />, [
          {
            key: "/crm/management-piplines",
            label: "Pipelines",
          },
          {
            key: "/crm/management/leads",
            label: "Leads",
          },
        ]),
      ];
    case SUBSCRIPTION_TYPES.TRAVEL:
      return [
        getItem("Dashboard", "/", <DashboardSVG />),
        getItem("Metaverse", "/metaverse/verses", <Metaverse2SVG />),
        getItem("Collaboration", "/collaboration/meeting-query", <CollaborationSVG2 />),
        getItem("Experiences Inventory", "/inventory/experiences", <CollaborationSVG2 />),
        getItem("Hotels Extra Net", ROUTER_URLS.TRAVEL.ACCOMMODATION.HOME, <CollaborationSVG2 />, [
          {
            key: ROUTER_URLS.TRAVEL.ACCOMMODATION.HOME,
            label: "Manage Hotels",
          }
        ]),
        getItem("Transfers", ROUTER_URLS.TRAVEL.TRANSFERS.INDEX, <CollaborationSVG2 />),
        getItem("Online Booking", ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING, <CollaborationSVG2 />),
        getItem("Sales Tools", ROUTER_URLS.TRAVEL.SALES_TOOLS.INDEX, <CollaborationSVG2 />),
      ];
    default:
      return [
        getItem("Dashboard", "/", <DashboardSVG />),
        getItem("Vindo Desk (Vindo)", "/desks/desk-query", <VindoDeskSVG />),
        getItem("Events", "3", <Events2SVG />),
        getItem("Collaboration", "4", <CollaborationSVG2 />),
        getItem("Inventory", "5", <Inventory2SVG id={4} />),
        getItem("Management", "/employee/employee-query", <Management2SVG />),
        getItem("CRM", "/employee/management/leads", <CRMSVG2 />),
        getItem("Metaverse", "/metaverse/verses", <Metaverse2SVG />),
        getItem("Marketing", "9", <Marketing2SVG />),
        getItem("Website", "10", <WebBuilderSVG />),
        getItem("Settings", "/settings/store", <Settings2SVG />),
        // getItem("AI Bot", "12", <AiSVG />),
      ];
  }
};
