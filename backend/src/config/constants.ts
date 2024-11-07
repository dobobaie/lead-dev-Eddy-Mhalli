export const applicationServices = ["internal", "public-api"] as const;
export type ApplicationService = (typeof applicationServices)[number];
