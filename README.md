# Pulse Status

Pulse Status is a multi-tenant uptime-monitoring SaaS. Customers create a branded public status page, add monitors, publish incident updates, and later connect a custom domain.

## Current release

The deployed site is an interactive demo. It includes monitor configuration, plan-limit examples, branding and local logo preview, incident timelines, and domain-verification UX. Demo data resets when the demo is exited.

## Production services still required

- Email/Google authentication and account sessions
- Railway Postgres migrations and account-scoped data access
- A scheduled monitoring worker for HTTP, keyword, TCP, ping, and Discord health checks
- Object storage for customer logos
- Stripe Checkout, customer portal, and webhook configuration
- Real custom-domain DNS verification and routing

## Local development

```bash
npm install
npm run dev
npm test
```

## Environment variables

Copy `.env.example` for the application, auth, mail, Stripe, and database settings. Never expose a Stripe secret key or service-role credential in the browser.
