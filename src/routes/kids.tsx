import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/kids")({
  head: () => categoryHead("kids"),
  component: () => <CategoryPage slug="kids" />,
});
