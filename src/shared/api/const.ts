import ky from "ky";

export const API_NAMESPACE = "api";

export const api = ky.create({ prefixUrl: "/api" });
