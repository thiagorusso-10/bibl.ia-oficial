"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ZoomIn, ZoomOut, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfEbookViewerProps {
    fileUrl: string;
    isSample?: boolean;
    isLandscape?: boolean;
    samplePagesCount?: number;
}

// Sub-componente mágico: reserva o espaço vertical correto
// Mas só injeta o <Page canvas> pesado quando a página está na tela (IntersectionObserver).
// Isso evita crashear a memória RAM (OOM) do Safari iOS ao tentar carregar dezenas de Canvas de uma vez!
function VirtualizedPdfPage({
    pageNumber,
    pageWidth,
    isSample,
    isLandscape,
    isLastSamplePage
}: {
    pageNumber: number;
    pageWidth: number;
    isSample: boolean;
    isLandscape?: boolean;
    isLastSamplePage: boolean;
}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasRendered, setHasRendered] = useState(false); // Mantém carregado após primeiro scroll
    const [realHeight, setRealHeight] = useState<number | null>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasRendered(true);
                } else {
                    // Descarrega o Canvas pesado se a página sair MUITO de vista para salvar RAM
                    setIsVisible(false);
                }
            },
            // Margem abrangente: carrega 2 páginas pra cima e 2 pra baixo antecipadamente.
            { rootMargin: "2500px 0px" }
        );

        observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    // Aspect ratio padrão para PDFs A4 é 1.414 (Portrait)
    // Para Histórias Kids (Telas widescreen), usamos 0.5625 (16:9) como fallback.
    const fallbackRatio = isLandscape ? 0.5625 : 1.414;
    const currentHeight = realHeight || (pageWidth * fallbackRatio);

    return (
        <div
            ref={wrapperRef}
            className="pdf-page-wrapper w-full flex justify-center mb-4 relative transition-all duration-300"
            data-page-number={pageNumber}
            style={{ minHeight: currentHeight, width: pageWidth }}
        >
            {/* Elemento fantasma para preservar o scroll nativo do navegador perfeitamente */}
            {!isVisible && !hasRendered && (
                <div className="bg-zinc-100 flex items-center justify-center rounded-md shadow-sm" style={{ width: pageWidth, height: currentHeight }}>
                    <div className="w-8 h-8 border-4 border-zinc-300 border-t-[#60a5fa] rounded-full animate-spin" />
                </div>
            )}

            {/* Injeta o Canvas apenas quando a página estiver no viewport e a IA avitvou */}
            {(isVisible || hasRendered) && (
                <Page
                    pageNumber={pageNumber}
                    width={pageWidth}
                    className={`shadow-2xl rounded-md overflow-hidden relative z-10 animate-in fade-in duration-500`}
                    renderTextLayer={true}
                    renderAnnotationLayer={false}
                    loading={null}
                    onLoadSuccess={({ originalHeight, originalWidth }) => {
                        // Quando o PDF carrega de fato, salva a altura real absoluta para evitar "dança" na tela
                        setRealHeight(pageWidth * (originalHeight / originalWidth));
                    }}
                />
            )}

            {/* Fade Gradiente Mágico para a Última Página da Amostra */}
            {isSample && isLastSamplePage && (
                <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none rounded-b-md" />
            )}
        </div>
    );
}

export function PdfEbookViewer({ fileUrl, isSample = false, isLandscape = false, samplePagesCount = 3 }: PdfEbookViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(800);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track visible page using IntersectionObserver
    useEffect(() => {
        if (numPages === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    const mostVisible = visibleEntries.reduce((prev, current) =>
                        (prev.intersectionRatio > current.intersectionRatio) ? prev : current
                    );
                    const pageNum = Number(mostVisible.target.getAttribute("data-page-number"));
                    if (pageNum) setCurrentPage(pageNum);
                }
            },
            { threshold: [0.3, 0.5, 0.8] }
        );

        const pageElements = document.querySelectorAll(".pdf-page-wrapper");
        pageElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [numPages]);

    // Measure container width for responsive rendering
    useEffect(() => {
        let initialWidth = 0;
        function updateWidth() {
            if (window.visualViewport && window.visualViewport.scale !== 1) {
                return;
            }

            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                if (initialWidth === 0 || Math.abs(initialWidth - newWidth) > 50) {
                    initialWidth = newWidth;
                    setContainerWidth(newWidth);
                }
            }
        }

        setTimeout(updateWidth, 100);

        let timeoutId: NodeJS.Timeout;
        const resizeHandler = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateWidth, 500);
        };

        const orientationHandler = () => {
            clearTimeout(timeoutId);
            setTimeout(updateWidth, 500);
        };

        window.addEventListener("resize", resizeHandler);
        window.addEventListener("orientationchange", orientationHandler);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationHandler);
        };
    }, []);

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    }, []);

    const renderPages = isSample ? Math.min(numPages, samplePagesCount) : numPages;
    const pageWidth = Math.min(containerWidth - 16, 900);

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center pb-20">
            {/* 🐛 DEBUG VISUAL 🐛 */}
            <div className={`w-full max-w-2xl px-4 py-2 mt-4 mb-6 rounded-md font-mono text-xs md:text-sm font-bold flex justify-between uppercase border-2 border-black shadow-[4px_4px_0_#000] z-40
                ${isSample ? "bg-[#FDA4AF] text-black" : "bg-[#86EFAC] text-black"}
            `}>
                <span>Modo Atual: {isSample ? "AMOSTRA ATIVA!" : "ACESSO TOTAL LIBERADO!"}</span>
                <span>Páginas: {numPages === 0 ? "?" : `${renderPages}/${numPages}`}</span>
            </div>

            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-10 h-10 border-4 border-zinc-600 border-t-[#60a5fa] rounded-full animate-spin" />
                        <p className="text-zinc-600 font-serif text-lg font-bold">Iniciando leitura segura...</p>
                    </div>
                }
                error={
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <p className="text-red-500 font-black text-lg">Erro ao carregar o PDF.</p>
                        <a href={fileUrl} download className="text-blue-600 mt-2 underline font-bold">
                            Tentar Baixar PDF Diretamente
                        </a>
                    </div>
                }
                className="w-full flex flex-col items-center gap-2"
            >
                {renderPages > 0 &&
                    Array.from({ length: renderPages }, (_, index) => (
                        <VirtualizedPdfPage
                            key={`virtual_page_${index + 1}`}
                            pageNumber={index + 1}
                            pageWidth={pageWidth}
                            isSample={isSample}
                            isLastSamplePage={index === renderPages - 1}
                            isLandscape={isLandscape}
                        />
                    ))
                }
            </Document>

            {/* UPSELL PAYWALL (Modo Amostra Fim) */}
            {isSample && renderPages > 0 && (
                <div className="w-full max-w-2xl mt-[-60px] relative z-30 px-4">
                    <div className="bg-[#FDA4AF] border-4 border-black p-8 text-black shadow-[12px_12px_0px_#000] text-center rotate-1">
                        <Lock className="w-12 h-12 mx-auto stroke-black mb-4" strokeWidth={2.5} />
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Fim da Amostra</h3>
                        <p className="font-serif italic font-bold text-lg mb-8 opacity-80">
                            A leitura completa deste conteúdo está reservada para assinantes do material completo. Destrave todos os capítulos instantaneamente!
                        </p>
                        <Link href="/precos">
                            <button className="bg-black text-white hover:bg-[#10B981] hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all px-8 py-5 text-xl font-black uppercase tracking-widest border-2 border-black inline-flex items-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]">
                                Destravar Acesso <ArrowRight className="w-6 h-6" strokeWidth={3} />
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Floating Page Indicator */}
            {renderPages > 0 && !isSample && (
                <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-black/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 font-serif font-bold text-sm md:text-base animate-in slide-in-from-bottom-5 flex items-center gap-2">
                    <span className="text-[#60a5fa]">Página</span> {currentPage} <span className="text-zinc-500 font-sans font-normal mx-1">de</span> {numPages}
                </div>
            )}

            {renderPages > 0 && (
                <p className="text-zinc-500 text-sm mt-12 mb-8 font-sans font-bold">
                    {isSample ? `${renderPages} de ${numPages} páginas (Amostra Gratuita)` : `Bíblia Oficial — Ebook ${numPages} páginas`}
                </p>
            )}
        </div>
    );
}
