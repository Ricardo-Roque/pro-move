export const SELLING_PLANS = [
  { weeks: 4, totalPrice: 47, popular: false },
] as const;

export const DEFAULT_PLAN_WEEKS = 4;
export const OFFER_SECONDS = 254;

// Checkout provider for the final offer screen (payt.site).
export const CHECKOUT_URL = "https://payt.site/eGCOK6x";

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
