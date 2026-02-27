"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfEbookViewerProps {
    fileUrl: string;
}

export function PdfEbookViewer({ fileUrl }: PdfEbookViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(800);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track visible page using IntersectionObserver
    useEffect(() => {
        if (numPages === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find all intersecting entries
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    // Pick the one that is most visible (highest intersection ratio)
                    // Or simply the first one that triggered
                    const mostVisible = visibleEntries.reduce((prev, current) =>
                        (prev.intersectionRatio > current.intersectionRatio) ? prev : current
                    );
                    const pageNum = Number(mostVisible.target.getAttribute("data-page-number"));
                    if (pageNum) setCurrentPage(pageNum);
                }
            },
            { threshold: [0.3, 0.5, 0.8] } // Trigger at different visibility milestones
        );

        const pageElements = document.querySelectorAll(".pdf-page-wrapper");
        pageElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [numPages]);

    // Measure container width for responsive rendering (with debounce for mobile zoom stability)
    useEffect(() => {
        let initialWidth = 0;
        function updateWidth() {
            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                // Only update if it's the first time or if the width changed significantly (e.g., orientation change)
                // This prevents iOS Safari visual viewport pinch-to-zoom from firing continuous resize events
                // which causes react-pdf to re-render in an infinite loop and makes the screen "dance"
                if (initialWidth === 0 || Math.abs(initialWidth - newWidth) > 50) {
                    initialWidth = newWidth;
                    setContainerWidth(newWidth);
                }
            }
        }
        updateWidth();

        let timeoutId: NodeJS.Timeout;
        const resizeHandler = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateWidth, 300);
        };

        window.addEventListener("resize", resizeHandler);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    }, []);

    // PDF page width: fill the container but cap at a comfortable reading size
    const pageWidth = Math.min(containerWidth - 16, 900);

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center">
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-10 h-10 border-4 border-zinc-600 border-t-[#60a5fa] rounded-full animate-spin" />
                        <p className="text-zinc-400 font-serif text-lg">Carregando ebook...</p>
                    </div>
                }
                error={
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <p className="text-red-400 font-bold text-lg">Erro ao carregar o PDF.</p>
                        <a href={fileUrl} download className="text-[#60a5fa] underline">
                            Baixar PDF diretamente
                        </a>
                    </div>
                }
                className="w-full flex flex-col items-center gap-2"
            >
                {numPages > 0 &&
                    Array.from({ length: numPages }, (_, index) => (
                        <div
                            key={`page_wrapper_${index + 1}`}
                            className="pdf-page-wrapper w-full flex justify-center mb-4 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8"
                            data-page-number={index + 1}
                        >
                            <Page
                                pageNumber={index + 1}
                                width={pageWidth}
                                className="shadow-2xl rounded-md overflow-hidden"
                                loading={
                                    <div className="flex items-center justify-center bg-zinc-800/50 rounded-lg" style={{ width: pageWidth, height: pageWidth * 1.414 }}>
                                        <div className="w-6 h-6 border-2 border-zinc-600 border-t-[#60a5fa] rounded-full animate-spin" />
                                    </div>
                                }
                            />
                        </div>
                    ))
                }
            </Document>

            {/* Floating Page Indicator */}
            {numPages > 0 && (
                <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-black/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 font-serif font-bold text-sm md:text-base animate-in slide-in-from-bottom-5 flex items-center gap-2">
                    <span className="text-[#60a5fa]">Página</span> {currentPage} <span className="text-zinc-500 font-sans font-normal mx-1">de</span> {numPages}
                </div>
            )}

            {numPages > 0 && (
                <p className="text-zinc-500 text-sm mt-4 mb-8 font-sans">
                    {numPages} {numPages === 1 ? "página" : "páginas"}
                </p>
            )}
        </div>
    );
}
