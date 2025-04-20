// import { lazy } from "react";
// import ROUTER_URLS from "constants/ROUTER_URLS";
// import SUBSCRIPTION_TYPES from "constants/SUBSCRIPTION_TYPES";
// import Meetings from "views/Collaboration/CallsAndMeetingsCalendar";
// import SliderPreview from "views/SliderPreview";
// import ViewOrderMain from "views/Orders/ViewOrders";
// import Settings from "views/Settings";
// import Payment from "views/Settings/payment";
// import DesksWidget from "views/Desks/DeskWidget";
// import DeskActivities from "views/Desks/DeskActivities";
// import MeetingDesk from "views/Desks/CreateDesk/MeetingDesk";
// import TicketingDesk from "views/Desks/TicketingDesk";

// import LiveChat from "views/Desks/LiveChat";

// // PAGES
// // DEFAULT
// const CallsAndMeetingsQuery = lazy(() => import("views/Collaboration/CallsAndMeetingsQuery"));
// const ViewCategories = lazy(() => import("views/Inventory/Categoreis/ViewCategories"));
// const Categoreis = lazy(() => import("views/Inventory/Categoreis"));
// const Products = lazy(() => import("views/Inventory/Products/ProductView/index"));
// const ViewBrands = lazy(() => import("views/Inventory/Brand/ViewBrands"));
// const Brands = lazy(() => import("views/Inventory/Brand"));
// const Warehouse = lazy(() => import("views/Inventory/Warehouse"));
// const ViewWarehouses = lazy(() => import("views/Inventory/Warehouse/ViewWarehouses"));
// const AddCustomer = lazy(() => import("views/Employees/Customers/AddCustomer"));
// const CustomerAccounts = lazy(() => import("views/Employees/Customers/CustomersInfo"));
// const EmployeesCustomers = lazy(() => import("views/Employees/Customers/CustomersInfo"));
// const Piplines = lazy(() => import("views/Piplines"));
// const AddTicket = lazy(() => import("views/Desks/TicketingDesk/AddTicket"));
// const SliderView = lazy(() => import("views/Slider"));
// const CreateDisk = lazy(() => import("views/Desks/CreateDesk"));
// const DeskInformation = lazy(() => import("views/Desks/DeskInformation"));
// const MetaverseView = lazy(() => import("views/Metaverse"));
// const MetaverseGameView = lazy(() => import("views/MetaverseGame"));
// const MetaverseWordpress = lazy(() => import("views/MetaverseWordpress"));
// const UserTicket = lazy(() => import("views/UserTicket"));
// const HomeView = lazy(() => import("views/Home"));
// const EditEmployee = lazy(() => import("views/Employees/EditEmployee"));
// const EmployeesQuery = lazy(() => import("views/Employees/EmployeesQuery"));
// const HrManagement = lazy(() => import("views/Employees/hr-Mangagment"));
// const Lead = lazy(() => import("views/Leads"));
// const TicketView = lazy(() => import("views/HelpDesk/TicketView"));
// const EmployeeInformation = lazy(() => import("views/Employees/EmployeeInformation"));
// const TimeOffManagement = lazy(() => import("views/TimeManagement/AddTimeManagement"));
// const VirtualSupportView = lazy(() => import("views/VirtualSupport"));
// const Calendar = lazy(() => import("components/Calendar"));
// const NewCompanyQuestions = lazy(() => import("views/NewCompanyQuestions"));
// const WebBuilder = lazy(() => import("views/WebBuilder"));
// const WebBuilderPreview = lazy(() => import("views/WebBuilderPreview"));
// const Meeting = lazy(() => import("views/Meeting"));
// // travel
// const ManageHotels = lazy(() => import("views/travel/ManageHotels"));
// const ManageContract = lazy(() => import("views/travel/ManageContract"));
// const PromoCode = lazy(() => import("views/travel/PromoCode"));
// const Availablity = lazy(() => import("views/travel/Availablity"));
// const Extra = lazy(() => import("views/travel/Extra"));
// const Orders = lazy(() => import("views/Orders/OrdersView"));
// const JobTitles = lazy(() => import("views/NewSettings/JobTitles/JobTitles"));
// const Departements = lazy(() => import("views/NewSettings/Departements/Departements"));
// const Countries = lazy(() => import("views/NewSettings/Countries/Countries"));
// const Labels = lazy(() => import("views/NewSettings/Labels/Labels"));
// const ServiceTypes = lazy(() => import("views/NewSettings/ServiceTypes/ServiceTypes"));
// const States = lazy(() => import("views/NewSettings/States/States"));
// const Cities = lazy(() => import("views/NewSettings/Cities/Cities"));
// const Employees = lazy(() => import("views/Management/hr-management/Employees/Employees"));
// const ViewEmployee = lazy(() => import("views/Management/hr-management/ViewEmployee/ViewEmployee"));
// const VerseProjects = lazy(() => import("views/Projects/VerseProjects"));
// const VersesOfProject = lazy(() => import("views/Projects/VersesOfProject"));
// const Customers = lazy(() => import("views/Customers/Overview"));
// const ViewCustomer = lazy(() => import("views/Customers/ViewCustomer/ViewCustomer"));
// const EmailSetting = lazy(() => import("views/EmailSetting/Index"));
// export const getRouterData = (subscriptionType, payload) => {
//   switch (subscriptionType) {
//     case SUBSCRIPTION_TYPES.TRAVEL:
//       return [
//         {
//           link: "/",
//           page: <HomeView />,
//         },
//         {
//           link: "/new-company-questions",
//           page: <NewCompanyQuestions />,
//         },
//         {
//           link: "/collaboration/meeting-query",
//           page: <CallsAndMeetingsQuery />,
//         },
//         {
//           link: "/metaverse/:dimId",
//           page: <MetaverseGameView />,
//         },
//         {
//           link: "/metaverse-wordpress/:dimId",
//           page: <MetaverseWordpress />,
//         },
//         {
//           link: "/metaverse/verses",
//           page: <MetaverseView />,
//         },
//         {
//           link: "/slider",
//           page: <SliderView />,
//         },
//         {
//           link: "/slider/:id",
//           page: <SliderPreview />,
//         },
//         {
//           link: "/settings/payment",
//           page: <Payment />,
//         },
//         {
//           link: "/calendar",
//           page: <Calendar />,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.HOTELS.MANAGE,
//           page: <ManageHotels />,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.HOTELS.MANAGE_CONTRACT,
//           page: <ManageContract />,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.HOTELS.PROMO_CODE,
//           page: <PromoCode />,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.HOTELS.AVAILABILITY,
//           page: <Availablity />,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.HOTELS.EXTRA,
//           page: <Extra />,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.SALES_TOOLS.INDEX,
//           page: <>SALES_TOOLS</>,
//         },
//         {
//           link: ROUTER_URLS.TRAVEL.TRANSFERS.INDEX,
//           page: <>TRANSFERS</>,
//         },
//       ];
//     default:
//       return [
//         {
//           link: "/",
//           page: <HomeView />,
//         },
//         {
//           link: "/new-company-questions",
//           page: <NewCompanyQuestions />,
//         },
//         {
//           link: "/desks",
//           page: <MeetingDesk />,
//         },
//         {
//           link: "/desks/create-desk",
//           page: <CreateDisk collapsed={payload.collapsed} />,
//         },
//         {
//           link: "/desks/edit-desk/:id",
//           page: <CreateDisk collapsed={payload.collapsed} />,
//         },
//         {
//           link: "/desks/activities",
//           page: <DeskActivities />,
//         },
//         {
//           link: "/inventory/orders",
//           page: <Orders />,
//         },
//         {
//           link: "/inventory/order/:id",
//           page: <ViewOrderMain />,
//         },
//         {
//           link: "/desks/widget",
//           page: <DesksWidget collapsed={payload.collapsed} />,
//         },
//         {
//           link: "/desks/desk-info/:id",
//           page: <DeskInformation />,
//         },
//         {
//           link: "/desks/live-chat",
//           page: <LiveChat isHelpDesk={payload.isHelpDesk} />,
//         },
//         {
//           link: "/desks/ticketing-desk",
//           page: <TicketingDesk />,
//         },
//         {
//           link: "/desks/ticket-view/:id",
//           page: <TicketView isHelpDesk={payload.isHelpDesk} />,
//         },
//         {
//           link: "/desks/ticketing-desk/add-ticket",
//           page: <AddTicket />,
//         },
//         {
//           link: "/metaverse/:dimId",
//           page: <MetaverseGameView />,
//         },
//         {
//           link: "/desks/customer-service",
//           page: <MeetingDesk collapsed={payload.collapsed} />,
//         },
//         {
//           link: "/metaverse-wordpress/:dimId",
//           page: <MetaverseWordpress />,
//         },
//         {
//           link: "/calendar",
//           page: <Calendar />,
//         },
//         {
//           link: "/slider",
//           page: <SliderView />,
//         },
//         {
//           link: "/slider/:id",
//           page: <SliderPreview />,
//         },
//         {
//           link: "/crm/management/leads",
//           page: <Lead />,
//         },
//         {
//           link: "/employee/employee-query",
//           page: <EmployeesQuery />,
//         },
//         {
//           link: "/crm/management-piplines",
//           page: <Piplines />,
//         },
//         {
//           link: "/employee/management-customers",
//           page: <EmployeesCustomers />,
//         },
//         {
//           link: "/employee/create-customer-accounts",
//           page: <CustomerAccounts />,
//         },
//         {
//           link: "/employee/add-customer",
//           page: <AddCustomer />,
//         },
//         {
//           link: "/employee/hr-management",
//           page: <HrManagement />,
//         },
//         {
//           link: ROUTER_URLS.EMPLOYEE.INDEX + ":id",
//           page: <EmployeeInformation />,
//         },
//         {
//           link: ROUTER_URLS.EMPLOYEE.ADD,
//           page: <EditEmployee />,
//         },
//         {
//           link: ROUTER_URLS.EMPLOYEE.EDIT + ":id",
//           page: <EditEmployee />,
//         },
//         {
//           link: "/metaverse/verses",
//           page: <MetaverseView />,
//         },
//         {
//           link: "/ticket/:id",
//           page: <UserTicket />,
//         },
//         {
//           link: "/time-off-management",
//           page: <TimeOffManagement />,
//         },
//         {
//           link: "/booked-meeting/:meetingId",
//           page: <VirtualSupportView />,
//         },
//         {
//           link: "/direct-call/:meetingId",
//           page: <VirtualSupportView />,
//         },
//         {
//           link: "/integrations",
//           page: <></>,
//         },
//         {
//           link: "/settings/store",
//           page: <Settings />,
//         },
//         {
//           link: "/web-builder",
//           page: <TicketingDesk />,
//         },
//         {
//           link: "/marketing",
//           page: <EmployeesQuery />,
//         },
//         {
//           link: "/CRM",
//           page: <Lead />,
//         },
//         {
//           link: "/Meeting",
//           page: <Meeting />,
//         },
//         {
//           link: "/inventory",
//           page: <SliderView />,
//         },
//         {
//           link: "/inventory/warehouse",
//           page: <Warehouse />,
//         },
//         {
//           link: "/inventory/warehouse/warehouse-inf/:id",
//           page: <ViewWarehouses />,
//         },
//         {
//           link: "/inventory/brands",
//           page: <Brands />,
//         },
//         {
//           link: "/inventory/brands/brands-info/:id",
//           page: <ViewBrands />,
//         },
//         {
//           link: "/inventory/products",
//           page: <Products />,
//         },
//         {
//           link: "/inventory/categoreis",
//           page: <Categoreis />,
//         },
//         {
//           link: "/inventory/categoreis/categoreis-info/:id",
//           page: <ViewCategories />,
//         },
//         {
//           link: "/collaboration/meeting-query",
//           page: <Meetings />,
//         },
//         {
//           link: "/events",
//           page: <SliderView />,
//         },
//         {
//           link: ROUTER_URLS.PAGES.ADD,
//           page: <WebBuilder />,
//         },
//         {
//           link: ROUTER_URLS.WEB_BUILDER.PREVIEW,
//           page: <WebBuilderPreview />,
//         },
//         {
//           link: "/settings/job-titles",
//           page: <JobTitles />,
//         },
//         {
//           link: "/settings/departements",
//           page: <Departements />,
//         },
//         {
//           link: "/settings/countries",
//           page: <Countries />,
//         },
//         {
//           link: "/settings/service-types",
//           page: <ServiceTypes />,
//         },
//         {
//           link: "/settings/labels",
//           page: <Labels />,
//         },
//         {
//           link: "/settings/states",
//           page: <States />,
//         },
//         {
//           link: "/settings/cities",
//           page: <Cities />,
//         },
//         {
//           link: "/Management/hr-management/employees",
//           page: <Employees />,
//         },

//         {
//           link: "/Management/hr-management/view-employee/:employeeId",
//           page: <ViewEmployee />,
//         },
//         {
//           link: "/verses/projects",
//           page: <VerseProjects />,
//         },
//         {
//           link: "/verses/projects/:projectName/:projectId",
//           page: <VersesOfProject />,
//         },
//         {
//           link: "/customers",
//           page: <Customers />,
//         },
//         {
//           link: "/customers/view-customer/:id",
//           page: <ViewCustomer />,
//         },
//         {
//           link: "/config/email-setting",
//           page: <EmailSetting />,
//         },
//       ];
//   }
// };

///draft FILE
