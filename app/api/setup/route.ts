import { configurationStatus } from "../../../lib/config";
import { PLANS } from "../../../lib/plans";
export async function GET() { return Response.json({ configuration: configurationStatus(), plans: PLANS }); }
