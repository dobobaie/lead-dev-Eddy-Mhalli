export const applicationServices = ["chatbot-messenger"] as const;
export type ApplicationService = (typeof applicationServices)[number];
