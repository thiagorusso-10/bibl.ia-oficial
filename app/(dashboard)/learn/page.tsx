import { getCourses } from "@/lib/queries";
import { getCurrentUser, hasAccessToCollection } from "@/lib/access";
import { getCollectionFirstItemMap, getCompletedItemIds } from "@/lib/progress";
import { LearnClient } from "./learn-client";

// Static fallback
const FALLBACK_EBOOKS = [
    {
        id: "plano-de-redencao",
        slug: "plano-de-redencao",
        title: "O Plano de Redenção",
        subtitle: "De Gênesis a Apocalipse",
        description:
            "Um estudo profundo sobre o plano redentor de Deus desde a criação até a consumação. Explore como cada momento da história bíblica aponta para Cristo — da queda no Éden à glória eterna.",
        coverUrl: "/images/ebooks/plano-de-redencao-capa.png",
        heroUrl: "/images/ebooks/plano-de-redencao-hero.webp",
        fileUrl: "/pdfs/ebooks/plano-de-redencao.pdf",
        color: "bg-[#FEF08A]",
        topics: [
            "A Criação e a Queda",
            "As Alianças de Deus",
            "O Protoevangelium",
            "A Lei e os Profetas",
            "Cristo: O Cumprimento",
            "A Nova Criação",
        ],
    },
    {
        id: "visao-geral-vt",
        slug: "visao-geral-velho-testamento",
        title: "Visão Geral do Velho Testamento",
        subtitle: "39 Livros — Uma História",
        description:
            "Uma panorâmica completa dos 39 livros do Antigo Testamento. Do Pentateuco aos Profetas Menores, descubra o fio condutor da história de Deus com Seu povo, revelado livro por livro.",
        coverUrl: "/images/ebooks/visao-geral-vt-capa.png",
        heroUrl: "/images/ebooks/visao-geral-vtnt-hero.webp",
        fileUrl: "/pdfs/ebooks/visao-geral-vt.pdf",
        color: "bg-[#BBF7D0]",
        topics: [
            "Pentateuco (Gênesis a Deuteronômio)",
            "Livros Históricos",
            "Livros Poéticos e de Sabedoria",
            "Profetas Maiores",
            "Profetas Menores",
            "O Período Intertestamentário",
        ],
    },
    {
        id: "visao-geral-nt",
        slug: "visao-geral-novo-testamento",
        title: "Visão Geral do Novo Testamento",
        subtitle: "27 Livros — A Revelação Completa",
        description:
            "Uma panorâmica completa dos 27 livros do Novo Testamento. Dos Evangelhos ao Apocalipse, descubra a mensagem de cada autor inspirado e como tudo aponta para a obra consumada de Cristo.",
        coverUrl: "/images/ebooks/visao-geral-nt-capa.png",
        heroUrl: "/images/ebooks/visao-geral-vtnt-hero.webp",
        fileUrl: "/pdfs/ebooks/visao-geral-nt.pdf",
        color: "bg-[#BFDBFE]",
        topics: [
            "Os Quatro Evangelhos",
            "Atos dos Apóstolos",
            "Cartas Paulinas",
            "Epístolas Gerais",
            "A Carta aos Hebreus",
            "O Apocalipse de João",
        ],
    },
];

// Map slug to static metadata (topics, subtitle, file URLs)
const EBOOK_META: Record<
    string,
    {
        subtitle: string;
        coverUrl: string;
        heroUrl: string;
        fileUrl: string;
        color: string;
        topics: string[];
    }
> = {
    "o-plano-de-redencao": {
        subtitle: "De Gênesis a Apocalipse",
        coverUrl: "/images/ebooks/plano-de-redencao-capa.png",
        heroUrl: "/images/ebooks/plano-de-redencao-hero.webp",
        fileUrl: "/pdfs/ebooks/plano-de-redencao.pdf",
        color: "bg-[#FEF08A]",
        topics: [
            "A Criação e a Queda",
            "As Alianças de Deus",
            "O Protoevangelium",
            "A Lei e os Profetas",
            "Cristo: O Cumprimento",
            "A Nova Criação",
        ],
    },
    "visao-geral-velho-testamento": {
        subtitle: "39 Livros — Uma História",
        coverUrl: "/images/ebooks/visao-geral-vt-capa.png",
        heroUrl: "/images/ebooks/visao-geral-vtnt-hero.webp",
        fileUrl: "/pdfs/ebooks/visao-geral-vt.pdf",
        color: "bg-[#BBF7D0]",
        topics: [
            "Pentateuco (Gênesis a Deuteronômio)",
            "Livros Históricos",
            "Livros Poéticos e de Sabedoria",
            "Profetas Maiores",
            "Profetas Menores",
            "O Período Intertestamentário",
        ],
    },
    "visao-geral-novo-testamento": {
        subtitle: "27 Livros — A Revelação Completa",
        coverUrl: "/images/ebooks/visao-geral-nt-capa.png",
        heroUrl: "/images/ebooks/visao-geral-vtnt-hero.webp",
        fileUrl: "/pdfs/ebooks/visao-geral-nt.pdf",
        color: "bg-[#BFDBFE]",
        topics: [
            "Os Quatro Evangelhos",
            "Atos dos Apóstolos",
            "Cartas Paulinas",
            "Epístolas Gerais",
            "A Carta aos Hebreus",
            "O Apocalipse de João",
        ],
    },
};

export type EbookData = {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    coverUrl: string;
    heroUrl: string;
    fileUrl: string;
    color: string;
    topics: string[];
    hasAccess: boolean;
    contentItemId: string | null;
    isRead: boolean;
};

export const metadata = {
    title: "Estudos Bíblicos",
    description:
        "Ebooks completos para aprofundar seu conhecimento das Escrituras.",
};

export default async function LearnPage() {
    let ebooks: EbookData[] = FALLBACK_EBOOKS.map((e) => ({
        ...e,
        hasAccess: false,
        contentItemId: null,
        isRead: false,
    }));

    try {
        const [courses, user, itemMap] = await Promise.all([
            getCourses(),
            getCurrentUser(),
            getCollectionFirstItemMap(),
        ]);

        if (courses.length > 0) {
            const [accessChecks, completedIds] = await Promise.all([
                user
                    ? Promise.all(
                        courses.map((c) =>
                            hasAccessToCollection(user.id, c.slug)
                        )
                    )
                    : Promise.resolve(courses.map(() => false)),
                user
                    ? getCompletedItemIds(user.id)
                    : Promise.resolve(new Set<string>()),
            ]);

            ebooks = courses.map((c, i) => {
                const eData =
                    EBOOK_META[c.slug] ?? EBOOK_META["o-plano-de-redencao"];
                const firstItemId = itemMap[c.slug] ?? null;
                return {
                    id: c.id,
                    slug: c.slug,
                    title: c.title,
                    description: c.description ?? "",
                    subtitle: eData.subtitle,
                    coverUrl: eData.coverUrl,
                    heroUrl: eData.heroUrl,
                    fileUrl: eData.fileUrl,
                    color: eData.color,
                    topics: eData.topics,
                    hasAccess: accessChecks[i],
                    contentItemId: firstItemId,
                    isRead: firstItemId ? completedIds.has(firstItemId) : false,
                };
            });
        }
    } catch (error) {
        console.warn("DB offline or unreachable, using fallback for courses.");
        // DB unreachable — use fallback
    }

    return <LearnClient ebooks={ebooks} />;
}
