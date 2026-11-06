import { useEffect, useRef, useState } from "react";
import { Award, Check, CircleCheck, Gift, LockKeyhole, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { siClickup, siDeepseek, siFigma, siGrammarly, siHubspot, siMake, siNotion, siPerplexity, siTrello, siZapier } from "simple-icons";
import { Button } from "@/components/ui/button";
import { CHECKOUT_URL, DEFAULT_PLAN_WEEKS, OFFER_SECONDS, SELLING_PLANS, formatPrice } from "@/lib/selling-plans";
import { cn } from "@/lib/utils";

const tools = [
  { name: "DeepSeek", icon: siDeepseek, tone: "tool-blue" },
  { name: "ChatGPT", label: "✺", tone: "tool-green" },
  { name: "Rows", label: "▦", tone: "tool-multi" },
  { name: "ClickUp", icon: siClickup, tone: "tool-violet" },
  { name: "HubSpot", icon: siHubspot, tone: "tool-orange" },
  { name: "Notion", icon: siNotion, tone: "tool-neutral" },
  { name: "Zapier", icon: siZapier, tone: "tool-orange" },
  { name: "Canva", label: "Canva", tone: "tool-canva" },
  { name: "Midjourney", label: "⛵", tone: "tool-dark" },
  { name: "Firefly", label: "Fi", tone: "tool-red" },
  { name: "Perplexity", icon: siPerplexity, tone: "tool-blue" },
  { name: "Grammarly", icon: siGrammarly, tone: "tool-green" },
  { name: "Figma", icon: siFigma, tone: "tool-violet" },
  { name: "Make", icon: siMake, tone: "tool-green" },
  { name: "Trello", icon: siTrello, tone: "tool-blue" },
];

export function Selling() {
  const [weeks, setWeeks] = useState<number>(DEFAULT_PLAN_WEEKS);
  const [remaining, setRemaining] = useState(OFFER_SECONDS);
  const plansRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const end = Date.now() + OFFER_SECONDS * 1000;
    const timer = window.setInterval(() => setRemaining(Math.max(0, Math.ceil((end - Date.now()) / 1000))), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[608px] items-center justify-between gap-3 px-4 py-3">
          <div><p className="mb-1 text-[10px] font-semibold text-muted-foreground">O desconto termina em</p><div className="flex items-center gap-1 font-bold"><span className="rounded border border-border px-2 py-1">{minutes}<small className="block text-center text-[9px] font-normal">min</small></span>:<span className="rounded border border-border px-2 py-1">{seconds}<small className="block text-center text-[9px] font-normal">seg</small></span></div></div>
          <Button onClick={() => plansRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} className="h-12 rounded-lg px-4 font-bold uppercase shadow-cta">Obter meu plano</Button>
        </div>
      </header>
      <main className="mx-auto max-w-[608px] px-4 pb-10">
        <section className="selling-intro -mx-4 px-4 pb-5 pt-5 text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold"><Gift className="size-4 text-star" /> Desconto especial <span className="rounded bg-danger px-2 py-0.5 text-primary-foreground">50%</span></p>
          <h1 className="font-display mt-3 text-[25px] font-bold leading-snug">Seu Programa Pessoal de Certificação em IA está pronto!</h1>
          <span className="mt-3 inline-block rounded-md bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">Torne-se um Mestre da IA</span>
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            <div className="bg-primary/5 px-2 py-3"><p className="flex items-center justify-center gap-1 text-muted-foreground"><Target className="size-4 text-primary" /> Seu objetivo</p><p className="mt-1 font-bold">Crescer no seu cargo atual</p></div>
            <div className="bg-primary/5 px-2 py-3"><p className="flex items-center justify-center gap-1 text-muted-foreground"><TrendingUp className="size-4 text-primary" /> Seu futuro</p><p className="mt-1 font-bold">Dominar as principais ferramentas de IA</p></div>
          </div>
          <div className="selling-tool-grid relative mt-6 h-[285px] overflow-hidden rounded-lg bg-accent p-4 sm:h-[340px] sm:p-6">
            <div className="grid grid-cols-5 gap-x-3 gap-y-5 sm:gap-x-6 sm:gap-y-6">{tools.map((tool, i) => <div key={tool.name} className="min-w-0"><div className={cn("tool-icon mx-auto flex aspect-square w-full max-w-16 items-center justify-center rounded-lg", tool.tone)} title={tool.name}>{tool.icon ? <svg role="img" aria-label={tool.name} viewBox="0 0 24 24" className="size-8 fill-current sm:size-10"><path d={tool.icon.path} /></svg> : <span className={cn("font-bold", tool.name === "Canva" ? "text-xs italic sm:text-sm" : "text-3xl sm:text-4xl")}>{tool.label}</span>}</div><p className="mt-2 text-sm font-extrabold sm:text-lg">DIA {i + 1}</p></div>)}</div>
          </div>
        </section>
        <p className="mt-3 text-center text-sm font-bold">Mais de 300 pessoas se inscreveram no Programa de Certificação em IA na última hora</p>
        <div className="mt-4 flex gap-2 overflow-hidden text-[11px] font-semibold" aria-label="Inscrições recentes">{["Alana Oliveira • Plano de 4 semanas", "Guilherme • Plano de 12 semanas", "Gabriela • Plano de 1 semana"].map(name => <span key={name} className="shrink-0 rounded-full border border-border bg-muted px-3 py-2">{name}</span>)}</div>
        <section ref={plansRef} className="scroll-mt-28 pt-7">
          <h2 className="font-display text-center text-[23px] font-bold">Selecionamos o melhor plano para você</h2>
          <div className="mx-auto mt-5 max-w-[350px] rounded-lg bg-offer-soft p-3 text-offer-ink"><div className="flex items-center justify-between gap-2"><span className="bg-offer-strong px-3 py-2 text-xl font-extrabold text-primary-foreground">50% OFF</span><span className="flex items-center gap-1 text-sm font-bold"><CircleCheck className="size-5" /> Cupom resgatado!</span></div><div className="mt-3 flex items-center justify-between gap-3 border-t border-offer-strong/20 pt-3"><p className="flex items-center gap-2 text-xs font-bold"><Check className="size-4" /> Mantenha o desconto ativo</p><div className="text-center text-2xl font-extrabold">{minutes}:{seconds}<p className="text-[10px] font-semibold">Min.　Seg.</p></div></div></div>
          <div role="radiogroup" aria-label="Escolha seu plano" className="mt-5 space-y-3">{SELLING_PLANS.map(plan => <label key={plan.weeks} className={cn("relative block cursor-pointer overflow-hidden rounded-lg border-2 bg-card", weeks === plan.weeks ? "border-primary" : "border-border")}>
            {plan.popular && <div className="bg-primary py-1 text-center text-xs font-bold text-primary-foreground">👍 MAIS POPULAR</div>}
            <div className="flex min-h-24 items-center gap-3 px-3 py-4 sm:px-5"><input type="radio" name="plan" value={plan.weeks} checked={weeks === plan.weeks} onChange={() => setWeeks(plan.weeks)} aria-label={`Plano de ${plan.weeks} semanas`} className="size-4 shrink-0 accent-primary" /><div className="min-w-0 flex-1"><p className="text-sm font-extrabold uppercase sm:text-base">Plano de {plan.weeks} semanas</p><p className="mt-1 text-xs text-muted-foreground">Programa de Certificação em IA</p></div><div className="shrink-0 bg-muted px-2 py-1 text-right"><span className="text-xs font-bold">R$ </span><span className="text-3xl font-extrabold">{formatPrice(plan.totalPrice).split(",")[0]}</span><span className="align-top text-sm font-bold">,{formatPrice(plan.totalPrice).split(",")[1]}</span><p className="text-[10px] text-muted-foreground">NO TOTAL</p></div></div>
          </label>)}</div>
          <p className="mt-4 flex gap-2 text-[11px] leading-relaxed text-muted-foreground"><ShieldCheck className="size-5 shrink-0 text-primary" /> Seu plano inclui acesso ao Programa Pessoal de Certificação em IA.</p>
          <Button asChild className="mt-4 h-14 w-full rounded-lg text-base font-bold uppercase shadow-cta"><a href={CHECKOUT_URL} rel="noreferrer">Obter meu plano</a></Button>
          <p className="mt-4 text-center text-[10px] leading-relaxed text-muted-foreground">Ao continuar, você concorda com os <a className="underline" href="https://promuse.ai/settings/subscription-terms" target="_blank" rel="noreferrer">Termos de Assinatura</a> e a <a className="underline" href="https://promuse.ai/settings/privacy-policy" target="_blank" rel="noreferrer">Política de Privacidade</a>.</p>
        </section>
        <div className="mt-7 text-center"><span className="inline-flex items-center gap-1 bg-offer-soft px-3 py-2 text-sm font-bold text-offer-ink"><LockKeyhole className="size-4" /> Pagamento seguro</span><div className="payment-marks mt-5 flex items-center justify-center gap-5" aria-label="Visa, Mastercard e Maestro"><span className="payment-visa text-sm font-extrabold italic">VISA</span><span className="payment-mastercard" role="img" aria-label="Mastercard" /><span className="payment-maestro" role="img" aria-label="Maestro" /></div><p className="mt-4 text-sm font-bold">PayPal　 Apple Pay</p><p className="mt-7 text-[11px] text-muted-foreground">Privacidade · Segurança · IA</p></div>
        <section className="mt-7 rounded-lg border border-border bg-guarantee px-5 py-6 text-center"><Award className="mx-auto size-16 text-offer-strong" /><h2 className="mt-3 text-lg font-bold">Garantia de devolução do dinheiro</h2><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Estamos tão confiantes em nosso serviço que oferecemos uma garantia de devolução do dinheiro. Consulte os critérios e condições da garantia antes de adquirir seu plano.</p><a href="https://promuse.ai/settings/subscription-terms" target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-semibold underline">Ver condições da garantia</a></section>
      </main>
    </div>
  );
}
