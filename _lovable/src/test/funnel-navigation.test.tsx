import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FunnelFlow } from "@/components/funnel-flow";
import { FUNNEL_STAGES } from "@/lib/funnel-navigation";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Funnel keeps the entry URL", () => {
  it("advances through all 22 stages without changing path, search, or hash", async () => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/?origem=teste");
    const entryUrl = window.location.href;
    render(<FunnelFlow />);
    fireEvent.click(screen.getByRole("button", { name: "Trabalho para uma empresa" }));
    await act(async () => { vi.advanceTimersByTime(300); });
    expect(window.location.href).toBe(entryUrl);
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    for (let i = 0; i < 12; i++) {
      const option = screen.getAllByRole("button").find((button) => !button.getAttribute("aria-label"));
      if (!option) throw new Error(`Missing answer for question ${i + 1}`);
      fireEvent.click(option);
      await act(async () => { vi.advanceTimersByTime(300); });
      expect(window.location.href).toBe(entryUrl);
    }
    await act(async () => { vi.advanceTimersByTime(7100); });
    await act(async () => { vi.advanceTimersByTime(600); });
    fireEvent.change(screen.getByPlaceholderText("Seu nome"), { target: { value: "Ana" } });
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    for (let i = 0; i < 4; i++) {
      expect(window.location.href).toBe(entryUrl);
      fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Girar" }));
    await act(async () => { vi.advanceTimersByTime(5300); });
    fireEvent.click(screen.getByRole("button", { name: "Resgatar meu desconto" }));
    expect(screen.queryByPlaceholderText("Seu e-mail")).not.toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: "Escolha seu plano" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Plano de 4 semanas" })).toBeChecked();
    expect(window.location.href).toBe(entryUrl);
    expect(FUNNEL_STAGES).toHaveLength(22);
  });

  it("allows plan selection after the wheel without asking for an email or changing the URL", async () => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/?campanha=teste");
    const entryUrl = window.location.href;
    render(<FunnelFlow initialStage="/onboarding/spin" />);
    fireEvent.click(screen.getByRole("button", { name: "Girar" }));
    await act(async () => { vi.advanceTimersByTime(5300); });
    fireEvent.click(screen.getByRole("button", { name: "Resgatar meu desconto" }));
    expect(document.querySelector('input[type="email"]')).toBeNull();
    expect(document.querySelectorAll('input[type="radio"][name="plan"]')).toHaveLength(1);
    fireEvent.click(screen.getByRole("radio", { name: "Plano de 4 semanas" }));
    expect(screen.getByRole("radio", { name: "Plano de 4 semanas" })).toBeChecked();
    expect(window.location.href).toBe(entryUrl);
  });

  it("returns to the previous screen without changing the entry URL", async () => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/onboarding/summary");
    render(<FunnelFlow initialStage="/onboarding/summary" />);
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));
    expect(screen.getByText('"Mais de 2.000.000"')).toBeInTheDocument();
    expect(window.location.pathname).toBe("/onboarding/summary");
  });
});