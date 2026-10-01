import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Women", to: "/women" },
      { label: "Men", to: "/men" },
      { label: "Kids", to: "/kids" },
      { label: "Shoes", to: "/shoes" },
      { label: "Accessories", to: "/accessories" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "New Arrivals", to: "/new-arrivals" },
      { label: "Sale", to: "/sale" },
      { label: "All Products", to: "/shop" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", to: "/account" },
      { label: "My Orders", to: "/account/orders" },
      { label: "Addresses", to: "/account/addresses" },
      { label: "Sign In", to: "/login" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="text-display text-3xl">StyleNest</span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Considered wardrobe essentials made in small runs with natural fibres. Designed in
            Copenhagen, crafted across Portugal, Italy and Spain.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <span
                key={i}
                className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-eyebrow text-muted-foreground">{col.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to as never} className="link-underline transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 StyleNest. All rights reserved.</p>
          <p className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping & Returns</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
