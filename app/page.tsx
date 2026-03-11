import { getActiveProducts } from "@/lib/access";
import { LandingClient } from "./landing-client";
import { PRODUCT_META, type ProductCard } from "./(marketing)/precos/precos-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: ProductCard[] = [];

  try {
    const raw = await getActiveProducts();
    products = raw.map((p) => {
      const meta = PRODUCT_META[p.slug] ?? {
        color: "bg-white",
        features: [],
      };
      return {
        slug: p.slug,
        title: p.title,
        description: p.description ?? "",
        priceInCents: p.priceInCents,
        color: meta.color,
        highlight: meta.highlight,
        features: meta.features,
        checkoutLink: meta.checkoutLink ?? "",
      };
    });
  } catch (error) {
    console.error("Erro ao carregar produtos na home:", error);
  }

  return <LandingClient products={products} />;
}
