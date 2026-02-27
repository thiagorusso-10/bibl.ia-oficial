"use client";

import { useEffect, useCallback } from "react";
import { NeoButton } from "@/components/ui/neo-button";
import { X, Download, Maximize2 } from "lucide-react";

interface PdfPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    pdfUrl: string;
    canDownload?: boolean;
}

export function PdfPreviewModal({
    isOpen,
    onClose,
    title,
    pdfUrl,
    canDownload = true,
}: PdfPreviewModalProps) {
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-900/95">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black text-white border-b-2 border-zinc-700">
                <h2 className="font-bold text-sm md:text-base truncate max-w-[60%]">
                    {title}
                </h2>
                <div className="flex items-center gap-2">
                    {/* Open in new tab (full browser PDF viewer) */}
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-border bg-zinc-800 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 hover:bg-zinc-700 transition-colors"
                    >
                        <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
                        <span className="hidden sm:inline">Tela Cheia</span>
                    </a>
                    {/* Download */}
                    {canDownload && (
                        <a href={pdfUrl} download>
                            <NeoButton variant="primary" size="sm">
                                <Download className="w-3.5 h-3.5" strokeWidth={2} />
                                <span className="hidden sm:inline">Download</span>
                            </NeoButton>
                        </a>
                    )}

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="neo-border bg-white text-black p-1.5 hover:bg-zinc-200 transition-colors"
                        aria-label="Fechar"
                    >
                        <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative">
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                    className="absolute inset-0 w-full h-full"
                    title={`Preview: ${title}`}
                />
            </div>
        </div>
    );
}
