// Shared product metadata - accessible by both server and client components
// This file must NOT have "use client" directive

export type ProductMeta = {
    color: string;
    highlight?: boolean;
    features: string[];
    checkoutLink: string;
};

export type ProductCard = {
    slug: string;
    title: string;
    description: string;
    priceInCents: number;
    color: string;
    highlight?: boolean;
    features: string[];
    checkoutLink?: string;
};

export const PRODUCT_META: Record<string, ProductMeta> = {
    "ebook-plano-redencao": {
        color: "bg-[#FDE047]",
        checkoutLink: "https://pay.kiwify.com.br/0ERy9ql",
        features: [
            "Ebook completo em PDF",
            "Da Criação à Nova Criação",
            "Estudo profundo e acessível",
        ],
    },
    "ebook-visao-vt": {
        color: "bg-[#10B981]",
        checkoutLink: "https://pay.kiwify.com.br/aQ2IJUy",
        features: [
            "Ebook completo em PDF",
            "39 livros do Antigo Testamento",
            "Panorâmica completa",
        ],
    },
    "ebook-visao-nt": {
        color: "bg-[#93C5FD]",
        checkoutLink: "https://pay.kiwify.com.br/vQtIjXv",
        features: [
            "Ebook completo em PDF",
            "27 livros do Novo Testamento",
            "Evangelhos ao Apocalipse",
        ],
    },
    "kids-atividades": {
        color: "bg-[#EC4899]",
        checkoutLink: "https://pay.kiwify.com.br/JfaTXfn",
        features: [
            "10 atividades para imprimir",
            "Caça palavras, cruzadinha, colorir",
            "Diversão bíblica para crianças",
        ],
    },
    "kids-historias": {
        color: "bg-[#A855F7]",
        checkoutLink: "https://pay.kiwify.com.br/ZR3B2PY",
        features: [
            "10 histórias ilustradas",
            "De Davi a Daniel",
            "Slides interativos",
        ],
    },
    "combo-ebooks": {
        color: "bg-[#FDE047]",
        checkoutLink: "https://pay.kiwify.com.br/TdMHOs7",
        features: [
            "3 ebooks teológicos",
            "Redenção + VT + NT",
            "Economize R$ 19,80",
        ],
    },
    "combo-kids": {
        color: "bg-[#A855F7]",
        checkoutLink: "https://pay.kiwify.com.br/4ydgUbk",
        features: [
            "Atividades + Histórias",
            "20 materiais para crianças",
            "Economize R$ 15,90",
        ],
    },
    "combo-tudo": {
        color: "bg-[#FDE047]",
        highlight: true,
        checkoutLink: "https://pay.kiwify.com.br/PEPj7iz",
        features: [
            "TUDO incluído",
            "3 ebooks + 20 materiais kids",
            "Maior economia: R$ 37,60",
            "Acesso vitalício",
        ],
    },
};
