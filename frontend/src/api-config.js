export const API_ROOT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000" //dev
    : ""; //prod
