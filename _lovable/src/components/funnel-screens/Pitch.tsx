import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { CtaButton, Page, Segments, Subtitle, Title, TopBar } from "@/components/funnel";



const ITEMS: [string, string, string][] = [
  ["Aumente sua renda com IA.", " Transforme ferramentas inteligentes em ganhos reais", ""],
  ["", "Todas as principais ferramentas de IA: ", "ChatGPT, Gemini, Grok e mais"],
  ["Seja certificado", " em IA e se destaque. Evolua suas habilidades e credibilidade", ""],
  ["Desbloqueie mais de 1.000 prompts comprovados", " para produtividade, negócios e criatividade", ""],
  ["Acompanhe seu crescimento", " e ganhe confiança. Meça o progresso e evolua", ""],
  ["", "...e muito mais!", ""],
];

export function Pitch() {
  return (
    <Page header={<><TopBar /><Segments total={4} active={3} /></>}>
      <Title>IA é Mais Fácil do que Você Imagina</Title>
      <Subtitle>Nosso programa de certificação é feito para transformar seu conhecimento em IA desde o primeiro dia</Subtitle>
      <img src="/assets/onboarding/solution-pitch/person-with-phone.webp" alt="" className="mt-8 w-full rounded-2xl animate-in zoom-in-95 duration-700" />
      <h2 className="font-display mt-10 text-[22px] font-bold">Experimente o ProMove e você vai:</h2>
      <ul className="relative mt-3 flex flex-col gap-4">
        {ITEMS.map(([b, t, b2], i) => (
          <li key={i} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 fill-mode-both duration-500" style={{ animationDelay: `${i * 120}ms` }}>
            <span className="size-5 shrink-0 rounded-full border-4 border-primary bg-card" />
            <span className="text-[15px]"><b>{b}</b>{t}<b>{b2}</b></span>
          </li>
        ))}
      </ul>
      <CtaButton to="/onboarding/social-proof-testimonials-page">Continuar</CtaButton>
    </Page>
  );
}
