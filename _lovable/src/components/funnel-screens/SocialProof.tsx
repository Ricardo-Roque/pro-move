import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { CtaButton, Page, Segments, TopBar } from "@/components/funnel";



const A = "/assets/onboarding/social-proof-reviews/avatars/";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-card p-4 text-[14px] shadow-option">{children}</div>;
}
function Head({ img, name, sub }: { img: string; name: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <img src={A + img} alt="" className="size-11 rounded-full object-cover" />
      <div><div className="font-semibold">{name}</div><div className="text-xs text-muted-foreground">{sub}</div></div>
    </div>
  );
}

export function SocialProof() {
  return (
    <Page header={<><TopBar /><Segments total={4} active={4} /></>}>
      <h1 className="font-display text-center text-[26px] font-bold leading-tight">Veja Como o ProMove<br /><span className="text-primary">Transforma Pessoas</span></h1>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {[["1M+", "pessoas aprenderam novas habilidades"], ["240k+", "conquistaram certificados de IA"], ["90%", "de avaliações positivas"]].map(([n, l]) => (
          <div key={n} className="rounded-xl bg-accent p-3 animate-in zoom-in-90 duration-500">
            <div className="font-display text-2xl font-bold text-primary">{n}</div>
            <div className="text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
      <h2 className="font-display mt-8 text-center text-xl font-bold">Ouça o Que Outros Estão<br />Dizendo Sobre o ProMove</h2>
      <div className="mt-4 flex flex-col gap-4">
        <Card>
          <Head img="monica-g.webp" name="Michelle. J" sub="Pensilvânia • 1 avaliação • 0 votos úteis" />
          <div className="mt-3 flex items-center justify-between"><span className="text-star text-lg">★★★★★</span><span className="text-xs text-muted-foreground">8 de outubro de 2025 · Solicitada</span></div>
          <p className="mt-2">As aulas são construídas em torno de situações reais, então é fácil imaginar como usá-las no dia a dia do trabalho. Também gostei da orientação prática sobre como escrever prompts claros para obter resultados úteis e relevantes, mantendo sempre o uso responsável e ético da IA.</p>
          <p className="mt-2 text-xs text-muted-foreground"><b>Data da experiência:</b> 7 de outubro de 2025</p>
        </Card>
        <Card>
          <Head img="olivia-w.webp" name="Olivia. W · 3rd+" sub="Estudante de Direito · 2 meses" />
          <div className="mt-3 space-y-2">
            <p>✨ Encerrei um ciclo de aprendizado muito divertido ✨</p>
            <p>Acabei de concluir uma trilha de IA no ProMove e ela cobriu:</p>
            <p>✅ Jasper AI – formas práticas de melhorar a escrita de conteúdos<br />✅ DeepSeek AI – evoluir no raciocínio e na resolução de problemas<br />✅ Desafio de IA de 28 Dias – prática diária para usar IA de forma consistente</p>
            <p>O que eu mais gostei é que não foi só "teoria de IA". Mostrou como aplicar prompts em situações reais e criar hábitos que posso continuar usando na faculdade e no trabalho.</p>
            <p>Valeu, ProMove, por manter tudo estruturado e fácil de seguir.</p>
            <p>Ansiosa para continuar usando essas habilidades em projetos reais e seguir explorando.</p>
          </div>
        </Card>
        <Card>
          <Head img="susana-m.webp" name="Susan. M · 3rd+" sub="Estudante de Marketing ... · 3 meses" />
          <div className="mt-3 space-y-2">
            <p>Neste verão dediquei mais de 40 horas aprendendo IA pelo ProMove e acabei conquistando certificados em várias ferramentas principais de IA. Muito grata à equipe do meu estágio por me incentivar a realmente investir tempo nisso.</p>
            <p>Ao longo do programa, usei IA para rascunhos de conteúdo, pesquisas mais rápidas e ideias de campanha. As partes práticas me ajudaram a entender a escrita de prompts, geração de imagens e quando usar ferramentas de texto ou de imagem.</p>
            <p>Certificada em:<br />• Claude<br />• DALL·E<br />• DeepSeek<br />• Jasper<br />• Midjourney<br />• ChatGPT<br />• Stable Diffusion</p>
            <p>Me sinto muito mais confiante usando IA no meu dia a dia, e estou animada para continuar evoluindo.</p>
            <p>Os certificados estão na seção Licenças e Certificações do meu perfil</p>
            <p className="text-link">#IA #CertificaçãoEmIA #DesenvolvimentoProfissional #ProMove #Marketing #IAGenerativa</p>
          </div>
        </Card>
        <Card>
          <Head img="roberto-t.webp" name="Ross. T" sub="@Ross. T" />
          <div className="mt-3 space-y-2">
            <p>Oi Eri!</p>
            <p>Pois é. Comecei a treinar com o ProMove esta semana. Sinceramente, não imaginava o quanto isso poderia acelerar meu fluxo de trabalho até experimentar. Ainda é o começo, mas já estou conseguindo melhores resultados mais rápido.</p>
            <p>Você pode ignorar tudo isso e ficar para trás, ou aprender de verdade a usar e se manter afiado. Hora de colocar para funcionar.</p>
            <p className="text-xs text-muted-foreground">9h41 · 13 out 2025 · 80 visualizações</p>
          </div>
        </Card>
      </div>
      <CtaButton to="/onboarding/spin">Continuar</CtaButton>
    </Page>
  );
}
