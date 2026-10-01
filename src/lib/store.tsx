import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "@/lib/catalog";

export type CartLine = {
  key: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  inWishlist: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "stylenest.cart";
const WISH_KEY = "stylenest.wishlist";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreValue>(() => {
    const subtotal = cart.reduce((sum, line) => {
      const product = getProduct(line.productId);
      return sum + (product ? product.price * line.quantity : 0);
    }, 0);

    return {
      cart,
      wishlist,
      subtotal,
      cartCount: cart.reduce((n, l) => n + l.quantity, 0),
      addToCart: (product, size, color, quantity = 1) =>
        setCart((prev) => {
          const key = `${product.id}|${size}|${color}`;
          const existing = prev.find((l) => l.key === key);
          if (existing) {
            return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l));
          }
          return [...prev, { key, productId: product.id, size, color, quantity }];
        }),
      updateQuantity: (key, quantity) =>
        setCart((prev) =>
          prev.flatMap((l) =>
            l.key === key ? (quantity <= 0 ? [] : [{ ...l, quantity }]) : [l],
          ),
        ),
      removeLine: (key) => setCart((prev) => prev.filter((l) => l.key !== key)),
      clearCart: () => setCart([]),
      toggleWishlist: (productId) =>
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        ),
      inWishlist: (productId) => wishlist.includes(productId),
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const SHIPPING_FLAT = 12;
export const FREE_SHIPPING_THRESHOLD = 250;

export function shippingFor(subtotal: number) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}
