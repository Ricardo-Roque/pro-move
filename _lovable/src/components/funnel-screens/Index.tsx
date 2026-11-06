import { Button } from "@/components/ui/button";
import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { useState } from "react";
import { Page, TopBar, Title, Subtitle } from "@/components/funnel";
import { cn } from "@/lib/utils";



const OPTIONS = [
  { img: "/assets/onboarding/lsy4/work-company.png", label: "Trabalho para uma empresa", bg: "bg-tile-1" },
  { img: "/assets/onboarding/lsy4/work-myself.png", label: "Trabalho por conta própria", bg: "bg-tile-2" },
  { img: "/assets/onboarding/lsy4/small-business.png", label: "Tenho um pequeno negócio", bg: "bg-tile-3" },
  { img: "/assets/onboarding/lsy4/changing-direction.png", label: "Estou mudando de direção", bg: "bg-tile-4" },
];

export function Index() {
  const navigate = useFunnelNavigation();
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <Page full header={<div className="mx-auto max-w-[608px]"><TopBar back={false} menu /></div>}>
      <div className="px-4">
        <Title className="mx-auto max-w-[360px] text-[30px]">O que melhor descreve você agora?</Title>
        <Subtitle>Vamos construir seu caminho de IA com base na sua situação real.</Subtitle>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {OPTIONS.map((o, i) => (
            <Button variant="ghost"
              key={o.label}
              onClick={() => {
                setPicked(i);
                setTimeout(() => navigate({ to: "/onboarding/summary" }), 280);
              }}
              className={cn(
                "block h-auto min-w-0 w-full whitespace-normal rounded-xl border bg-card p-4 text-center font-normal shadow-option transition-all hover:border-primary/60 hover:bg-card active:translate-y-[2px]",
                picked === i ? "border-primary" : "border-border",
              )}
            >
              <div className={cn("flex h-[110px] items-end justify-center overflow-hidden rounded-lg", o.bg)}>
                <img src={o.img} alt="" className="h-full object-contain" />
              </div>
              <div className="font-display py-5 text-[16px] font-semibold tracking-wide text-foreground">{o.label}</div>
            </Button>
          ))}
        </div>
        <p className="mx-auto mt-16 max-w-[280px] text-center text-xs text-foreground">
          Ao continuar, você concorda com <a className="text-link underline" href="#">Termos e Condições</a>,{" "}
          <a className="text-link underline" href="#">Política de Privacidade</a>,{" "}
          <a className="text-link underline" href="#">Termos de Assinatura</a>
        </p>
      </div>
    </Page>
  );
}
