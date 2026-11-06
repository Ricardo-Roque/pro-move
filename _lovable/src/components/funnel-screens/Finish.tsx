import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { useEffect, useState } from "react";
import { Page, TopBar } from "@/components/funnel";



const REVIEWS: [string, string][] = [
  ["Eu tinha pavor de ficar para trás, mas o ProMove torna tudo muito simples. Sem jargões assustadores, só dicas úteis que eu uso todos os dias.", "Sarah Jenkins"],
  ["Usei as ferramentas de IA para reescrever todas as descrições dos meus produtos. Levei minutos em vez de dias, e as vendas começaram a aparecer na hora.", "Linda Baker"],
  ["Aprendi a automatizar meus relatórios de e-mail chatos em um fim de semana. Meu chefe ficou impressionado, e agora eu tenho tempo até para o almoço.", "Michelle Torrez"],
  ["Entre filhos e trabalho, meu tempo livre é zero. As aulas em áudio de 15 minutos são perfeitas para o trajeto. Sinto que fico mais inteligente a cada dia.", "Emily Chen"],
  ["Nunca achei que seria \"criativa\", mas transformar fotos da família em arte é muito divertido. É surpreendentemente fácil e virou meu novo hobby favorito.", "Karen Miller"],
  ["Diferente de outros cursos que são só teoria, este me deu ferramentas que pude usar na hora. Melhor investimento que fiz por mim mesma em anos.", "Patricia Davis"],
];

export function Finish() {
  const navigate = useFunnelNavigation();
  const [p, setP] = useState(0);
  const [r, setR] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setP((v) => Math.min(100, v + 1)), 70);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setR((v) => (v + 1) % REVIEWS.length), 2500);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (p >= 100) {
      const t = setTimeout(() => navigate({ to: "/onboarding/entry-name" }), 500);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [p, navigate]);
  const R = 70, C = 2 * Math.PI * R;
  return (
    <Page header={<TopBar back={false} />}>
      <div className="flex flex-col items-center px-4 text-center">
        <div className="relative mt-4 size-[170px]">
          <svg viewBox="0 0 160 160" className="size-full -rotate-90">
            <circle cx="80" cy="80" r={R} strokeWidth="10" className="fill-none stroke-muted" />
            <circle cx="80" cy="80" r={R} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p / 100)} className="fill-none stroke-primary transition-all" />
          </svg>
          <div className="font-display absolute inset-0 flex items-center justify-center text-4xl font-bold">{p}%</div>
        </div>
        <h2 className="font-display mt-6 text-xl font-bold">Criando seu Programa de Certificação Pessoal...</h2>
        <div className="mt-8">
          <div className="font-display text-3xl font-bold text-primary">2.000.000+ pessoas</div>
          <div className="font-medium text-muted-foreground">escolheram o ProMove</div>
        </div>
        <div className="mt-6 w-full overflow-hidden">
          <div key={r} className="animate-in fade-in slide-in-from-right-8 rounded-xl border border-border bg-card p-5 text-left shadow-option duration-500">
            <div className="text-star">★★★★★</div>
            <p className="mt-2 text-[15px] text-foreground">{REVIEWS[r]?.[0]}</p>
            <div className="mt-3 font-semibold">{REVIEWS[r]?.[1]}</div>
            <div className="text-xs text-success">✓ Cliente verificado</div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Avaliações em destaque de usuários iniciais.</p>
      </div>
    </Page>
  );
}
