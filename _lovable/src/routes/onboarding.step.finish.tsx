import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/step/finish")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Criando seu Programa de Certificação Pessoal — ProMove" },
      { name: "description", content: "Estamos criando seu programa pessoal de certificação em IA de 28 dias." },
      { property: "og:title", content: "Criando seu programa — ProMove" },
      { property: "og:description", content: "Mais de 2.000.000 de pessoas escolheram o ProMove." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/step/finish" />;
}
