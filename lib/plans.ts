export const PLANS = {
  free: { monitorLimit: 1, pageLimit: 1, historyDays: 30, customDomain: false },
  starter: { monitorLimit: 5, pageLimit: 1, historyDays: 365, customDomain: true },
} as const;
export type PlanName = keyof typeof PLANS;
export function limitsFor(plan: string) { return PLANS[plan as PlanName] ?? PLANS.free; }
