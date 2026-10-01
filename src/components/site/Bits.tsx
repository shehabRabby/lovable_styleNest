import { Link } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
      <Link to="/" className="hover:text-accent">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="size-3" />
          {item.to ? (
            <Link to={item.to as never} params={item.params as never} className="hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        {eyebrow && <p className="text-eyebrow text-accent">{eyebrow}</p>}
        <h2 className="text-display mt-2 text-3xl md:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          to={action.to as never}
          className="link-underline text-[11px] tracking-[0.18em] uppercase hover:text-accent"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center border border-border", className)}>
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="px-3 py-2.5 transition-colors hover:bg-muted disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus className="size-3.5" />
      </button>
      <span className="w-10 text-center text-sm tabular-nums">{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="px-3 py-2.5 transition-colors hover:bg-muted disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="container-page py-12 md:py-16">
        {children}
        {eyebrow && <p className="text-eyebrow mt-6 text-accent">{eyebrow}</p>}
        <h1 className="text-display mt-2 text-4xl md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function Pager({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="border border-border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors hover:bg-muted disabled:opacity-40"
      >
        Prev
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "size-9 border text-sm transition-colors",
            p === page
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-muted",
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="border border-border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors hover:bg-muted disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
