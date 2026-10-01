import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Kids", to: "/kids" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Sale", to: "/sale" },
] as const;

export function Navbar() {
  const { cartCount, wishlist } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: query || undefined } });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="hidden bg-primary py-2 text-center text-[11px] tracking-[0.18em] text-primary-foreground uppercase md:block">
        Complimentary shipping on orders over $250 · 30-day returns
      </div>
      <nav className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <div className="flex items-center gap-2 lg:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="-ml-2 rounded-sm p-2 transition-colors hover:bg-muted"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-border px-6 py-5">
                  <span className="text-display text-2xl">StyleNest</span>
                </div>
                <form onSubmit={submitSearch} className="border-b border-border px-6 py-4">
                  <div className="relative">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products"
                      className="pl-9"
                    />
                  </div>
                </form>
                <div className="flex flex-col px-6 py-4">
                  {links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-border/60 py-3.5 text-base transition-colors last:border-0 hover:text-accent"
                      activeProps={{ className: "text-accent" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-3 border-t border-border text-center text-xs">
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="py-4 hover:bg-muted"
                  >
                    Account
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="border-x border-border py-4 hover:bg-muted"
                  >
                    Wishlist
                  </Link>
                  <Link to="/cart" onClick={() => setMenuOpen(false)} className="py-4 hover:bg-muted">
                    Cart
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="text-display text-2xl leading-none lg:text-[1.75rem]">
          StyleNest
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={cn(
                  "link-underline text-[13px] tracking-[0.1em] uppercase transition-colors hover:text-accent",
                  l.label === "Sale" && "text-sale",
                )}
                activeProps={{ className: "text-accent" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-sm p-2 transition-colors hover:bg-muted"
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-sm p-2 transition-colors hover:bg-muted"
          >
            <Heart className="size-5" />
            {wishlist.length > 0 && <Dot count={wishlist.length} />}
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative rounded-sm p-2 transition-colors hover:bg-muted"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && <Dot count={cartCount} />}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="rounded-sm p-2 transition-colors hover:bg-muted"
          >
            <User className="size-5" />
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-border bg-background">
          <form onSubmit={submitSearch} className="container-page py-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for coats, loafers, silk…"
                className="h-12 pl-11"
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
}

function Dot({ count }: { count: number }) {
  return (
    <span className="absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
      {count > 9 ? "9+" : count}
    </span>
  );
}
