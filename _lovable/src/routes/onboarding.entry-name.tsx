import { createFileRoute } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";

export const Route = createFileRoute("/onboarding/entry-name")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Como devemos te chamar? — ProMove" },
      { name: "description", content: "Conte seu nome para personalizar seu programa de IA." },
      { property: "og:title", content: "Como devemos te chamar? — ProMove" },
      { property: "og:description", content: "Personalize seu programa de certificação em IA." },
    ],
  }),
  component: FunnelEntry,
});

function FunnelEntry() {
  return <FunnelFlow initialStage="/onboarding/entry-name" />;
}
