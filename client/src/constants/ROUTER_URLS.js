const ROUTER_URLS = {
  CONFIGURE: {
    SETTINGS: "/settings",
    COMPANY_PROFILE: "/settings/company-info",
    EMAIL_SETTINGS: "/settings/email",
    DATA_MANAGEMENT: "/data-management/job-titles",
  },
  CUSTOMER: { INDEX: "/customers" },
  ENGAGEMENTS: {
    COLLABORATION_WIDGET: "/engagements/collaboration-widget",
    SLIDER_WIDGET: "/engagements/slider-widget",
  },
  CRM: {
    CONTACTS: "/crm/contacts/ALL",
    Leads: "/crm/contacts/LEAD",
    Qualified: "/crm/contacts/QUALIFIED",
    Clients: "/crm/contacts/CLIENT",
    Companies: "/crm/contacts/COMPANY",
    PIPELINES_SETTINGS: "/crm/pipline-settings/pipline-template",
    PIPELINES: "/crm/pipelines",
    AGENCIES: "/agencies",
    BUYER_GROUPS: "/buyer-groups",
    SUPPLIERS: "/suppliers",
    FormsCrm :"/crm/forms",
    FormsCrmInfo :"/crm/forms/info",
  },

  EMPLOYEES: "/employees",
  EVENT: {
    INDEX: "/event",
    VIEW: "/event/",
    EDIT: "/event/edit/",
  },
  METAVERSE: {
    INDEX: "/metaverse",
  },
  INVENTORY: {
    PRODUCTS: "/inventory/products",
    ORDERS: "/inventory/orders",
    CATEGORIES: "/inventory/categories",
    BRANDS: "/inventory/brands",
    WAREHOUSES: "/inventory/warehouse",
  },
  MEETING: "/collaboration/meeting",

  EMPLOYEE: {
    INDEX: "/employee/",
    ADD: "/employee/add/",
    EDIT: "/employee/edit/",
  },
  DESKS: {
    INDEX: "/desks",
    LIVE_CHAT: "/desks/live-chat",
    TICKETING_DESK: "/desks/ticketing-desk",
    CUSTOMER_SERVICE: "/desks/customer-service",
    ACTIVITIES: "/desks/activities",
    WIDGET: "/desks/widget",
  },
  PAGES: {
    ADD: "/pages/web-builder",
    EDIT: "/pages/web-builder/",
    INDEX: "/pages",
  },
  FINANCE: {
    ACCOUNTING: {
      PRICING_MODULE: "/finance/accounting/pricing-module",
    },
    STATEMENTS: {
      INDEX: "/finance/statements",
    },
  },
  TRAVEL: {
    HOTELS: {
      MANAGE: "/hotels/manage",
      MANAGE_CONTRACT: "/hotels/manage-contract",
      AVAILABILITY: "/hotels/availability",
      PROMO_CODE: "/hotels/promo-code",
      EXTRA: "/hotels/extra",
    },
    TRANSFERS: {
      INDEX: "/transfer",
      BOOK: "/transfer/book/",
      BOOKING: "/transfer/booking",
    },
    FLIGHTS: {
      INDEX: "/flights",
      CHARTERS: "/flights/charters",
      BOOK: "/flights/book",
    },
    Forms: {
      INDEX: "/forms",
  
    },
    BOOKING: {
      INDEX: "/booking",
      ONLINE_BOOKING: "/bookings/online-booking",
      ONLINE_BOOKING_METTING: "/bookings/online-booking/metting",
      BOOKING_DETAILS: "/booking/",
    },
    SALES_TOOLS: {
      INDEX: "/tools",
    },
    EXPERIANCES: {
      HOME: "/experiences",
      ADD: "/experiences/add",
      EDIT: "/experiences/edit/",
      VIEW: "/experiences/",
      BOOK: "/experiences/book/",
    },
    ACCOMMODATION: {
      HOME: "/accommodations",
      ADD: "/accommodations/add",
      EDIT: "/accommodations/edit/",
      VIEW: "/accommodations/",
      BOOK: "/accommodations/book/",
    },
    PACKAGES: {
      INDEX: "/packages",
      ADD: "/packages/add",
      EDIT: "/packages/edit/",
      VIEW: "/packages/:id",
      BOOK: "/packages/book/:id",
    },
    QUOTATION: {
      INDEX: "/quotations",
      VIEW: "/quotations/:id",
    },
    Forms: {
      INDEX: "/forms",
     
    },
    PICKUP: {
      INDEX: "/pickup",
    },
    BRANDING: {
      INDEX: "/branding",
    },
  },
};

export default ROUTER_URLS;
