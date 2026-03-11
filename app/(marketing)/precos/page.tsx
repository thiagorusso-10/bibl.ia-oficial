import { getActiveProducts } from "@/lib/access";
import { PrecosClient, PRODUCT_META, type ProductCard } from "./precos-client";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PrecosPage() {
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
                icon: meta.icon,
                color: meta.color,
                highlight: meta.highlight,
                features: meta.features,
                checkoutLink: meta.checkoutLink ?? "",
            };
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        // Fallback or empty state
    }

    return <PrecosClient products={products} />;
}
