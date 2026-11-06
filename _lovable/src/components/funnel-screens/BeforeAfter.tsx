import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { useEffect, useState } from "react";
import { addDays, CtaButton, Page, Segments, TopBar } from "@/components/funnel";
import { cn } from "@/lib/utils";



function Col({ good, img, head, bold, label, items }: { good?: boolean; img: string; head: string; bold: string; label: string; items: string[] }) {
  return (
    <div className="relative pt-14">
      <img src={img} alt="" className="absolute left-1/2 top-0 z-10 h-[100px] -translate-x-1/2 animate-in zoom-in-50 duration-700" />
      <div className={cn("rounded-xl border px-3 pb-4 pt-14 text-sm", good ? "border-success bg-success/10" : "border-danger bg-danger/10")}>
        <div className="font-display text-base">{head}<br /><b>{bold}</b></div>
        {items.map((t, i) => (
          <div key={t} className={cn("border-t py-4", good ? "border-success" : "border-danger", i === 0 && "mt-5")}>
            {i === 0 && <b className="block text-base">{label}</b>}
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [date, setDate] = useState("");
  useEffect(() => setDate(addDays(28)), []);
  return (
    <Page header={<><TopBar /><Segments total={4} active={2} /></>}>
      <div className="rounded-xl border border-border bg-card p-3 shadow-option">
        <h1 className="font-display mx-auto mt-4 max-w-[320px] text-center text-[26px] font-bold leading-tight">Seu Programa Pessoal de Certificação em IA de 28 Dias</h1>
        <p className="mt-6 text-center text-muted-foreground">Esperamos que você conquiste seu Certificado de IA</p>
        <p className="mt-2 text-center font-bold underline">até {date}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Col img="/assets/onboarding/before-after/woman-negative.webp" head="Você está aqui:" bold="Baixo" label="Dificuldades:" items={["Não sei por onde começar", "Nenhuma credencial reconhecida", "Pouca confiança nas ferramentas de IA", "Invisível para empregadores"]} />
          <Col good img="/assets/onboarding/before-after/woman-positive.webp" head="Você com" bold="ProMove" label="Soluções:" items={["Caminho de certificação claro", "Credencial de IA compartilhável", "Resultados confiáveis com IA", "Destaque entre 90% dos profissionais"]} />
        </div>
      </div>
      <CtaButton to="/onboarding/solution-pitch-page">Continuar</CtaButton>
    </Page>
  );
}
