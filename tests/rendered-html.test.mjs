import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const page = await readFile(new URL("app/page.tsx", root), "utf8");
const styles = await readFile(new URL("app/globals.css", root), "utf8");

test("includes an interactive demo monitor flow", () => {
  assert.match(page, /const addMonitor/);
  assert.match(page, /Demo checks run as sample data/);
  assert.match(page, /Add your first monitor/);
  assert.match(page, /HTTP keyword check/);
  assert.match(page, /Discord \/health endpoint/);
});

test("derives public status from monitor state", () => {
  assert.match(page, /function aggregate/);
  assert.match(page, /Maintenance in progress/);
  assert.match(page, /An outage is affecting some services/);
  assert.match(page, /history\(status\)/);
});

test("has onboarding, plan usage, and accessible dialogs", () => {
  assert.match(page, /Skip for now/);
  assert.match(page, /Restart tour/);
  assert.match(page, /plan preview/);
  assert.match(page, /role="dialog"/);
  assert.match(styles, /\.tourShade/);
  assert.match(styles, /@media\(max-width:800px\)/);
});
