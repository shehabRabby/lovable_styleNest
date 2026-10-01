import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs, PageHeader } from "@/components/site/Bits";
import { ShopBrowser } from "@/components/site/ShopBrowser";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Sale — Up to 30% Off | StyleNest" },
      {
        name: "description",
        content:
          "StyleNest sale: reduced coats, cashmere knits, silk dresses and leather shoes while stock lasts.",
      },
      { property: "og:title", content: "Sale — Up to 30% Off | StyleNest" },
      {
        property: "og:description",
        content: "Reduced coats, cashmere, silk and leather while stock lasts.",
      },
    ],
  }),
  component: Sale,
});

function Sale() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Final reductions"
        title="Sale"
        description="Archive pieces and end-of-run sizes, reduced by up to 30%. No codes needed — prices shown are final."
      >
        <Breadcrumbs items={[{ label: "Sale" }]} />
      </PageHeader>
      <ShopBrowser pool={products.filter((p) => p.tags.includes("sale"))} />
    </SiteLayout>
  );
}
