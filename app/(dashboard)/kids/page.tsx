import { getKidsResources } from "@/lib/queries";
import { getCurrentUser, hasAccessToCollection } from "@/lib/access";
import { getCompletedItemIds } from "@/lib/progress";
import { KidsClient, type KidsActivity, type KidsStory } from "./kids-client";

// Static fallback — activities
const FALLBACK_ACTIVITIES: KidsActivity[] = [
    {
        id: "caca-palavras",
        title: "Caça Palavras Bíblico",
        category: "Caça Palavras",
        description:
            "Encontre palavras bíblicas escondidas! Aprenda nomes, lugares e histórias da Bíblia enquanto se diverte.",
        coverUrl: "/images/covers/caca-palavras.png",
        fileUrl: "/pdfs/kids/caca-palavras.pdf",
    },
    {
        id: "caligrafia",
        title: "Caligrafia Bíblica",
        category: "Caligrafia",
        description:
            "Pratique a escrita com versículos e frases da Bíblia. Melhore a caligrafia enquanto memoriza a Palavra de Deus.",
        coverUrl: "/images/covers/caligrafia.png",
        fileUrl: "/pdfs/kids/caligrafia.pdf",
    },
    {
        id: "caminhos-biblicos",
        title: "Caminhos Bíblicos",
        category: "Caminhos",
        description:
            "Ajude os personagens bíblicos a encontrar o caminho certo! Labirintos divertidos com histórias sagradas.",
        coverUrl: "/images/covers/caminhos-biblicos.png",
        fileUrl: "/pdfs/kids/caminhos-biblicos.pdf",
    },
    {
        id: "cruzadinha",
        title: "Cruzadinha Bíblica",
        category: "Cruzadinha",
        description:
            "Palavras cruzadas com temas bíblicos! Teste seu conhecimento sobre histórias e personagens da Bíblia.",
        coverUrl: "/images/covers/cruzadinha.png",
        fileUrl: "/pdfs/kids/cruzadinha.pdf",
    },
    {
        id: "desenhos-biblicos",
        title: "Desenhos Bíblicos para Colorir",
        category: "Colorir",
        description:
            "Lindos desenhos bíblicos para colorir! Solte a criatividade e aprenda sobre as histórias da Bíblia.",
        coverUrl: "/images/covers/desenhos-biblicos.png",
        fileUrl: "/pdfs/kids/desenhos-biblicos.pdf",
    },
    {
        id: "detetive",
        title: "Detetive Bíblico",
        category: "Detetive",
        description:
            "Descubra pistas e resolva mistérios bíblicos! Exercite a observação e o raciocínio com histórias sagradas.",
        coverUrl: "/images/covers/detetive.png",
        fileUrl: "/pdfs/kids/detetive.pdf",
    },
    {
        id: "matematica-biblica",
        title: "Matemática Bíblica",
        category: "Matemática",
        description:
            "Exercícios de matemática com números e temas da Bíblia. Aprenda a contar, somar e subtrair com histórias bíblicas!",
        coverUrl: "/images/covers/matematica-biblica.png",
        fileUrl: "/pdfs/kids/matematica-biblica.pdf",
    },
    {
        id: "pesquisa",
        title: "Pesquisa Bíblica",
        category: "Pesquisa",
        description:
            "Pesquise e descubra fatos incríveis sobre a Bíblia! Aprenda a buscar informações nas Escrituras Sagradas.",
        coverUrl: "/images/covers/pesquisa.png",
        fileUrl: "/pdfs/kids/pesquisa.pdf",
    },
    {
        id: "quiz",
        title: "Quiz Bíblico",
        category: "Quiz",
        description:
            "Teste seus conhecimentos bíblicos com perguntas divertidas! Quanto você sabe sobre as histórias da Bíblia?",
        coverUrl: "/images/covers/quiz.png",
        fileUrl: "/pdfs/kids/quiz.pdf",
    },
    {
        id: "ligue-as-sombras",
        title: "Ligue as Sombras",
        category: "Ligue as Sombras",
        description:
            "Conecte cada personagem bíblico à sua sombra! Um jogo visual divertido que ensina sobre figuras da Bíblia.",
        coverUrl: "/images/covers/ligue-as-sombras.png",
        fileUrl: "/pdfs/kids/ligue-as-sombras.pdf",
    },
];

// Static fallback — stories
const FALLBACK_STORIES: KidsStory[] = [
    {
        id: "davi-contra-golias",
        title: "Davi contra Golias",
        number: 1,
        description:
            "A incrível história de coragem do jovem pastor Davi, que com apenas uma funda e muita fé, enfrentou o gigante Golias.",
        fileUrl: "/pdfs/kids/historias/davi-contra-golias.pdf",
        emoji: "⚔️",
        color: "bg-[#FEF08A]",
    },
    {
        id: "pesca-milagrosa",
        title: "A Pesca Milagrosa",
        number: 2,
        description:
            "Jesus surpreende os pescadores com uma rede cheia de peixes após uma noite inteira sem pescar nada!",
        fileUrl: "/pdfs/kids/historias/pesca-milagrosa.pdf",
        emoji: "🐟",
        color: "bg-[#BFDBFE]",
    },
    {
        id: "ressurreicao-de-lazaro",
        title: "Ressurreição de Lázaro",
        number: 3,
        description:
            "Um milagre extraordinário: Jesus chama Lázaro de volta à vida após quatro dias. O poder de Deus sobre a morte!",
        fileUrl: "/pdfs/kids/historias/ressurreicao-de-lazaro.pdf",
        emoji: "✨",
        color: "bg-[#E9D5FF]",
    },
    {
        id: "estrada-de-damasco",
        title: "O Milagre na Estrada de Damasco",
        number: 4,
        description:
            "Saulo, que perseguia os cristãos, tem um encontro transformador com Jesus na estrada de Damasco e se torna Paulo.",
        fileUrl: "/pdfs/kids/historias/estrada-de-damasco.pdf",
        emoji: "⚡",
        color: "bg-[#FED7AA]",
    },
    {
        id: "jose-do-egito",
        title: "José do Egito",
        number: 5,
        description:
            "De escravo a governador! A incrível jornada de José, que mesmo nas dificuldades confiou no plano de Deus.",
        fileUrl: "/pdfs/kids/historias/jose-do-egito.pdf",
        emoji: "👑",
        color: "bg-[#FEF08A]",
    },
    {
        id: "profeta-elias",
        title: "O Profeta Elias",
        number: 6,
        description:
            "O corajoso profeta que desafiou os 450 profetas de Baal no Monte Carmelo e mostrou o verdadeiro poder de Deus!",
        fileUrl: "/pdfs/kids/historias/profeta-elias.pdf",
        emoji: "🔥",
        color: "bg-[#FCA5A5]",
    },
    {
        id: "profeta-daniel",
        title: "O Profeta Daniel",
        number: 7,
        description:
            "Daniel na cova dos leões! A fé inabalável de um jovem que preferiu orar a Deus mesmo sob ameaça de morte.",
        fileUrl: "/pdfs/kids/historias/profeta-daniel.pdf",
        emoji: "🦁",
        color: "bg-[#FED7AA]",
    },
    {
        id: "milagre-em-cana",
        title: "O Milagre em Caná",
        number: 8,
        description:
            "O primeiro milagre de Jesus! Em uma festa de casamento, Ele transforma água em vinho, revelando Sua glória.",
        fileUrl: "/pdfs/kids/historias/milagre-em-cana.pdf",
        emoji: "🍷",
        color: "bg-[#E9D5FF]",
    },
    {
        id: "sansao",
        title: "Sansão",
        number: 9,
        description:
            "O homem mais forte que já existiu! Descubra como Deus usou a força de Sansão para proteger o povo de Israel.",
        fileUrl: "/pdfs/kids/historias/sansao.pdf",
        emoji: "💪",
        color: "bg-[#BBF7D0]",
    },
    {
        id: "obediencia-de-lo",
        title: "A Obediência de Ló",
        number: 10,
        description:
            "Uma história sobre obedecer a Deus mesmo quando não entendemos. Ló e sua família são salvos da destruição.",
        fileUrl: "/pdfs/kids/historias/obediencia-de-lo.pdf",
        emoji: "🙏",
        color: "bg-[#BFDBFE]",
    },
];

// Category to cover URL mapping
const CATEGORY_COVER: Record<string, string> = {
    "Caça Palavras": "/images/covers/caca-palavras.png",
    Caligrafia: "/images/covers/caligrafia.png",
    Caminhos: "/images/covers/caminhos-biblicos.png",
    Cruzadinha: "/images/covers/cruzadinha.png",
    Colorir: "/images/covers/desenhos-biblicos.png",
    Detetive: "/images/covers/detetive.png",
    Matemática: "/images/covers/matematica-biblica.png",
    Pesquisa: "/images/covers/pesquisa.png",
    Quiz: "/images/covers/quiz.png",
    "Ligue as Sombras": "/images/covers/ligue-as-sombras.png",
};

// Story metadata
const STORY_META: Record<
    number,
    { emoji: string; color: string }
> = {
    1: { emoji: "⚔️", color: "bg-[#FEF08A]" },
    2: { emoji: "🐟", color: "bg-[#BFDBFE]" },
    3: { emoji: "✨", color: "bg-[#E9D5FF]" },
    4: { emoji: "⚡", color: "bg-[#FED7AA]" },
    5: { emoji: "👑", color: "bg-[#FEF08A]" },
    6: { emoji: "🔥", color: "bg-[#FCA5A5]" },
    7: { emoji: "🦁", color: "bg-[#FED7AA]" },
    8: { emoji: "🍷", color: "bg-[#E9D5FF]" },
    9: { emoji: "💪", color: "bg-[#BBF7D0]" },
    10: { emoji: "🙏", color: "bg-[#BFDBFE]" },
};

export const metadata = {
    title: "Fun Bible Kids",
    description: "Atividades e histórias bíblicas ilustradas para crianças.",
};

export default async function KidsZonePage() {
    let activities: KidsActivity[] = FALLBACK_ACTIVITIES;
    let stories: KidsStory[] = [...FALLBACK_STORIES];

    let hasAccess = false;
    let completedIds: string[] = [];

    try {
        const [resources, user] = await Promise.all([
            getKidsResources(),
            getCurrentUser(),
        ]);

        if (user) {
            const [access, completed] = await Promise.all([
                hasAccessToCollection(user.id, "fun-bible-kids"),
                getCompletedItemIds(user.id),
            ]);
            hasAccess = access;
            completedIds = [...completed];
        }

        if (resources.length > 0) {
            const pdfs = resources.filter((r) => r.contentType === "PDF_FILE");
            const slides = resources.filter(
                (r) => r.contentType === "SLIDE_STORY"
            );

            if (pdfs.length > 0) {
                activities = pdfs.map((r) => ({
                    id: r.id,
                    title: r.title,
                    category: r.categoryTag ?? "Atividade",
                    description: "",
                    coverUrl:
                        CATEGORY_COVER[r.categoryTag ?? ""] ??
                        "/images/covers/caca-palavras.png",
                    fileUrl: r.fileUrl ?? "",
                }));
            }

            if (slides.length > 0) {
                stories = slides.map((r, i) => {
                    const meta = STORY_META[(i + 1) as keyof typeof STORY_META] ?? { emoji: "📖", color: "bg-[#FEF08A]" };
                    return {
                        id: r.id,
                        title: r.title,
                        number: i + 1,
                        description: "",
                        fileUrl: r.fileUrl ?? "",
                        ...meta,
                    };
                });
            }
        }
    } catch {
        // DB unreachable — use fallback
    }

    return <KidsClient activities={activities} stories={stories} hasAccess={hasAccess} completedIds={completedIds} />;
}
