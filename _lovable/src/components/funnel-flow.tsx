import { useCallback, useEffect, useMemo, useState } from "react";
import { FUNNEL_STAGES, FunnelNavigationProvider, getFunnelStage } from "@/lib/funnel-navigation";
import { Index } from "@/components/funnel-screens/Index";
import { Summary } from "@/components/funnel-screens/Summary";
import { StepPage } from "@/components/funnel-screens/StepPage";
import { Finish } from "@/components/funnel-screens/Finish";
import { EntryName } from "@/components/funnel-screens/EntryName";
import { PersonSummary } from "@/components/funnel-screens/PersonSummary";
import { BeforeAfter } from "@/components/funnel-screens/BeforeAfter";
import { Pitch } from "@/components/funnel-screens/Pitch";
import { SocialProof } from "@/components/funnel-screens/SocialProof";
import { Spin } from "@/components/funnel-screens/Spin";
import { Selling } from "@/components/funnel-screens/Selling";

export function FunnelFlow({ initialStage = "/" }: { initialStage?: string }) {
  const [history, setHistory] = useState(() => [getFunnelStage(initialStage)]);
  const stage = history.at(-1) ?? 0;
  const navigate = useCallback((options: { to: string; params?: { step: string } }) => {
    const next = getFunnelStage(options.to, options.params);
    setHistory((previous) => previous.at(-1) === next ? previous : [...previous, next]);
  }, []);
  const back = useCallback(() => setHistory((previous) => previous.length > 1 ? previous.slice(0, -1) : [Math.max(0, (previous[0] ?? 0) - 1)]), []);
  const controls = useMemo(() => ({ navigate, back }), [navigate, back]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [stage]);

  let screen;
  if (stage >= 2 && stage <= 13) screen = <StepPage n={stage - 1} />;
  else {
    switch (FUNNEL_STAGES[stage]) {
      case "/onboarding/summary": screen = <Summary />; break;
      case "/onboarding/step/finish": screen = <Finish />; break;
      case "/onboarding/entry-name": screen = <EntryName />; break;
      case "/onboarding/person-summary-page": screen = <PersonSummary />; break;
      case "/onboarding/before-after-page": screen = <BeforeAfter />; break;
      case "/onboarding/solution-pitch-page": screen = <Pitch />; break;
      case "/onboarding/social-proof-testimonials-page": screen = <SocialProof />; break;
      case "/onboarding/spin": screen = <Spin />; break;
      case "/onboarding/selling": screen = <Selling />; break;
      default: screen = <Index />;
    }
  }
  return <FunnelNavigationProvider value={controls}><div key={stage}>{screen}</div></FunnelNavigationProvider>;
}
