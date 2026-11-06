import { Button } from "@/components/ui/button";
import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { useState } from "react";
import { CtaButton, Page, TopBar } from "@/components/funnel";



// clockwise from the top
const SEGS = ["20%", "30%", "35%", "40%", "50%", "10%", "15%"];
const WIN = 4; // 50%

export function Spin() {
  const navigate = useFunnelNavigation();
  const [rot, setRot] = useState(0);
  const [state, setState] = useState<"idle" | "spinning" | "won">("idle");
  const step = 360 / SEGS.length;
  const spin = () => {
    if (state !== "idle") return;
    setState("spinning");
    setRot(360 * 6 + (360 - WIN * step));
    setTimeout(() => setState("won"), 5200);
  };
  const pt = (a: number, r: number) => [150 + r * Math.sin((a * Math.PI) / 180), 150 - r * Math.cos((a * Math.PI) / 180)];
  return (
    <Page full header={<div className="mx-auto max-w-[608px]"><TopBar back={false} /></div>}>
      <h1 className="font-display text-center text-[26px] font-bold leading-tight">Gire e Garanta seu<br /><span className="text-primary">Programa de Certificação em IA!</span></h1>
      <p className="mt-2 text-center font-semibold text-muted-foreground">Não perca a chance de obter o certificado com uma oferta personalizada 🎁</p>
      <div className="relative mx-auto mt-6 size-[320px]">
        <svg viewBox="0 0 300 300" className="size-full">
          <circle cx="150" cy="150" r="148" className="fill-wheel-rim" />
          {Array.from({ length: 24 }).map((_, i) => {
            const [x, y] = pt(i * 15, 137);
            return <circle key={i} cx={x} cy={y} r="4" className="fill-wheel-bulb animate-pulse" style={{ animationDelay: `${(i % 2) * 500}ms` }} />;
          })}
          <g style={{ transform: `rotate(${rot}deg)`, transformOrigin: "150px 150px", transition: "transform 5s cubic-bezier(0.17,0.67,0.12,0.99)" }}>
            {SEGS.map((s, i) => {
              const a0 = i * step - step / 2, a1 = a0 + step;
              const [x0, y0] = pt(a0, 126), [x1, y1] = pt(a1, 126);
              const mid = i * step;
              return (
                <g key={s}>
                  <path d={`M150 150 L${x0} ${y0} A126 126 0 0 1 ${x1} ${y1} Z`} className={i % 2 ? "fill-wheel-a" : "fill-wheel-b"} />
                  <g transform={`rotate(${mid} 150 150)`}>
                    <text x="150" y="58" textAnchor="middle" className="fill-wheel-text font-display text-[24px] font-bold">{s}</text>
                    <text x="150" y="78" textAnchor="middle" className="fill-wheel-text text-[12px] font-semibold">off</text>
                  </g>
                </g>
              );
            })}
          </g>
          <polygon points="150,100 140,140 160,140" className="fill-foreground" />
          <circle cx="150" cy="150" r="12" className="fill-card stroke-muted" strokeWidth="2" />
        </svg>
      </div>
      <CtaButton onClick={spin} disabled={state === "spinning"}>Girar</CtaButton>
      {state === "won" && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-foreground/60 p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 text-center animate-in zoom-in-75 duration-300">
            <div className="text-6xl">🎁</div>
            <h2 className="font-display mt-3 text-2xl font-bold">Parabéns!</h2>
            <p className="mt-2 text-muted-foreground">Você ganhou</p>
            <div className="font-display text-5xl font-bold text-primary">50% OFF</div>
            <p className="mt-2 text-sm text-muted-foreground">no seu Programa de Certificação em IA</p>
            <Button onClick={() => navigate({ to: "/onboarding/selling" })} className="mt-6 h-[52px] w-full rounded-xl bg-primary font-bold uppercase text-primary-foreground shadow-cta">Resgatar meu desconto</Button>
          </div>
        </div>
      )}
    </Page>
  );
}
