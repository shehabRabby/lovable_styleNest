import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/women")({
  head: () => categoryHead("women"),
  component: () => <CategoryPage slug="women" />,
});
