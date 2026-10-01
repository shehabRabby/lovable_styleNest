import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PackageCheck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/Bits";
import { ProductGrid } from "@/components/site/ProductCard";
import { Rating } from "@/components/site/Rating";
import { byTag, categories, images, reviewsFeed } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StyleNest — Style That Speaks" },
      {
        name: "description",
        content:
          "Shop StyleNest: premium coats, cashmere knitwear, hand-finished leather shoes and accessories for women, men and kids.",
      },
      { property: "og:title", content: "StyleNest — Style That Speaks" },
      {
        property: "og:description",
        content:
          "Premium coats, cashmere knitwear, leather shoes and accessories, made in small runs.",
      },
    ],
  }),
  component: Home,
});

const perks = [
  { icon: PackageCheck, title: "Free Shipping", text: "On every order over $250, worldwide." },
  { icon: ShieldCheck, title: "Secure Payment", text: "Encrypted checkout, no card stored." },
  { icon: RotateCcw, title: "Easy Returns", text: "30 days, free pickup from your door." },
  { icon: Headphones, title: "24/7 Support", text: "Real stylists, replying within an hour." },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-24">
          <div className="max-w-xl">
            <p className="text-eyebrow text-accent">Autumn / Winter 2026</p>
            <h1 className="text-display mt-5 text-5xl leading-[1.05] md:text-7xl">
              Style That <span className="italic">Speaks</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Quietly confident wardrobe pieces in cashmere, camel hair and washed silk — cut in
              small runs, built to outlast the season.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/women"
                className="group flex items-center gap-2 bg-primary px-8 py-4 text-[11px] tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-accent"
              >
                Shop Women
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/men"
                className="group flex items-center gap-2 border border-primary px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Shop Men
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-12 flex gap-10 border-t border-border pt-7">
              {[
                ["18k+", "Happy customers"],
                ["4.8/5", "Average rating"],
                ["30 days", "Free returns"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-display text-2xl">{v}</p>
                  <p className="mt-1 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={images.hero}
              alt="Model wearing a silk-blend belted trench coat"
              width={1600}
              height={1200}
              className="aspect-[4/5] w-full rounded-sm object-cover lg:aspect-[4/4.4]"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Shop by category"
          title="Five edits, one wardrobe"
          action={{ label: "View all", to: "/shop" }}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/${c.slug}` as never}
              className="group relative overflow-hidden rounded-sm"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/5 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-primary-foreground">
                <h3 className="text-display text-xl">{c.name}</h3>
                <p className="mt-0.5 text-[11px] opacity-80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container-page py-8">
        <SectionHeading
          eyebrow="Most wanted"
          title="Trending now"
          action={{ label: "Shop all", to: "/shop" }}
        />
        <ProductGrid products={byTag("trending", 4)} />
      </section>

      {/* New arrivals */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Just landed"
          title="New arrivals"
          action={{ label: "See everything new", to: "/new-arrivals" }}
        />
        <ProductGrid products={byTag("new", 4)} />
      </section>

      {/* Promo */}
      <section className="relative">
        <div className="relative overflow-hidden">
          <img
            src={images.promo}
            alt="Autumn campaign"
            loading="lazy"
            className="h-[460px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/25 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page">
              <div className="max-w-md text-primary-foreground">
                <p className="text-eyebrow">The Camel Edit</p>
                <h2 className="text-display mt-4 text-4xl md:text-5xl">
                  Up to 30% off outerwear
                </h2>
                <p className="mt-4 text-sm opacity-90">
                  Our seasonal campaign brings the coat archive forward — camel hair, double-faced
                  wool and silk-blend trenches, reduced through Sunday.
                </p>
                <Link
                  to="/sale"
                  className="mt-8 inline-flex items-center gap-2 bg-background px-8 py-4 text-[11px] tracking-[0.2em] text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Shop Now <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-page py-20">
        <SectionHeading
          eyebrow="Loved by thousands"
          title="Best sellers"
          action={{ label: "Shop all", to: "/shop" }}
        />
        <ProductGrid products={byTag("bestseller", 4)} />
      </section>

      {/* Why choose us */}
      <section className="border-y border-border bg-surface">
        <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title}>
              <p.icon className="size-6 text-accent" />
              <h3 className="mt-4 font-sans text-sm font-medium tracking-[0.08em] uppercase">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="container-page py-20">
        <SectionHeading eyebrow="Customer reviews" title="What people are wearing" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviewsFeed.map((r) => (
            <figure key={r.name} className="rounded-sm border border-border bg-card p-7 shadow-soft">
              <Rating value={r.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-6 text-xs text-muted-foreground">
                {r.name} · {r.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page pb-4">
        <div className="rounded-sm bg-primary px-6 py-16 text-center text-primary-foreground md:px-16">
          <p className="text-eyebrow opacity-70">Stay in the loop</p>
          <h2 className="text-display mx-auto mt-4 max-w-xl text-3xl md:text-4xl">
            Early access to new drops and private sales
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're subscribed", {
                description: "Watch your inbox for the next drop.",
              });
              (e.target as HTMLFormElement).reset();
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              required
              type="email"
              placeholder="your@email.com"
              className="h-12 border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <button
              type="submit"
              className="h-12 bg-background px-7 text-[11px] tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs opacity-60">No spam. Unsubscribe in one click.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
