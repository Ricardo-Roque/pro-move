import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { CtaButton, Page, TopBar } from "@/components/funnel";



export function Summary() {
  return (
    <Page full header={<div className="mx-auto max-w-[608px]"><TopBar back={false} menu /></div>}>
      <div className="pt-6 text-center">
        <h1 className="font-display text-[28px] font-bold uppercase text-primary">"Mais de 2.000.000"</h1>
        <p className="font-semibold text-muted-foreground">pessoas entraram no ProMove para dominar a IA</p>
      </div>
      <div className="relative mt-8">
        <img src="/assets/onboarding/summary-experiment.webp" alt="Founder of ProMove" className="w-full animate-in zoom-in-95 duration-700" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
      </div>
      <CtaButton to="/onboarding/step/1">Continuar</CtaButton>
    </Page>
  );
}
