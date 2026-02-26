import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "BIBL.IA OFICIAL",
        short_name: "BIBL.IA",
        description: "Plataforma de ensino teológico e atividades bíblicas.",
        start_url: "/dashboard",
        display: "standalone",
        background_color: "#fafafa",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/icon",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
