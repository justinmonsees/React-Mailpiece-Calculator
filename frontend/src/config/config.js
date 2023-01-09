export const ENDPOINT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://monsees-mailcalc-api.onrender.com";
