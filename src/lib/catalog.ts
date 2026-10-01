import heroImg from "@/assets/hero.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catShoes from "@/assets/cat-shoes.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";
import pTshirt from "@/assets/p-tshirt.jpg";
import promoImg from "@/assets/promo.jpg";

export const images = {
  hero: heroImg,
  promo: promoImg,
  women: catWomen,
  men: catMen,
  kids: catKids,
  shoes: catShoes,
  accessories: catAccessories,
  basics: pTshirt,
};

export type Gender = "women" | "men" | "kids" | "unisex";
export type CategorySlug = "women" | "men" | "kids" | "shoes" | "accessories";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: CategorySlug;
  gender: Gender;
  subcategory: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  gallery: string[];
  description: string;
  specs: { label: string; value: string }[];
  tags: ("trending" | "new" | "bestseller" | "sale")[];
};

const palette = {
  sand: { name: "Sand", hex: "#D9CDBB" },
  ivory: { name: "Ivory", hex: "#F3EFE7" },
  charcoal: { name: "Charcoal", hex: "#3A3A3C" },
  black: { name: "Black", hex: "#1C1B1A" },
  clay: { name: "Clay", hex: "#B07D56" },
  olive: { name: "Olive", hex: "#6E6B4B" },
};

const apparelSizes = ["XS", "S", "M", "L", "XL"];
const shoeSizes = ["38", "39", "40", "41", "42", "43"];
const oneSize = ["One Size"];

function specs(material: string, fit: string): { label: string; value: string }[] {
  return [
    { label: "Material", value: material },
    { label: "Fit", value: fit },
    { label: "Care", value: "Dry clean or cold gentle wash" },
    { label: "Origin", value: "Ethically made in Portugal" },
  ];
}

type Seed = Omit<Product, "gallery" | "specs"> & { material?: string; fit?: string };

const seeds: Seed[] = [
  {
    id: "signature-wool-overcoat",
    name: "Signature Wool Overcoat",
    brand: "StyleNest Atelier",
    price: 389,
    originalPrice: 480,
    rating: 4.8,
    reviews: 214,
    category: "men",
    gender: "men",
    subcategory: "Outerwear",
    colors: [palette.charcoal, palette.black, palette.sand],
    sizes: apparelSizes,
    image: images.men,
    description:
      "A tailored double-faced wool overcoat with a clean notch lapel and a softly structured shoulder. Cut long for an elongated silhouette that layers effortlessly over knitwear.",
    tags: ["bestseller", "trending", "sale"],
    material: "82% virgin wool, 18% cashmere",
    fit: "Relaxed tailored",
  },
  {
    id: "silk-blend-trench",
    name: "Silk-Blend Belted Trench",
    brand: "Maison Nord",
    price: 429,
    rating: 4.9,
    reviews: 168,
    category: "women",
    gender: "women",
    subcategory: "Outerwear",
    colors: [palette.ivory, palette.sand],
    sizes: apparelSizes,
    image: images.hero,
    description:
      "A fluid belted trench in a silk-touch blend that moves with you. Designed with a deep placket, storm flap and removable waist tie.",
    tags: ["trending", "new"],
    material: "56% silk, 44% viscose",
    fit: "Regular",
  },
  {
    id: "cashmere-crew-knit",
    name: "Cashmere Crew Knit",
    brand: "StyleNest Atelier",
    price: 198,
    originalPrice: 245,
    rating: 4.7,
    reviews: 341,
    category: "women",
    gender: "women",
    subcategory: "Knitwear",
    colors: [palette.sand, palette.ivory, palette.olive],
    sizes: apparelSizes,
    image: images.women,
    description:
      "Grade-A cashmere knitted to a dense, cloudlike gauge. Ribbed cuffs and hem hold their shape season after season.",
    tags: ["bestseller", "sale"],
    material: "100% Grade-A cashmere",
    fit: "Easy",
  },
  {
    id: "pleated-wide-trouser",
    name: "Pleated Wide-Leg Trouser",
    brand: "Atelier Rue",
    price: 165,
    rating: 4.6,
    reviews: 122,
    category: "women",
    gender: "women",
    subcategory: "Trousers",
    colors: [palette.sand, palette.charcoal],
    sizes: apparelSizes,
    image: images.women,
    description:
      "High-rise pleated trousers in a dry-touch twill, falling to a column-straight leg that skims the floor.",
    tags: ["new"],
    material: "Tencel-wool twill",
    fit: "Wide leg",
  },
  {
    id: "oxford-linen-shirt",
    name: "Washed Linen Shirt",
    brand: "Northbound",
    price: 95,
    rating: 4.5,
    reviews: 288,
    category: "men",
    gender: "men",
    subcategory: "Shirts",
    colors: [palette.ivory, palette.sand, palette.olive],
    sizes: apparelSizes,
    image: images.basics,
    description:
      "Garment-washed European linen with a soft collar and mother-of-pearl buttons. Breathable from the first wear.",
    tags: ["bestseller"],
    material: "100% European linen",
    fit: "Regular",
  },
  {
    id: "pima-cotton-tee",
    name: "Heavyweight Pima Tee",
    brand: "StyleNest Essentials",
    price: 45,
    originalPrice: 60,
    rating: 4.4,
    reviews: 512,
    category: "men",
    gender: "unisex",
    subcategory: "T-Shirts",
    colors: [palette.ivory, palette.black, palette.sand],
    sizes: apparelSizes,
    image: images.basics,
    description:
      "A 240gsm Peruvian pima tee with a clean set-in sleeve and a collar that refuses to curl.",
    tags: ["trending", "sale"],
    material: "100% Peruvian pima cotton",
    fit: "Classic",
  },
  {
    id: "hand-stitched-loafer",
    name: "Hand-Stitched Leather Loafer",
    brand: "Calzado Sur",
    price: 275,
    rating: 4.8,
    reviews: 196,
    category: "shoes",
    gender: "unisex",
    subcategory: "Loafers",
    colors: [palette.clay, palette.black],
    sizes: shoeSizes,
    image: images.shoes,
    description:
      "Blake-stitched calf leather loafers on a slim leather sole, finished with a hand-burnished patina.",
    tags: ["bestseller", "trending"],
    material: "Full-grain calf leather",
    fit: "True to size",
  },
  {
    id: "minimal-court-sneaker",
    name: "Minimal Court Sneaker",
    brand: "Calzado Sur",
    price: 185,
    originalPrice: 220,
    rating: 4.3,
    reviews: 143,
    category: "shoes",
    gender: "unisex",
    subcategory: "Sneakers",
    colors: [palette.ivory, palette.sand],
    sizes: shoeSizes,
    image: images.shoes,
    description:
      "An unlined court sneaker in vegetable-tanned leather with a cupsole that quiets every step.",
    tags: ["new", "sale"],
    material: "Vegetable-tanned leather",
    fit: "True to size",
  },
  {
    id: "structured-leather-tote",
    name: "Structured Leather Tote",
    brand: "Maison Nord",
    price: 340,
    rating: 4.9,
    reviews: 97,
    category: "accessories",
    gender: "women",
    subcategory: "Bags",
    colors: [palette.clay, palette.black],
    sizes: oneSize,
    image: images.accessories,
    description:
      "A day-to-evening tote with a reinforced base, suede-lined interior and polished brass hardware.",
    tags: ["trending", "bestseller"],
    material: "Vegetable-tanned Italian leather",
    fit: "Fits a 14\" laptop",
  },
  {
    id: "gold-signature-necklace",
    name: "Signature Coin Necklace",
    brand: "Atelier Rue",
    price: 120,
    rating: 4.6,
    reviews: 204,
    category: "accessories",
    gender: "women",
    subcategory: "Jewelry",
    colors: [palette.clay],
    sizes: oneSize,
    image: images.accessories,
    description:
      "A 14k gold-plated coin pendant on a fine cable chain, engraved with the StyleNest crest.",
    tags: ["new"],
    material: "14k gold-plated brass",
    fit: "45cm chain",
  },
  {
    id: "acetate-sunglasses",
    name: "Rounded Acetate Sunglasses",
    brand: "Northbound",
    price: 140,
    originalPrice: 175,
    rating: 4.2,
    reviews: 76,
    category: "accessories",
    gender: "unisex",
    subcategory: "Eyewear",
    colors: [palette.charcoal, palette.clay],
    sizes: oneSize,
    image: images.accessories,
    description:
      "Hand-polished Italian acetate frames with polarised lenses and sprung titanium hinges.",
    tags: ["sale"],
    material: "Italian acetate, polarised lenses",
    fit: "Medium",
  },
  {
    id: "kids-merino-sweater",
    name: "Kids Merino Sweater",
    brand: "StyleNest Little",
    price: 78,
    rating: 4.7,
    reviews: 88,
    category: "kids",
    gender: "kids",
    subcategory: "Knitwear",
    colors: [palette.sand, palette.ivory],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    image: images.kids,
    description:
      "Soft, non-itch merino knit with flat seams and reinforced elbows for everyday wear.",
    tags: ["bestseller", "new"],
    material: "100% machine-washable merino",
    fit: "Relaxed",
  },
  {
    id: "kids-canvas-trouser",
    name: "Kids Canvas Trouser",
    brand: "StyleNest Little",
    price: 54,
    originalPrice: 70,
    rating: 4.4,
    reviews: 61,
    category: "kids",
    gender: "kids",
    subcategory: "Trousers",
    colors: [palette.ivory, palette.olive],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    image: images.kids,
    description:
      "Durable organic canvas trousers with an adjustable waist and deep patch pockets.",
    tags: ["sale"],
    material: "Organic cotton canvas",
    fit: "Straight",
  },
  {
    id: "merino-turtleneck",
    name: "Fine Merino Turtleneck",
    brand: "StyleNest Atelier",
    price: 155,
    rating: 4.8,
    reviews: 173,
    category: "men",
    gender: "men",
    subcategory: "Knitwear",
    colors: [palette.olive, palette.black, palette.sand],
    sizes: apparelSizes,
    image: images.promo,
    description:
      "A featherweight merino roll-neck that layers invisibly under tailoring and stands alone just as well.",
    tags: ["trending", "new"],
    material: "100% extra-fine merino",
    fit: "Slim",
  },
  {
    id: "camel-wrap-coat",
    name: "Camel Wrap Coat",
    brand: "Maison Nord",
    price: 465,
    originalPrice: 580,
    rating: 4.9,
    reviews: 134,
    category: "women",
    gender: "women",
    subcategory: "Outerwear",
    colors: [palette.sand, palette.clay],
    sizes: apparelSizes,
    image: images.promo,
    description:
      "An unlined wrap coat in brushed camel hair, closing with a single self-tie belt for a sculpted waist.",
    tags: ["bestseller", "sale", "trending"],
    material: "Camel hair blend",
    fit: "Oversized",
  },
  {
    id: "woven-leather-belt",
    name: "Woven Leather Belt",
    brand: "Calzado Sur",
    price: 88,
    rating: 4.5,
    reviews: 59,
    category: "accessories",
    gender: "unisex",
    subcategory: "Belts",
    colors: [palette.clay, palette.black],
    sizes: ["80", "85", "90", "95"],
    image: images.accessories,
    description: "Hand-woven leather with a solid brass buckle that patinas beautifully with age.",
    tags: ["new"],
    material: "Hand-woven calf leather",
    fit: "Size up from waist",
  },
  {
    id: "tailored-wool-trouser",
    name: "Tailored Wool Trouser",
    brand: "Atelier Rue",
    price: 175,
    rating: 4.6,
    reviews: 101,
    category: "men",
    gender: "men",
    subcategory: "Trousers",
    colors: [palette.charcoal, palette.olive],
    sizes: apparelSizes,
    image: images.men,
    description: "A clean-front wool trouser with a mid rise and a gently tapered leg.",
    tags: ["bestseller"],
    material: "Super 110s wool",
    fit: "Tapered",
  },
  {
    id: "silk-slip-dress",
    name: "Bias-Cut Silk Slip Dress",
    brand: "Maison Nord",
    price: 295,
    originalPrice: 350,
    rating: 4.7,
    reviews: 150,
    category: "women",
    gender: "women",
    subcategory: "Dresses",
    colors: [palette.ivory, palette.olive, palette.black],
    sizes: apparelSizes,
    image: images.hero,
    description:
      "Cut on the bias from washed silk so it skims rather than clings. Adjustable straps, French seams throughout.",
    tags: ["trending", "new", "sale"],
    material: "100% washed mulberry silk",
    fit: "Bias",
  },
  {
    id: "suede-chelsea-boot",
    name: "Suede Chelsea Boot",
    brand: "Calzado Sur",
    price: 310,
    rating: 4.8,
    reviews: 118,
    category: "shoes",
    gender: "unisex",
    subcategory: "Boots",
    colors: [palette.clay, palette.charcoal],
    sizes: shoeSizes,
    image: images.shoes,
    description: "Italian suede with twin elastic gores and a Goodyear-welted commando sole.",
    tags: ["bestseller", "trending"],
    material: "Italian suede",
    fit: "Size down half",
  },
  {
    id: "organic-oxford-shirt",
    name: "Organic Oxford Shirt",
    brand: "Northbound",
    price: 105,
    originalPrice: 130,
    rating: 4.3,
    reviews: 204,
    category: "women",
    gender: "unisex",
    subcategory: "Shirts",
    colors: [palette.ivory, palette.sand],
    sizes: apparelSizes,
    image: images.basics,
    description: "A boyfriend-cut oxford in organic cotton that only softens with washing.",
    tags: ["sale", "new"],
    material: "Organic cotton oxford",
    fit: "Boyfriend",
  },
  {
    id: "kids-quilted-jacket",
    name: "Kids Quilted Jacket",
    brand: "StyleNest Little",
    price: 110,
    rating: 4.6,
    reviews: 44,
    category: "kids",
    gender: "kids",
    subcategory: "Outerwear",
    colors: [palette.olive, palette.sand],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    image: images.kids,
    description: "A lightly padded quilted jacket with a recycled shell and jersey-lined cuffs.",
    tags: ["new", "trending"],
    material: "Recycled polyester shell",
    fit: "Regular",
  },
  {
    id: "cotton-poplin-dress",
    name: "Cotton Poplin Midi Dress",
    brand: "Atelier Rue",
    price: 210,
    rating: 4.5,
    reviews: 87,
    category: "women",
    gender: "women",
    subcategory: "Dresses",
    colors: [palette.ivory, palette.sand],
    sizes: apparelSizes,
    image: images.women,
    description: "Crisp poplin with a gathered waist, covered buttons and generous side pockets.",
    tags: ["new"],
    material: "Compact cotton poplin",
    fit: "A-line",
  },
  {
    id: "leather-card-holder",
    name: "Slim Leather Card Holder",
    brand: "Maison Nord",
    price: 65,
    rating: 4.4,
    reviews: 132,
    category: "accessories",
    gender: "unisex",
    subcategory: "Small Leather Goods",
    colors: [palette.clay, palette.black],
    sizes: oneSize,
    image: images.accessories,
    description: "Four card slots and a centre pocket, skived to stay flat in any pocket.",
    tags: ["bestseller"],
    material: "Italian calf leather",
    fit: "Slim",
  },
  {
    id: "knit-ribbed-cardigan",
    name: "Ribbed Longline Cardigan",
    brand: "StyleNest Atelier",
    price: 230,
    originalPrice: 290,
    rating: 4.7,
    reviews: 165,
    category: "women",
    gender: "women",
    subcategory: "Knitwear",
    colors: [palette.sand, palette.charcoal],
    sizes: apparelSizes,
    image: images.women,
    description: "A longline rib cardigan with horn buttons and dropped shoulders for easy layering.",
    tags: ["sale", "bestseller"],
    material: "Wool-alpaca blend",
    fit: "Oversized",
  },
];

export const products: Product[] = seeds.map((s) => ({
  ...s,
  gallery: [s.image, images.promo, images.basics, s.image],
  specs: specs(s.material ?? "Premium blend", s.fit ?? "Regular"),
}));

export const categories: {
  slug: CategorySlug;
  name: string;
  image: string;
  blurb: string;
  description: string;
  subcategories: string[];
}[] = [
  {
    slug: "women",
    name: "Women",
    image: images.women,
    blurb: "Fluid tailoring and quiet luxury knits",
    description:
      "Considered silhouettes in silk, cashmere and camel hair. Pieces designed to be worn for a decade, not a season.",
    subcategories: ["Outerwear", "Knitwear", "Dresses", "Trousers", "Shirts"],
  },
  {
    slug: "men",
    name: "Men",
    image: images.men,
    blurb: "Soft tailoring, honest fabrics",
    description:
      "A modern wardrobe built on wool, linen and pima cotton — relaxed in cut, precise in construction.",
    subcategories: ["Outerwear", "Knitwear", "Shirts", "Trousers", "T-Shirts"],
  },
  {
    slug: "kids",
    name: "Kids",
    image: images.kids,
    blurb: "Hard-wearing, gentle on skin",
    description:
      "Machine-washable merino and organic canvas, finished with flat seams and adjustable waists.",
    subcategories: ["Knitwear", "Outerwear", "Trousers"],
  },
  {
    slug: "shoes",
    name: "Shoes",
    image: images.shoes,
    blurb: "Hand-finished leather, built to resole",
    description:
      "Blake-stitched and Goodyear-welted footwear from a family workshop in Alicante.",
    subcategories: ["Loafers", "Sneakers", "Boots"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    image: images.accessories,
    blurb: "The finishing details",
    description:
      "Leather goods, eyewear and jewelry made in small runs with solid brass hardware.",
    subcategories: ["Bags", "Jewelry", "Eyewear", "Belts", "Small Leather Goods"],
  },
];

export const allColors = Object.values(palette);
export const allSizes = ["XS", "S", "M", "L", "XL", "38", "39", "40", "41", "42", "43", "One Size"];
export const allBrands = [...new Set(products.map((p) => p.brand))];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function byTag(tag: Product["tags"][number], limit = 8) {
  return products.filter((p) => p.tags.includes(tag)).slice(0, limit);
}

export function related(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function discountPercent(p: Product) {
  if (!p.originalPrice) return 0;
  return Math.round((1 - p.price / p.originalPrice) * 100);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2).replace(/\.00$/, "")}`;
}

export const reviewsFeed = [
  {
    name: "Amelia R.",
    location: "London",
    rating: 5,
    text: "The wool overcoat is the best-made piece in my wardrobe. Three winters in and it still looks new.",
  },
  {
    name: "Daniel K.",
    location: "Copenhagen",
    rating: 5,
    text: "Sizing guidance was spot on and delivery took two days. The linen shirt is a staple now.",
  },
  {
    name: "Priya S.",
    location: "Dhaka",
    rating: 4,
    text: "Beautiful packaging and the returns process was genuinely painless. Will order again.",
  },
];

export const productReviews = [
  {
    name: "Sofia M.",
    rating: 5,
    date: "12 Sep 2026",
    title: "Worth every penny",
    text: "The weight of the fabric is unreal. It drapes exactly like the photos suggest and the colour is a true warm neutral.",
  },
  {
    name: "Jonas T.",
    rating: 4,
    date: "2 Sep 2026",
    title: "Great, size up",
    text: "Quality is excellent. I'm usually a medium but went large for layering and it was the right call.",
  },
  {
    name: "Noor A.",
    rating: 5,
    date: "21 Aug 2026",
    title: "My go-to piece",
    text: "I've worn this almost weekly since it arrived. No pilling at all so far.",
  },
];
