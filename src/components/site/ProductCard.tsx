import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { discountPercent, formatPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Rating } from "@/components/site/Rating";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const discount = discountPercent(product);
  const saved = inWishlist(product.id);

  return (
    <article className="group relative">
      <Link
        to={"/product/$id" as never}
        params={{ id: product.id } as never}
        className="block overflow-hidden rounded-sm bg-surface"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.tags.includes("new") && (
              <span className="bg-primary px-2.5 py-1 text-[10px] tracking-[0.16em] text-primary-foreground uppercase">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="bg-sale px-2.5 py-1 text-[10px] tracking-[0.16em] text-sale-foreground uppercase">
                -{discount}%
              </span>
            )}
          </div>
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, product.sizes[0] ?? "", product.colors[0]?.name ?? "");
                toast.success("Added to bag", { description: product.name });
              }}
              className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-[11px] tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-accent"
            >
              <ShoppingBag className="size-3.5" /> Add to bag
            </button>
          </div>
        </div>
      </Link>

      <button
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => {
          toggleWishlist(product.id);
          toast(saved ? "Removed from wishlist" : "Saved to wishlist");
        }}
        className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-soft transition-colors hover:text-accent"
      >
        <Heart className={cn("size-4", saved && "fill-accent text-accent")} />
      </button>

      <div className="mt-4 space-y-1.5">
        <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          {product.brand}
        </p>
        <h3 className="font-sans text-sm leading-snug font-medium">
          <Link to={"/product/$id" as never} params={{ id: product.id } as never} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <Rating value={product.rating} count={product.reviews} />
        <p className="flex items-baseline gap-2 text-sm">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-border py-24 text-center">
        <p className="text-display text-2xl">Nothing matches those filters</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try widening your selection or clearing a filter.
        </p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
