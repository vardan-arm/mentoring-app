import { LOCATIONS_REQUIRING_LOGIN} from "./constants";

// Checks whether the user can visit the page without being logged in
export const isLocationAllowed = (pathname) => {
  return !LOCATIONS_REQUIRING_LOGIN.some(loc => pathname.includes(`${loc}`));
};
