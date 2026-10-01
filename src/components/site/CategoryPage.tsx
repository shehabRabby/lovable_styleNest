import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs } from "@/components/site/Bits";
import { ShopBrowser } from "@/components/site/ShopBrowser";
import { categories, products, type CategorySlug } from "@/lib/catalog";

export function CategoryPage({ slug }: { slug: CategorySlug }) {
  const category = categories.find((c) => c.slug === slug)!;
  const pool = products.filter((p) => p.category === slug);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-[320px] w-full object-cover md:h-[400px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-page pb-10 text-primary-foreground">
            <p className="text-eyebrow opacity-80">{category.blurb}</p>
            <h1 className="text-display mt-3 text-4xl md:text-6xl">{category.name}</h1>
            <p className="mt-4 max-w-lg text-sm opacity-90">{category.description}</p>
          </div>
        </div>
      </section>

      <div className="border-b border-border">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5">
          <Breadcrumbs items={[{ label: "Shop", to: "/shop" }, { label: category.name }]} />
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((s) => (
              <span
                key={s}
                className="border border-border px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors hover:border-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ShopBrowser pool={pool} lockedCategory={slug} />

      <div className="container-page pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm">
          <p className="text-muted-foreground">Looking for something else?</p>
          <div className="flex flex-wrap gap-4">
            {categories
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}` as never}
                  className="link-underline text-[11px] tracking-[0.16em] uppercase hover:text-accent"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export function categoryHead(slug: CategorySlug) {
  const c = categories.find((x) => x.slug === slug)!;
  const title = `${c.name} — StyleNest`;
  const description = c.description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  };
}
