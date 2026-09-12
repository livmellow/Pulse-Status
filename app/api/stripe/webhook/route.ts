import Stripe from "stripe";
import { db } from "../../../../db/postgres";

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY, secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !secret) return new Response("Stripe is not configured", { status: 503 });
  const stripe = new Stripe(key); let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature") ?? "", secret); }
  catch { return new Response("Invalid signature", { status: 400 }); }
  if (event.type.startsWith("customer.subscription.")) {
    const sub = event.data.object as Stripe.Subscription;
    await db().query("update subscriptions set status=$1, stripe_subscription_id=$2, current_period_end=to_timestamp($3), updated_at=now() where stripe_customer_id=$4", [sub.status, sub.id, sub.current_period_end, sub.customer]);
  }
  return Response.json({ received: true });
}
