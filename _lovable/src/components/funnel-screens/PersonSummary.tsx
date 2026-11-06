import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { useEffect, useState } from "react";
import { CtaButton, Page, Segments, TopBar } from "@/components/funnel";



export function PersonSummary() {
  const [pos, setPos] = useState(0);
  const [pot, setPot] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPos(8), 100);
    const id = setInterval(() => setPot((v) => (v >= 85 ? 85 : v + 1)), 15);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);
  return (
    <Page header={<><TopBar /><Segments total={4} active={1} /></>}>
      <div className="rounded-xl border border-border bg-card p-3 shadow-option">
        <h1 className="font-display mt-4 text-center text-[26px] font-bold">Seu Resumo Pessoal</h1>
        <p className="mt-2 text-center text-muted-foreground">Com base nas suas respostas, você está apenas experimentando, sem dominar a IA. Você precisa evoluir rápido!</p>
        <div className="mt-6 rounded-xl border border-border bg-muted/60 p-3 text-center">
          <div className="text-sm font-semibold">Habilidades em IA</div>
          <div className="font-display text-4xl font-bold">Baixo</div>
          <div className="relative mt-4 flex h-2 overflow-hidden rounded-full">
            <div className="flex-1 bg-level-low" /><div className="flex-1 bg-level-mid" /><div className="flex-1 bg-level-high" />
          </div>
          <div className="relative -mt-3 h-3">
            <div className="absolute h-4 w-1 rounded-sm border border-foreground bg-card transition-all duration-1000" style={{ left: `${pos}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>Baixo</span><span>Médio</span><span>Alto</span></div>
        </div>
        <div className="mt-5 rounded-xl border border-border bg-muted/60 p-3 text-center">
          <div className="text-sm font-semibold">Potencial</div>
          <div className="font-display text-4xl font-bold">{pot}%</div>
          <div className="mt-6 flex items-center justify-center gap-1 rounded-lg border border-success/30 bg-success/10 p-4 text-sm font-semibold text-success">
            💡 Ainda assim, suas respostas indicam alto potencial para dominar a IA
          </div>
        </div>
      </div>
      <CtaButton to="/onboarding/before-after-page">Continuar</CtaButton>
    </Page>
  );
}
