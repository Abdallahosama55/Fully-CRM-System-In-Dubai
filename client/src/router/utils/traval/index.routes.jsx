import { bookingRoutes } from "./booking.routes";
import { flightsRoutes } from "./flights.routes";
import { experienceRoutes } from "./experiences.routes";
import { accommodationRoutes } from "./accommodations.routes";
import { transferRoutes } from "./transfer.routes";
import { brandingRoutes } from "./branding.routes";
import { packagesRoutes } from "./packages.routes";
import { quotationsRoutes } from "./quotation.routes";
import { picupRoutes } from "./pickup.routes";

export const travelRoutes = [
  ...bookingRoutes,
  ...experienceRoutes,
  ...flightsRoutes,
  ...accommodationRoutes,
  ...transferRoutes,
  ...brandingRoutes,
  ...packagesRoutes,
  ...quotationsRoutes,
  ...picupRoutes,
];
