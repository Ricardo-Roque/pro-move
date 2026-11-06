import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/spin")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Gire e Garanta seu Programa de Certificação em IA — ProMove" },
      { name: "description", content: "Gire a roleta e receba um desconto personalizado no seu certificado de IA." },
      { property: "og:title", content: "Gire e Garanta seu Programa de Certificação em IA" },
      { property: "og:description", content: "Não perca a chance de receber uma oferta personalizada." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/spin" />;
}
