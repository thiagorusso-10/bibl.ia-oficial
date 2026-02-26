import { getCourses } from "@/lib/queries";
import { getCurrentUser } from "@/lib/access";
import { getCompletedCount } from "@/lib/progress";
import { DashboardClient } from "./dashboard-client";

// Static fallback used when DB is unreachable
const FALLBACK_EBOOKS = [
    {
        id: "plano-de-redencao",
        title: "O Plano de Redenção",
        description:
            "Da Criação à Nova Criação — explore o plano redentor de Deus ao longo de toda a Escritura.",
        imageUrl: "/images/ebooks/plano-de-redencao-capa.png",
        color: "bg-[#FEF08A]",
    },
    {
        id: "visao-geral-velho-testamento",
        title: "Visão Geral do Velho Testamento",
        description:
            "Uma panorâmica completa dos 39 livros do Antigo Testamento.",
        imageUrl: "/images/ebooks/visao-geral-vt-capa.png",
        color: "bg-[#BBF7D0]",
    },
    {
        id: "visao-geral-novo-testamento",
        title: "Visão Geral do Novo Testamento",
        description:
            "Uma panorâmica completa dos 27 livros do Novo Testamento.",
        imageUrl: "/images/ebooks/visao-geral-nt-capa.png",
        color: "bg-[#BFDBFE]",
    },
];

const COLORS = ["bg-[#FEF08A]", "bg-[#BBF7D0]", "bg-[#BFDBFE]"];

export const metadata = {
    title: "Início",
};

export default async function DashboardPage() {
    let ebooks = FALLBACK_EBOOKS;
    let completedCount = 0;

    try {
        const [courses, user] = await Promise.all([
            getCourses(),
            getCurrentUser(),
        ]);

        if (courses.length > 0) {
            ebooks = courses.map((c, i) => ({
                id: c.slug,
                title: c.title,
                description: c.description ?? "",
                imageUrl: c.imageUrl ?? "/images/ebooks/plano-de-redencao-capa.png",
                color: COLORS[i % COLORS.length],
            }));
        }

        if (user) {
            completedCount = await getCompletedCount(user.id);
        }
    } catch {
        // DB unreachable — use fallback
    }

    return (
        <DashboardClient
            ebooks={ebooks}
            completedCount={completedCount}
            kidsCount={20} // Fallback or real count if you had it separate
        />
    );
}
