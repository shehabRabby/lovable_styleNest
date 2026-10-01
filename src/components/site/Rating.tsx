import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
  className,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const star = size === "md" ? "size-4" : "size-3.5";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              star,
              i <= Math.round(value) ? "fill-accent text-accent" : "text-border",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
