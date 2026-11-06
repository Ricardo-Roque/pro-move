import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/selling")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Escolha seu Programa de Certificação em IA — ProMove" },
      { name: "description", content: "Seu programa pessoal de IA está pronto. Escolha seu plano com o desconto da roleta." },
      { property: "og:title", content: "Escolha seu Programa de Certificação em IA — ProMove" },
      { property: "og:description", content: "Conheça seu programa pessoal de IA e escolha seu plano." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/selling" />;
}
