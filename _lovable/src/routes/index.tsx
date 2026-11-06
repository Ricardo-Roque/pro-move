import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "ProMove — Seu caminho de IA" },
      { name: "description", content: "Responda algumas perguntas e receba seu programa de certificação em IA de 28 dias." },
      { property: "og:title", content: "ProMove — Seu caminho de IA" },
      { property: "og:description", content: "Seu programa personalizado de certificação em IA de 28 dias." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/" />;
}
