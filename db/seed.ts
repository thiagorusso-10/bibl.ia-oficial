import { config } from "dotenv";
config({ path: ".env.local" });
import "../lib/dns-fix";
import { db } from "./index";
import { collections, contentItems } from "./schema";

async function seed() {
    console.log("🌱 Seeding database...");

    // ========================================
    // Collections (Courses + Resource Bank)
    // ========================================

    const [redemptionCourse] = await db
        .insert(collections)
        .values({
            title: "O Plano de Redenção",
            slug: "o-plano-de-redencao",
            description:
                "Um estudo profundo sobre o plano redentor de Deus desde a criação até a consumação. Explore como cada momento da história bíblica aponta para Cristo.",
            type: "COURSE",
            imageUrl: "/images/ebooks/plano-de-redencao-capa.png",
        })
        .returning();

    const [vtCourse] = await db
        .insert(collections)
        .values({
            title: "Visão Geral do Velho Testamento",
            slug: "visao-geral-velho-testamento",
            description:
                "Uma panorâmica completa dos 39 livros do Antigo Testamento. Do Pentateuco aos Profetas Menores, descubra o fio condutor da história de Deus com Seu povo.",
            type: "COURSE",
            imageUrl: "/images/ebooks/visao-geral-vt-capa.png",
        })
        .returning();

    const [ntCourse] = await db
        .insert(collections)
        .values({
            title: "Visão Geral do Novo Testamento",
            slug: "visao-geral-novo-testamento",
            description:
                "Uma panorâmica completa dos 27 livros do Novo Testamento. Dos Evangelhos ao Apocalipse, descubra a mensagem de cada autor inspirado.",
            type: "COURSE",
            imageUrl: "/images/ebooks/visao-geral-nt-capa.png",
        })
        .returning();

    const [kidsBank] = await db
        .insert(collections)
        .values({
            title: "Fun Bible Kids",
            slug: "fun-bible-kids",
            description:
                "Atividades bíblicas divertidas para crianças! Colorir, histórias, matemática bíblica e muito mais. Perfeito para pais e educadores.",
            type: "RESOURCE_BANK",
            imageUrl: "/images/kids-zone.jpg",
        })
        .returning();

    // ========================================
    // Content Items — Ebooks (PDF completos)
    // ========================================

    await db.insert(contentItems).values([
        {
            collectionId: redemptionCourse.id,
            title: "O Plano de Redenção — Ebook Completo",
            orderIndex: 1,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/ebooks/plano-de-redencao.pdf",
            categoryTag: "Ebook",
        },
        {
            collectionId: vtCourse.id,
            title: "Visão Geral do Velho Testamento — Ebook Completo",
            orderIndex: 1,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/ebooks/visao-geral-vt.pdf",
            categoryTag: "Ebook",
        },
        {
            collectionId: ntCourse.id,
            title: "Visão Geral do Novo Testamento — Ebook Completo",
            orderIndex: 1,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/ebooks/visao-geral-nt.pdf",
            categoryTag: "Ebook",
        },
    ]);

    // ========================================
    // Content Items — Fun Bible Kids (10 atividades reais)
    // ========================================

    await db.insert(contentItems).values([
        {
            collectionId: kidsBank.id,
            title: "Caça Palavras Bíblico",
            orderIndex: 1,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/caca-palavras.pdf",
            categoryTag: "Caça Palavras",
        },
        {
            collectionId: kidsBank.id,
            title: "Caligrafia Bíblica",
            orderIndex: 2,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/caligrafia.pdf",
            categoryTag: "Caligrafia",
        },
        {
            collectionId: kidsBank.id,
            title: "Caminhos Bíblicos",
            orderIndex: 3,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/caminhos-biblicos.pdf",
            categoryTag: "Caminhos",
        },
        {
            collectionId: kidsBank.id,
            title: "Cruzadinha Bíblica",
            orderIndex: 4,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/cruzadinha.pdf",
            categoryTag: "Cruzadinha",
        },
        {
            collectionId: kidsBank.id,
            title: "Desenhos Bíblicos para Colorir",
            orderIndex: 5,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/desenhos-biblicos.pdf",
            categoryTag: "Colorir",
        },
        {
            collectionId: kidsBank.id,
            title: "Detetive Bíblico",
            orderIndex: 6,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/detetive.pdf",
            categoryTag: "Detetive",
        },
        {
            collectionId: kidsBank.id,
            title: "Matemática Bíblica",
            orderIndex: 7,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/matematica-biblica.pdf",
            categoryTag: "Matemática",
        },
        {
            collectionId: kidsBank.id,
            title: "Pesquisa Bíblica",
            orderIndex: 8,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/pesquisa.pdf",
            categoryTag: "Pesquisa",
        },
        {
            collectionId: kidsBank.id,
            title: "Quiz Bíblico",
            orderIndex: 9,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/quiz.pdf",
            categoryTag: "Quiz",
        },
        {
            collectionId: kidsBank.id,
            title: "Ligue as Sombras",
            orderIndex: 10,
            contentType: "PDF_FILE",
            fileUrl: "/pdfs/kids/ligue-as-sombras.pdf",
            categoryTag: "Ligue as Sombras",
        },
    ]);

    // ========================================
    // Content Items — Fun Bible Kids (10 histórias bíblicas)
    // ========================================

    await db.insert(contentItems).values([
        {
            collectionId: kidsBank.id,
            title: "Davi contra Golias",
            orderIndex: 11,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/davi-contra-golias.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "A Pesca Milagrosa",
            orderIndex: 12,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/pesca-milagrosa.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "Ressurreição de Lázaro",
            orderIndex: 13,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/ressurreicao-de-lazaro.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "O Milagre na Estrada de Damasco",
            orderIndex: 14,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/estrada-de-damasco.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "José do Egito",
            orderIndex: 15,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/jose-do-egito.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "O Profeta Elias",
            orderIndex: 16,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/profeta-elias.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "O Profeta Daniel",
            orderIndex: 17,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/profeta-daniel.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "O Milagre em Caná",
            orderIndex: 18,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/milagre-em-cana.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "Sansão",
            orderIndex: 19,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/sansao.pdf",
            categoryTag: "História",
        },
        {
            collectionId: kidsBank.id,
            title: "A Obediência de Ló",
            orderIndex: 20,
            contentType: "SLIDE_STORY",
            fileUrl: "/pdfs/kids/historias/obediencia-de-lo.pdf",
            categoryTag: "História",
        },
    ]);

    console.log("✅ Seed completed successfully!");
    console.log("📚 Created 3 collections:");
    console.log("   - O Plano de Redenção (3 capítulos)");
    console.log("   - Visão Geral do Novo Testamento (3 capítulos)");
    console.log("   - Fun Bible Kids (10 atividades + 10 histórias)");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
