import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Viewport } from "next";
import { EbookReader } from "@/components/ui/ebook-reader";
import { PdfEbookViewer } from "@/components/ui/pdf-ebook-viewer";
import { getCurrentUser, hasAccessToCollection } from "@/lib/access";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Map slugs to their PDF paths and display titles
const EBOOK_PDF_MAP: Record<string, { pdfPath: string; title: string }> = {
    "plano-de-redencao": {
        pdfPath: "/pdfs/ebooks/plano-de-redencao.pdf",
        title: "O Plano de Redenção",
    },
    "visao-geral-velho-testamento": {
        pdfPath: "/pdfs/ebooks/visao-geral-vt.pdf",
        title: "Visão Geral do Velho Testamento",
    },
    "visao-geral-novo-testamento": {
        pdfPath: "/pdfs/ebooks/visao-geral-nt.pdf",
        title: "Visão Geral do Novo Testamento",
    },
    // Kids stories
    "davi-contra-golias": {
        pdfPath: "/pdfs/kids/historias/davi-contra-golias.pdf",
        title: "Davi Contra Golias",
    },
    "estrada-de-damasco": {
        pdfPath: "/pdfs/kids/historias/estrada-de-damasco.pdf",
        title: "Estrada de Damasco",
    },
    "pesca-milagrosa": {
        pdfPath: "/pdfs/kids/historias/pesca-milagrosa.pdf",
        title: "A Pesca Milagrosa",
    },
    "profeta-daniel": {
        pdfPath: "/pdfs/kids/historias/profeta-daniel.pdf",
        title: "O Profeta Daniel",
    },
    "profeta-elias": {
        pdfPath: "/pdfs/kids/historias/profeta-elias.pdf",
        title: "O Profeta Elias",
    },
    "ressurreicao-de-lazaro": {
        pdfPath: "/pdfs/kids/historias/ressurreicao-de-lazaro.pdf",
        title: "A Ressurreição de Lázaro",
    },
};

export default async function ReadPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const from = resolvedSearchParams?.from;
    const returnUrl = from === "kids" ? "/kids" : "/learn";

    // Check if we have a PDF for this slug in the hardcoded map
    // If not, use the slug directly as a fallback for the database-seeded items
    let mappedEbook = EBOOK_PDF_MAP[slug];

    // Auto-detect activities vs stories based on common slug prefixes or just check if it's an activity
    // To be perfectly safe, if the slug isn't in EBOOK_PDF_MAP and isn't a story, we can assume it's an activity or a story.
    // For Kids Activities, the fallback path is /pdfs/kids/[slug].pdf. For Kids Stories, it's /pdfs/kids/historias/[slug].pdf.
    const isActivity = ["caca-palavras", "caligrafia", "caminhos-biblicos", "cruzadinha", "desenhos-biblicos", "detetive", "matematica-biblica", "pesquisa", "quiz", "ligue-as-sombras"].includes(slug);
    const isKidsStory = from === "kids" && !isActivity;

    const ebookInfo = mappedEbook || {
        pdfPath: isActivity ? `/pdfs/kids/${slug}.pdf` : `/pdfs/kids/historias/${slug}.pdf`,
        title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    };

    // We trust that the map contains valid paths that exist in the /public folder
    // On Vercel, the public folder is served by the Edge network, so fs.existsSync 
    // inside a Serverless Function path might fail.

    // Access Check Logic for Paywall / Samples
    const user = await getCurrentUser();
    let hasAccess = false;

    if (user) {
        if (from === "kids") {
            hasAccess = await hasAccessToCollection(user.id, "fun-bible-kids");
        } else {
            // Usually, specific Ebook collections share the exact same slug
            hasAccess = await hasAccessToCollection(user.id, slug);
        }
    }

    // 🧠 BRAINSTORM/MENTOR DECISION:
    // How many pages should we show inside the "Sample" mode?
    // - Ebooks: 8 pages (Cover + Copyright + TOC + Intro + First Chapter). If 3 pages, they see ZERO content.
    // - Kids Story: 3 pages (Cover + Intro + 1st Scene). Perfect teaser without spoiling.
    // - Kids Activity: 3 pages (Cover + 2 activities). Perfect teaser before paywall.
    const samplePagesCount = isKidsStory ? 3 : (isActivity ? 3 : 8);

    return (
        <EbookReader title={ebookInfo.title} slug={slug} returnUrl={returnUrl}>
            <PdfEbookViewer fileUrl={ebookInfo.pdfPath} isSample={!hasAccess} isLandscape={isKidsStory} samplePagesCount={samplePagesCount} />
        </EbookReader>
    );
}
