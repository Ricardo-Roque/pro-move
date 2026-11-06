import { createContext, useContext, type ReactNode } from "react";

export const FUNNEL_STAGES = [
  "/", "/onboarding/summary",
  ...Array.from({ length: 12 }, (_, i) => `/onboarding/step/${i + 1}`),
  "/onboarding/step/finish", "/onboarding/entry-name",
  "/onboarding/person-summary-page", "/onboarding/before-after-page",
  "/onboarding/solution-pitch-page", "/onboarding/social-proof-testimonials-page",
  "/onboarding/spin", "/onboarding/selling",
] as const;

export function getFunnelStage(to: string, params?: { step: string }) {
  const path = to === "/onboarding/step/$step" && params ? `/onboarding/step/${params.step}` : to;
  const index = FUNNEL_STAGES.findIndex((stage) => stage === path);
  return index < 0 ? 0 : index;
}

type Navigation = {
  navigate: (options: { to: string; params?: { step: string } }) => void;
  back: () => void;
};
const FunnelNavigationContext = createContext<Navigation | null>(null);

export function FunnelNavigationProvider({ value, children }: { value: Navigation; children: ReactNode }) {
  return <FunnelNavigationContext.Provider value={value}>{children}</FunnelNavigationContext.Provider>;
}

export function useFunnelNavigation() {
  const navigation = useContext(FunnelNavigationContext);
  if (!navigation) throw new Error("Funnel navigation requires its provider");
  return navigation.navigate;
}

export function useFunnelControls() {
  const navigation = useContext(FunnelNavigationContext);
  if (!navigation) throw new Error("Funnel controls require their provider");
  return navigation;
}