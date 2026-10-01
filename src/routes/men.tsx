import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/men")({
  head: () => categoryHead("men"),
  component: () => <CategoryPage slug="men" />,
});
