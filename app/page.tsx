import { getActiveProducts } from "@/lib/access";
import { LandingClient } from "./landing-client";
import { PRODUCT_META, type ProductCard } from "./(marketing)/precos/precos-client";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: ProductCard[] = [];

  try {
    const raw = await getActiveProducts();
    products = raw.map((p) => {
      const meta = PRODUCT_META[p.slug] ?? {
        icon: <BookOpen className="w-6 h-6" />,
        color: "bg-white",
        features: [],
      };
      return {
        slug: p.slug,
        title: p.title,
        description: p.description ?? "",
        priceInCents: p.priceInCents,
        ...meta,
      };
    });
  } catch (error) {
    console.error("Erro ao carregar produtos na home:", error);
  }

  return <LandingClient products={products} />;
}
