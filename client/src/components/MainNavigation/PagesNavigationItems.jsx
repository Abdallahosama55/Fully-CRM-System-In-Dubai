import ROUTER_URLS from "constants/ROUTER_URLS";
import { Link, NavLink } from "react-router-dom";
const desksItems = [
  {
    id: 1,
    label: "Meeting Desk",
    items: [],
    active: "/desks",
  },
  {
    id: 2,
    label: "Live Chat Desk",
    items: [],
    active: "/desks/live-chat",
  },
  {
    id: 3,
    label: "Ticketing Desk",
    items: [],
    active: "/desks/ticketing-desk",
  },

  {
    id: 5,
    label: "Customer Service Desk",
    items: [],
    active: "/desks/customer-service",
  },
  {
    id: 6,
    label: "Activities",
    items: [],
    active: "/desks/activities",
  },
  {
    id: 7,
    label: "Widget",
    items: [],
    active: "/desks/widget",
  },
];

const dataManagement = [
  {
    id: 1,
    label: "Job titles",
    items: [],
    active: "/data-management/job-titles",
  },
  {
    id: 2,
    label: "Departments",
    items: [],
    active: "/data-management/departments",
  },
  { 
    id: 3,
    label: "Locations",
    items: [
      {
        key: 1,
        label: <NavLink to={"/data-management/locations/countries"}>Countries</NavLink>,
      },
      {
        key: 2,
        label: <NavLink to={"/data-management/locations/states"}>States</NavLink>,
      },
      {
        key: 3,
        label: <NavLink to={"/data-management/locations/cities"}>Cities</NavLink>,
      },
      {
        key: 4,
        label: <NavLink to={"/data-management/locations/areas"}>Areas</NavLink>,
      },
    ],
    active: "/data-management/locations",
  },
  {
    id: 4,
    label: "Service types",
    items: [],
    active: "/data-management/service-types",
  },
  {
    id: 5,
    label: "Labels",
    items: [],
    active: "/data-management/labels",
  },
  {
    id: 6,
    label: "Payment",
    items: [],
    active: "/data-management/payment",
  },
  {
    id: 7,
    label: "Customer Categories",
    items: [],
    active: "/data-management/customer-categories",
  },
  {
    id: 8,
    label: "Flights",
    active: "/data-management/flights",
    items: [
      {
        key: 1,
        label: <NavLink to={"/data-management/flights/airline-companies"}>Airline Companies</NavLink>,
      }, 
      {
        key: 2,
        label: <NavLink to={"/data-management/flights/airports"}>Airports</NavLink>,
      },     
    ],
  },
  {
    id: 9,
    label: "Suppliers",
    items: [],
    active: "/data-management/suppliers",
  },
  {
    id: 10,
    label: "Currency",
    items: [],
    active: "/data-management/currency",
  },{
    id: 11,
    label: "Banks",
    items: [],
    active: "/data-management/banks",
  },
];
const integrationsItems = [
  {
    id: 1,
    label: "Google Analystic",
    items: [],
    active: "/desks/Google-Analystic",
  },
  {
    id: 2,
    label: "Payment Gateway",
    items: [],
    active: "/desks/Payment-Gateway",
  },
  {
    id: 3,
    label: "Shipping",
    items: [],
    active: "shipping",
  },
  {
    id: 4,
    label: "Geine Ai",
    items: [],
    active: "Geine-Ai",
  },
];

const webBuilerItems = [
  {
    id: 1,
    label: "Dashboard",
    items: [],
    active: "/desks/Google-Analystic",
  },
  {
    id: 2,
    label: "Theme Options",
    items: [],
    active: "/desks/Payment-Gateway",
  },
  {
    id: 3,
    label: "Pages",
    items: [],
    active: "shipping",
  },
  {
    id: 4,
    label: "Posts",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 5,
    label: "Media",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 6,
    label: "Comments",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 7,
    label: "Elementor",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 8,
    label: "Templetes",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 9,
    label: "WPForms",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 10,
    label: "Plugins",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 11,
    label: "Sales Chanels",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 12,
    label: "Insights",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 13,
    label: "Compuse Menu",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 14,
    label: "Embedded Widgets",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 15,
    label: "Reports",
    items: [],
    active: "Geine-Ai",
  },
];

const marketingItems = [
  {
    id: 1,
    label: "Mail",
    items: [],
    active: "/desks/Google-Analystic",
  },
  {
    id: 2,
    label: "Affiliate",
    items: [],
    active: "/desks/Payment-Gateway",
  },
  {
    id: 3,
    label: "Coupons",
    items: [],
    active: "shipping",
  },
  {
    id: 4,
    label: "Loyality Program",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 5,
    label: "Plans",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 6,
    label: "Reports",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 7,
    label: "Integrations",
    items: [],
    active: "Geine-Ai",
  },
];

const CRMItems = [
  {
    id: 1,
    label: "Dashboard",
    items: [],
    active: "/desks/Google-Analystic",
  },
  {
    id: 2,
    label: "Leads",
    items: [],
    active: "/desks/Payment-Gateway",
  },
  {
    id: 3,
    label: "Deals",
    items: [],
    active: "shipping",
  },
  {
    id: 4,
    label: "Feed",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 5,
    label: "Customers",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 6,
    label: "Opportunities",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 7,
    label: "Manage Mission",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 8,
    label: "Timesheet",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 9,
    label: "Budgets",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 10,
    label: "Calender",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 11,
    label: "Messages",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 12,
    label: "Invoices",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 13,
    label: "Quates",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 14,
    label: "Analtics",
    items: [],
    active: "Geine-Ai",
  },
];

const inventoryItems = [
  {
    id: 1,
    label: "Products",
    items: [],
    active: "/inventory/products",
  },
  // {
  //   id: 2,
  //   label: "Inventory Managements",
  //   items: [],
  //   active: "/desks/Payment-Gateway",
  // },
  {
    id: 3,
    label: "Orders",
    items: [],
    active: "/inventory/orders",
  },
  {
    id: 4,
    label: "Categories",
    items: [],
    active: "/inventory/categoreis",
  },
  {
    id: 5,
    label: "Brands",
    items: [],
    active: "/inventory/brands",
  },
  {
    id: 6,
    label: "Warehouses",
    items: [],
    active: "/inventory/warehouse",
  },
];

const collaborationItems = [
  {
    id: 1,
    label: "Meetings",
    items: [],
    active: "/collaboration/meeting-query",
  },
  {
    id: 2,
    label: "Projects ",
    items: [],
    active: "/collaboration/rojects",
  },
  {
    id: 3,
    label: "Tasks",
    items: [],
    active: "/collaboration/tasks",
  },
  {
    id: 4,
    label: "Chat And Calls",
    items: [],
    active: "/collaboration/chat-and-calls",
  },
  {
    id: 5,
    label: "Timesheet ",
    items: [],
    active: "/collaboration/timesheet",
  },
  {
    id: 6,
    label: "Work Groups",
    items: [],
    active: "/collaboration/work-groups",
  },
  {
    id: 7,
    label: "Company Calendar",
    items: [],
    active: "/collaboration/Company-calendar",
  },
  {
    id: 8,
    label: "Work Groups",
    items: [],
    active: "/collaboration/work-groups",
  },
  {
    id: 9,
    label: "Online Documents",
    items: [],
    active: "/collaboration/online-documents",
  },
  {
    id: 10,
    label: "Vindo Drive",
    items: [],
    active: "/collaboration/vindo-drive",
  },
  {
    id: 11,
    label: "Web-Mail",
    items: [],
    active: "/collaboration/web-mail",
  },
  {
    id: 12,
    label: "Reports",
    items: [],
    active: "/collaboration/reports",
  },
  {
    id: 13,
    label: "Whiteboard",
    items: [],
    active: "/collaboration/whiteboard",
  },
];

const eventsItems = [
  {
    id: 1,
    label: "Events",
    items: [],
    active: "/desks/Google-Analystic",
  },
  {
    id: 2,
    label: "Exhibitions",
    items: [],
    active: "/desks/Payment-Gateway",
  },
  {
    id: 3,
    label: "Productions",
    items: [],
    active: "shipping",
  },
  {
    id: 4,
    label: "Lives Streams",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 5,
    label: "Back Stage",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 6,
    label: "Event Website",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 7,
    label: "Agenda Builder",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 8,
    label: "Branding and Customization",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 9,
    label: "CRM Events",
    items: [],
    active: "Geine-Ai",
  },
  {
    id: 10,
    label: "Webcasting Services",
    items: [],
    active: "Geine-Ai",
  },
];

const employeeItems = [
  {
    id: 1,
    label: "Hr Management",
    items: [
      {
        key: 1,
        label: <Link to={"/employee/hr-management"}>Dashboard</Link>,
      },
      {
        key: 2,
        label: <Link to={"/employee/employee-query"}>Employee Euery</Link>,
      },
      {
        key: 3,
        label: <Link to={"/employee/add-customer"}>Working Times</Link>,
      },
      {
        key: 4,
        label: <Link to={"/employee/add-customer"}>Permissions </Link>,
      },
      {
        key: 5,
        label: <Link to={"/employee/hr-management"}>Leaves And Attendance</Link>,
      },
      {
        key: 6,
        label: <Link to={"/employee/add-customer"}>Payroll </Link>,
      },
      {
        key: 7,
        label: <Link to={"/employee/add-customer"}>Circulars </Link>,
      },
      {
        key: 8,
        label: <Link to={"/employee/add-customer"}>Requests </Link>,
      },
      {
        key: 9,
        label: <Link to={"/employee/add-customer"}>Administrative </Link>,
      },
      {
        key: 10,
        label: <Link to={"/employee/add-customer"}>Instructions </Link>,
      },
      {
        key: 11,
        label: <Link to={"/employee/add-customer"}> Employees Daily </Link>,
      },
      {
        key: 12,
        label: <Link to={"/employee/add-customer"}> Achievements </Link>,
      },
    ],
    active: "/employee/hr-management",
  },
  {
    id: 2,
    label: "Finanace Management",
    items: [
      {
        key: 1,
        label: <Link to={"/employee/finanace-query"}>Revenut managemet</Link>,
      },
      {
        key: 2,
        label: <Link to={"/employee/create-customer-accounts"}>Payment Processing</Link>,
      },
      {
        key: 3,
        label: <Link to={"/employee/add-customer"}>Finanical statements</Link>,
      },
      {
        key: 4,
        label: <Link to={"/employee/add-customer"}>Tax managements</Link>,
      },
      {
        key: 5,
        label: <Link to={"/employee/add-customer"}>Expenses tracking</Link>,
      },
      {
        key: 6,
        label: <Link to={"/employee/add-customer"}>Finanical intergration</Link>,
      },
      {
        key: 7,
        label: <Link to={"/employee/add-customer"}>Sales reports</Link>,
      },
      {
        key: 8,
        label: <Link to={"/employee/add-customer"}>Sttings</Link>,
      },
    ],
    active: "/employee/finanace-query",
  },
  {
    id: 3,
    label: "Company Structure",
    items: [],
    active: "/employee/management/leads",
  },

  {
    id: 5,
    label: "Pipelines",
    items: [],
    active: "/employee/management-piplines",
  },

  {
    id: 6,
    label: "Leads",
    items: [],
    active: "/employee/management/leads",
  },
  {
    id: 7,
    label: "Add Employee",
    items: [],
    active: ROUTER_URLS.EMPLOYEE.ADD,
  },

  {
    id: 8,
    label: "Customers",
    items: [
      {
        key: 1,
        label: <Link to={"/employee/management-customers"}>Customers</Link>,
      },
      {
        key: 2,
        label: <Link to={"/employee/create-customer-accounts"}>Create Customer Accounts</Link>,
      },
      {
        key: 3,
        label: <Link to={"/employee/add-customer"}>Add Customer</Link>,
      },
    ],
    active: "/employee/management-customers",
  },
];

const metaverseItems = [
  {
    id: 1,
    label: "Verses",
    items: [],
    active: "/metaverse/verses",
  },
  {
    id: 5,
    label: "Slider",
    items: [],
    active: "slider",
  },
  // {
  //   id: 2,
  //   label: "Media",
  //   items: [],
  //   active: "/media",
  // },
  // {
  //   id: 3,
  //   label: "Library",
  //   items: [],
  //   active: "/library",
  // },
  // {
  //   id: 4,
  //   label: "Widget",
  //   items: [],
  //   active: "/widget",
  // },
];

export {
  desksItems,
  employeeItems,
  metaverseItems,
  integrationsItems,
  webBuilerItems,
  marketingItems,
  CRMItems,
  inventoryItems,
  collaborationItems,
  eventsItems,
  dataManagement,
};
