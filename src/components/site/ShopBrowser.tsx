import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";
import {
  allBrands,
  allColors,
  categories,
  formatPrice,
  products as allProducts,
  type Product,
} from "@/lib/catalog";
import { ProductGrid } from "@/components/site/ProductCard";
import { Pager } from "@/components/site/Bits";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const genders = ["women", "men", "kids", "unisex"] as const;
const sizeGroups = ["XS", "S", "M", "L", "XL", "38", "40", "42", "One Size"];
const PER_PAGE = 8;

export type ShopFilters = {
  pool?: Product[];
  lockedCategory?: string;
  lockedSubcategories?: string[];
  initialQuery?: string;
};

export function ShopBrowser({ pool, lockedCategory, initialQuery = "" }: ShopFilters) {
  const source = pool ?? allProducts;
  const [query, setQuery] = useState(initialQuery);
  const [cats, setCats] = useState<string[]>([]);
  const [gens, setGens] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const toggle = (list: string[], set: (v: string[]) => void, value: string) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = source.filter((p) => {
      if (q && !`${p.name} ${p.brand} ${p.subcategory}`.toLowerCase().includes(q)) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (gens.length && !gens.includes(p.gender)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...result].sort(
          (a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")),
        );
      default:
        return result;
    }
  }, [source, query, cats, gens, sizes, colors, brands, maxPrice, minRating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeCount =
    cats.length +
    gens.length +
    sizes.length +
    colors.length +
    brands.length +
    (maxPrice < 500 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  function clearAll() {
    setCats([]);
    setGens([]);
    setSizes([]);
    setColors([]);
    setBrands([]);
    setMaxPrice(500);
    setMinRating(0);
    setPage(1);
  }

  const sidebar = (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-eyebrow">Filters</h2>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-accent hover:underline">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search products"
          className="pl-9"
        />
      </div>

      {!lockedCategory && (
        <FilterBlock title="Category">
          {categories.map((c) => (
            <CheckRow
              key={c.slug}
              label={c.name}
              checked={cats.includes(c.slug)}
              onChange={() => toggle(cats, setCats, c.slug)}
            />
          ))}
        </FilterBlock>
      )}

      <FilterBlock title="Gender">
        {genders.map((g) => (
          <CheckRow
            key={g}
            label={g[0].toUpperCase() + g.slice(1)}
            checked={gens.includes(g)}
            onChange={() => toggle(gens, setGens, g)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title="Size">
        <div className="flex flex-wrap gap-2">
          {sizeGroups.map((s) => (
            <button
              key={s}
              onClick={() => toggle(sizes, setSizes, s)}
              className={cn(
                "min-w-10 border px-2.5 py-1.5 text-xs transition-colors",
                sizes.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Colour">
        <div className="flex flex-wrap gap-3">
          {allColors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              aria-label={c.name}
              onClick={() => toggle(colors, setColors, c.name)}
              className={cn(
                "size-7 rounded-full border-2 transition-all",
                colors.includes(c.name)
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border hover:border-foreground",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Brand">
        {allBrands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={brands.includes(b)}
            onChange={() => toggle(brands, setBrands, b)}
          />
        ))}
      </FilterBlock>

      <FilterBlock title={`Price — up to ${formatPrice(maxPrice)}`}>
        <Slider
          value={[maxPrice]}
          min={40}
          max={500}
          step={10}
          onValueChange={([v]) => {
            setMaxPrice(v);
            setPage(1);
          }}
        />
      </FilterBlock>

      <FilterBlock title="Rating">
        {[4.5, 4, 3.5, 0].map((r) => (
          <CheckRow
            key={r}
            label={r === 0 ? "All ratings" : `${r} & up`}
            checked={minRating === r}
            onChange={() => {
              setMinRating(r);
              setPage(1);
            }}
          />
        ))}
      </FilterBlock>
    </div>
  );

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[260px_1fr] lg:py-16">
      <aside className="hidden lg:block">{sidebar}</aside>

      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing {current.length} of {filtered.length} products
          </p>
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger className="flex items-center gap-2 border border-border px-4 py-2.5 text-xs tracking-[0.14em] uppercase lg:hidden">
                <SlidersHorizontal className="size-3.5" /> Filters
                {activeCount > 0 && <span className="text-accent">({activeCount})</span>}
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-6">
                <SheetTitle className="sr-only">Filters</SheetTitle>
                {sidebar}
              </SheetContent>
            </Sheet>
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[185px] rounded-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {[...cats, ...gens, ...sizes, ...colors, ...brands].map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-1.5 bg-muted px-3 py-1.5 text-xs capitalize"
              >
                {chip}
                <X
                  className="size-3 cursor-pointer"
                  onClick={() => {
                    setCats(cats.filter((c) => c !== chip));
                    setGens(gens.filter((c) => c !== chip));
                    setSizes(sizes.filter((c) => c !== chip));
                    setColors(colors.filter((c) => c !== chip));
                    setBrands(brands.filter((c) => c !== chip));
                  }}
                />
              </span>
            ))}
          </div>
        )}

        <ProductGrid products={current} columns={3} />
        <Pager page={page} pages={pages} onChange={setPage} />
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-6">
      <h3 className="mb-4 text-xs font-medium tracking-[0.14em] uppercase">{title}</h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}
