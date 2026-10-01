import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { ShopBrowser } from "@/components/site/ShopBrowser";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — StyleNest" },
      {
        name: "description",
        content: "The latest StyleNest pieces: fresh outerwear, knitwear, dresses and accessories.",
      },
      { property: "og:title", content: "New Arrivals — StyleNest" },
      { property: "og:description", content: "The newest additions to the StyleNest collection." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Just landed"
        title="New Arrivals"
        description="Fresh off the workshop floor — the newest cuts, colours and fabrics in the collection."
      >
        <Breadcrumbs items={[{ label: "New Arrivals" }]} />
      </PageHeader>
      <ShopBrowser pool={products.filter((p) => p.tags.includes("new"))} />
    </SiteLayout>
  );
}
