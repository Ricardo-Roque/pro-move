import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { OptionRow, Page, ProgressLine, Subtitle, Title, TopBar } from "@/components/funnel";
import { STEPS } from "@/lib/steps";



export function StepPage({ n }: { n: number }) {
  const navigate = useFunnelNavigation();
  const s = STEPS[n - 1];
  if (!s) return null;
  const next = () =>
    n < STEPS.length
      ? navigate({ to: "/onboarding/step/$step", params: { step: String(n + 1) } })
      : navigate({ to: "/onboarding/step/finish" });
  return (
    <Page
      header={
        <>
          <TopBar right={<><span className="text-primary">{n}</span>/{STEPS.length}</>} />
          <ProgressLine value={n / STEPS.length} />
        </>
      }
    >
      <div key={n} className="animate-in fade-in slide-in-from-right-6 duration-300">
        <Title>{s.title}</Title>
        <Subtitle>{s.subtitle}</Subtitle>
        <div className="mt-5 flex flex-col gap-3">
          {s.options.map(([e, l]) => (
            <OptionRow key={l} emoji={e} label={l} onSelect={next} />
          ))}
        </div>
      </div>
    </Page>
  );
}
