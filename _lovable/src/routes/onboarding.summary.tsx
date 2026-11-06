import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/summary")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Mais de 2.000.000 de pessoas — ProMove" },
      { name: "description", content: "Mais de 2.000.000 de pessoas entraram no ProMove para dominar a IA." },
      { property: "og:title", content: "Mais de 2.000.000 de pessoas — ProMove" },
      { property: "og:description", content: "Pessoas entraram no ProMove para dominar a IA." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/summary" />;
}
