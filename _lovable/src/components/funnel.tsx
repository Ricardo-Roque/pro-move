import { ChevronLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFunnelControls } from "@/lib/funnel-navigation";
import logoUrl from "@/assets/logo.png";

export function Logo() {
  return <img src={logoUrl} alt="ProMove" className="h-[23px] w-auto" />;
}

export function TopBar({ back = true, right, menu }: { back?: boolean; right?: ReactNode; menu?: boolean }) {
  const { navigate, back: goBack } = useFunnelControls();
  return (
    <div className="relative flex h-11 items-center justify-center">
      {back && (
        <Button variant="ghost" size="icon"
          aria-label="Voltar"
          onClick={goBack}
          className="absolute left-2 p-2 text-foreground"
        >
          <ChevronLeft className="size-5" />
        </Button>
      )}
      <Button variant="ghost" onClick={() => navigate({ to: "/" })} aria-label="ProMove — Início">
        <Logo />
      </Button>
      {right && <div className="absolute right-2 text-sm font-semibold">{right}</div>}
      {menu && (
        <div className="absolute right-2 flex flex-col gap-[5px] p-2" aria-hidden>
          <span className="h-[2px] w-4 bg-foreground" />
          <span className="h-[2px] w-4 bg-foreground" />
          <span className="h-[2px] w-4 bg-foreground" />
        </div>
      )}
    </div>
  );
}

export function ProgressLine({ value }: { value: number }) {
  return (
    <div className="h-1 w-full rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}

export function Segments({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i < active ? "bg-primary" : "bg-muted")}
        />
      ))}
    </div>
  );
}

export function Page({ children, header, full }: { children: ReactNode; header?: ReactNode; full?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      {full && <div className="border-b border-border">{header}</div>}
      <div className="mx-auto w-full max-w-[608px] px-0">
        {!full && header}
        <main className="animate-in fade-in slide-in-from-bottom-4 px-4 pb-32 pt-6 duration-500">{children}</main>
      </div>
    </div>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cn("font-display text-center text-[26px] font-bold leading-tight text-foreground", className)}>
      {children}
    </h1>
  );
}

export function Subtitle({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-center text-[15px] font-medium text-muted-foreground">{children}</p>;
}

export function CtaButton({
  children,
  onClick,
  to,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const { navigate } = useFunnelControls();
  const cls =
    "flex h-[52px] w-full items-center justify-center rounded-xl bg-primary text-base font-bold uppercase text-primary-foreground shadow-cta transition active:translate-y-[3px] active:shadow-none disabled:opacity-50";
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background via-background to-transparent px-1 pb-4 pt-6">
      <div className="mx-auto max-w-[600px]">
          <Button type={type} onClick={to ? () => navigate({ to }) : onClick} disabled={disabled} className={cls}>
            {children}
          </Button>
      </div>
    </div>
  );
}

export function OptionRow({ emoji, label, onSelect }: { emoji: string; label: string; onSelect: () => void }) {
  const [picked, setPicked] = useState(false);
  return (
    <button
      onClick={() => {
        setPicked(true);
        setTimeout(onSelect, 280);
      }}
      className={cn(
        "flex min-h-[88px] w-full items-center gap-3 rounded-xl border bg-card px-3 text-left shadow-option transition-all hover:border-primary/60 active:translate-y-[2px]",
        picked ? "border-primary bg-accent" : "border-border",
      )}
    >
      <span className="w-[60px] text-center text-[46px] leading-none">{emoji}</span>
      <span className="text-[16px] font-semibold text-foreground">{label}</span>
    </button>
  );
}

export function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("pt-BR", { month: "long", day: "numeric", year: "numeric" });
}
