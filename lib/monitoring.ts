const privateRanges = [/^localhost$/i, /^127\./, /^0\./, /^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[01])\./, /^::1$/i, /^fc/i, /^fd/i];
export function validateTarget(target: string) {
  const url = new URL(target);
  if (!["http:", "https:"].includes(url.protocol) || privateRanges.some((r) => r.test(url.hostname))) throw new Error("Monitor target is not allowed");
  return url;
}
export async function checkHttp(target: string, keyword?: string) {
  const url = validateTarget(target); const started = Date.now();
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(10_000) });
  const body = keyword ? await response.text() : "";
  return { isUp: response.ok && (!keyword || body.includes(keyword)), responseMs: Date.now() - started, failureReason: response.ok ? null : `HTTP ${response.status}` };
}
