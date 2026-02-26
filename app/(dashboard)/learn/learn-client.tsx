"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { PdfPreviewModal } from "@/components/ui/pdf-preview-modal";
import { BookOpen, Download, Eye, GraduationCap, Lock, ShoppingCart, Star } from "lucide-react";
import { MarkAsReadButton } from "@/components/ui/mark-as-read-button";
import type { EbookData } from "./page";

export function LearnClient({ ebooks }: { ebooks: EbookData[] }) {
    const [previewPdf, setPreviewPdf] = useState<{
        title: string;
        url: string;
        canDownload: boolean;
    } | null>(null);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="space-y-12">
            {/* PDF Preview Modal */}
            <PdfPreviewModal
                isOpen={previewPdf !== null}
                onClose={() => setPreviewPdf(null)}
                title={previewPdf?.title ?? ""}
                pdfUrl={previewPdf?.url ?? ""}
                canDownload={previewPdf?.canDownload ?? false}
            />

            {/* Header Pop */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#FDE047] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
                        <GraduationCap className="w-12 h-12 stroke-black" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tight mb-2">Estudos Bíblicos</h1>
                        <p className="text-xl font-serif italic text-black font-bold">
                            "Mergulhe fundo. Pense alto. Viva intensamente."
                        </p>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 opacity-10">
                    <BookOpen className="w-64 h-64 -mr-10 -mt-10" />
                </div>
            </motion.div>

            {/* Ebooks List */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-8"
            >
                {ebooks.map((ebook, i) => (
                    <AnimatedCard key={ebook.id}>
                        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row overflow-hidden group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                            {/* Visual Graphic (3D Book Mockup) */}
                            <div
                                className="relative w-full lg:w-[340px] flex items-center justify-center p-8 md:p-12 lg:p-8 bg-[#1B222C] border-b-4 lg:border-b-0 lg:border-r-4 border-black relative overflow-hidden"
                            >
                                {/* Efeito de Luz / Brilho de Fundo */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-[60px] rounded-full point-events-none"></div>

                                {/* Container do Mockup (Fator UAL) */}
                                <div className="relative w-full max-w-[240px] aspect-[1/1.414] shadow-[16px_20px_40px_rgba(0,0,0,0.8)] border border-white/10 rounded-r-md border-l-8 border-l-black/80 group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-[-2deg] transition-all duration-500 z-10 bg-zinc-900">
                                    <Image
                                        src={ebook.coverUrl}
                                        alt={ebook.title}
                                        fill
                                        className="object-cover rounded-r-md opacity-95 group-hover:opacity-100 transition-opacity"
                                        sizes="(max-width: 768px) 50vw, 300px"
                                        quality={100}
                                        priority={i < 2}
                                    />
                                    {/* Efeito de brilho na lombada (Spine Highlight) */}
                                    <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent mix-blend-overlay"></div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col bg-white relative">
                                {/* Top Line */}
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-wider ${ebook.color || "bg-[#93C5FD]"}`}>
                                            Ebook
                                        </span>
                                        {ebook.isRead && (
                                            <span className="border-2 border-black bg-[#86EFAC] px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                                                Concluído <Star className="w-3 h-3 fill-black" />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black uppercase leading-none mb-3 font-sans w-fit bg-gradient-to-r from-transparent to-transparent group-hover:from-[#FDE047] group-hover:to-transparent bg-[length:100%_40%] bg-no-repeat bg-bottom transition-[background-size]">
                                    {ebook.title}
                                </h2>

                                <h3 className="text-lg font-bold font-serif italic text-zinc-500 mb-6">
                                    {ebook.subtitle}
                                </h3>

                                <p className="text-black text-lg leading-relaxed mb-8 max-w-2xl font-serif">
                                    {ebook.description}
                                </p>

                                {/* Topics Chips */}
                                <div className="mb-8 flex flex-wrap gap-2">
                                    {ebook.topics.slice(0, 4).map((topic, j) => (
                                        <span key={j} className="bg-zinc-100 border border-black px-2 py-1 text-xs font-bold uppercase text-zinc-600">
                                            #{topic}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="mt-auto flex flex-col sm:flex-row gap-4 border-t-2 border-zinc-100 pt-6">
                                    {ebook.hasAccess ? (
                                        <>
                                            <Link href={`/read/${ebook.slug}`} className="flex-1">
                                                <NeoButton variant="outline" className="w-full bg-white hover:bg-[#A855F7] hover:text-white text-lg py-6 border-2 transition-colors">
                                                    <Eye className="mr-2 w-5 h-5" /> Iniciar Leitura
                                                </NeoButton>
                                            </Link>
                                            <a href={ebook.fileUrl} download className="flex-1">
                                                <NeoButton variant="primary" className="w-full bg-black text-white hover:bg-zinc-800 text-lg py-6 border-2">
                                                    <Download className="mr-2 w-5 h-5" /> Baixar PDF
                                                </NeoButton>
                                            </a>
                                            {ebook.contentItemId && (
                                                <div className="sm:w-auto w-full">
                                                    <MarkAsReadButton contentItemId={ebook.contentItemId} initialIsRead={ebook.isRead} size="sm" className="w-full h-full aspect-square border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Link href={`/read/${ebook.slug}`} className="w-full">
                                                <NeoButton variant="secondary" className="w-full bg-[#E9D5FF] hover:bg-[#A855F7] hover:text-white transition-colors text-black border-2 text-lg py-6">
                                                    <BookOpen className="mr-2 w-5 h-5" /> Amostra
                                                </NeoButton>
                                            </Link>
                                            <Link href="/precos" className="w-full">
                                                <NeoButton variant="accent" className="w-full bg-[#EC4899] border-2 text-lg py-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none hover:border-black">
                                                    <ShoppingCart className="mr-2 w-5 h-5" /> Comprar
                                                </NeoButton>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>
                ))}
            </motion.div>
        </div>
    );
}
