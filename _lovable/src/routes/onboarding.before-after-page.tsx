import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/before-after-page")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Seu Programa Pessoal de Certificação em IA de 28 Dias — ProMove" },
      { name: "description", content: "Veja onde você está agora e onde vai chegar com o ProMove." },
      { property: "og:title", content: "Seu Programa de 28 Dias — ProMove" },
      { property: "og:description", content: "Antes e depois do ProMove." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/before-after-page" />;
}
