import { useFunnelNavigation } from "@/lib/funnel-navigation";
import { useState } from "react";
import { CtaButton, Page, Title, TopBar } from "@/components/funnel";



export function EntryName() {
  const navigate = useFunnelNavigation();
  const [name, setName] = useState("");
  return (
    <Page header={<TopBar />}>
      <form
        className="px-4"
        onSubmit={(e) => {
          e.preventDefault();
          sessionStorage.setItem("pm_name", name.trim());
          navigate({ to: "/onboarding/person-summary-page" });
        }}
      >
        <Title>Como devemos te chamar?</Title>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          maxLength={50}
          className="mt-8 h-14 w-full rounded-xl border border-input bg-card px-4 text-lg outline-none focus:border-primary"
        />
        <CtaButton type="submit" disabled={!name.trim()}>Continuar</CtaButton>
      </form>
    </Page>
  );
}
