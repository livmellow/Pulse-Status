export async function GET() { return Response.json({ ok: true, service: "pulse-status", time: new Date().toISOString() }); }
