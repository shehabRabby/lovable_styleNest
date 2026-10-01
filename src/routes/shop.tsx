import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { ShopBrowser } from "@/components/site/ShopBrowser";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — StyleNest" },
      {
        name: "description",
        content:
          "Browse the full StyleNest collection: coats, knitwear, dresses, shoes and leather accessories, with filters for size, colour, price and rating.",
      },
      { property: "og:title", content: "Shop All — StyleNest" },
      {
        property: "og:description",
        content: "The full StyleNest collection with size, colour, price and rating filters.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q } = Route.useSearch();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The full collection"
        title="Shop All"
        description="Every piece we make, in one place. Filter by category, size, colour, price or rating to narrow it down."
      >
        <Breadcrumbs items={[{ label: "Shop" }]} />
      </PageHeader>
      <ShopBrowser key={q ?? "all"} initialQuery={q ?? ""} />
    </SiteLayout>
  );
}
