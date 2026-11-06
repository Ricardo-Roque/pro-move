import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/solution-pitch-page")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "IA é Mais Fácil do que Você Imagina — ProMove" },
      { name: "description", content: "Nosso programa de certificação transforma seu conhecimento em IA desde o primeiro dia." },
      { property: "og:title", content: "IA é Mais Fácil do que Você Imagina — ProMove" },
      { property: "og:description", content: "Experimente o ProMove: todas as ferramentas de IA, certificação e mais de 1.000 prompts." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/solution-pitch-page" />;
}
