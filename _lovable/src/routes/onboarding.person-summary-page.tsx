import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/person-summary-page")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Seu Resumo Pessoal — ProMove" },
      { name: "description", content: "Seu nível de habilidades em IA e seu potencial com base nas suas respostas." },
      { property: "og:title", content: "Seu Resumo Pessoal — ProMove" },
      { property: "og:description", content: "Suas respostas indicam alto potencial para dominar a IA." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/person-summary-page" />;
}
