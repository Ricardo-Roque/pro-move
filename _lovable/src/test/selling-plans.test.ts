import { describe, expect, it } from "vitest";
import { CHECKOUT_URL, DEFAULT_PLAN_WEEKS, SELLING_PLANS } from "@/lib/selling-plans";

describe("Plans from the final screen reference", () => {
  it("offers a single four-week plan", () => {
    expect(SELLING_PLANS).toHaveLength(1);
    expect(SELLING_PLANS[0].weeks).toBe(4);
  });
  it("selects the four-week plan by default", () => {
    expect(DEFAULT_PLAN_WEEKS).toBe(4);
  });
  it("is priced at R$47 in total", () => {
    expect(SELLING_PLANS[0].totalPrice).toBe(47);
  });
  it("sends the buyer to the payt.site checkout", () => {
    expect(CHECKOUT_URL).toBe("https://payt.site/eGCOK6x");
  });
});
