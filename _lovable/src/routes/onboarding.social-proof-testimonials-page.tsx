import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/social-proof-testimonials-page")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Veja Como o ProMove Transforma Pessoas — ProMove" },
      { name: "description", content: "Mais de 1 milhão de pessoas aprenderam novas habilidades e 240 mil conquistaram certificados de IA." },
      { property: "og:title", content: "Veja Como o ProMove Transforma Pessoas" },
      { property: "og:description", content: "Ouça o que outros estão dizendo sobre o ProMove." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/social-proof-testimonials-page" />;
}
