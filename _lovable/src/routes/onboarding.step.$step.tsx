import { createFileRoute, notFound } from "@tanstack/react-router";
import { FunnelFlow } from "@/components/funnel-flow";
import { STEPS } from "@/lib/steps";

export const Route = createFileRoute("/onboarding/step/$step")({
  loader: ({ params }) => {
    const n = Number(params.step);
    if (!Number.isInteger(n) || n < 1 || n > STEPS.length) throw notFound();
    return { n };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? STEPS[loaderData.n - 1] : undefined;
    const t = `${s?.title ?? "Pergunta"} — ProMove`;
    return {
      meta: [
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
        { title: t },
        { name: "description", content: s?.subtitle ?? "ProMove quiz" },
        { property: "og:title", content: t },
        { property: "og:description", content: s?.subtitle ?? "ProMove quiz" },
      ],
    };
  },
  component: FunnelEntry,
});

function FunnelEntry() {
  const { n } = Route.useLoaderData();
  return <FunnelFlow initialStage={`/onboarding/step/${n}`} />;
}
