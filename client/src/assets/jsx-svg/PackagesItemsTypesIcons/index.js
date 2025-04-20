import wrapWithLazy from "utils/wrapWithLazy.jsx";

export const HotelSVG = wrapWithLazy(() => import("./HotelSVG.jsx"), "HotelSVG");
export const FlightSVG = wrapWithLazy(() => import("./FlightSVG.jsx"), "FlightSVG");
export const TransferSVG = wrapWithLazy(() => import("./TransferSVG.jsx"), "TransferSVG");
export const ExperiencesSVG = wrapWithLazy(() => import("./ExperiencesSVG.jsx"), "ExperiencesSVG");
