import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "BIBL.IA OFICIAL",
        short_name: "BIBL.IA",
        description: "Plataforma de ensino teológico e atividades bíblicas.",
        start_url: "/",
        display: "standalone",
        background_color: "#fafafa",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
    };
}
