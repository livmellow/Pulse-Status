import Stripe from "stripe";
import { requireStripe } from "../../../../lib/config";
export async function POST() {
  try {
    const { key, priceId } = requireStripe(); const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({ mode: "subscription", line_items: [{ price: priceId, quantity: 1 }], success_url: `${process.env.APP_URL}/dashboard?billing=success`, cancel_url: `${process.env.APP_URL}/pricing?billing=cancelled` });
    return Response.json({ url: session.url });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Billing unavailable" }, { status: 503 }); }
}
