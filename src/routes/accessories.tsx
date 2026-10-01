import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/accessories")({
  head: () => categoryHead("accessories"),
  component: () => <CategoryPage slug="accessories" />,
});
