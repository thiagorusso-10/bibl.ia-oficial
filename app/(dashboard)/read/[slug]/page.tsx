import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { EbookReader } from "@/components/ui/ebook-reader";
import { PdfEbookViewer } from "@/components/ui/pdf-ebook-viewer";

interface PageProps {
    params: {
        slug: string;
    };
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

export default async function ReadPage({ params }: PageProps) {
    const { slug } = await params;

    // Check if we have a PDF for this slug
    const ebookInfo = EBOOK_PDF_MAP[slug];

    if (!ebookInfo) {
        notFound();
    }

    // We trust that the map contains valid paths that exist in the /public folder
    // On Vercel, the public folder is served by the Edge network, so fs.existsSync 
    // inside a Serverless Function path might fail.

    return (
        <EbookReader title={ebookInfo.title} slug={slug}>
            <PdfEbookViewer fileUrl={ebookInfo.pdfPath} />
        </EbookReader>
    );
}
