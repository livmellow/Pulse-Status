const required = ["DATABASE_URL", "APP_URL", "AUTH_SECRET"] as const;
export function configurationStatus() {
  return {
    core: required.every((key) => Boolean(process.env[key])),
    google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    email: Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET && process.env.STRIPE_STARTER_PRICE_ID),
  };
}
export function requireStripe() {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_STARTER_PRICE_ID) throw new Error("Stripe billing is not configured");
  return { key: process.env.STRIPE_SECRET_KEY, priceId: process.env.STRIPE_STARTER_PRICE_ID };
}
