"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoTag, type NeoTagCategory } from "@/components/ui/neo-tag";
import { AnimatedCard } from "@/components/ui/animated-card";
import { PdfPreviewModal } from "@/components/ui/pdf-preview-modal";
import { MarkAsReadButton } from "@/components/ui/mark-as-read-button";
import { Download, Baby, BookOpen, Puzzle, Eye, Lock, ShoppingCart, Star, Sparkles } from "lucide-react";

export type KidsActivity = {
    id: string;
    title: string;
    category: string;
    description: string;
    coverUrl: string;
    fileUrl: string;
};

export interface KidsStory {
    id: string;
    title: string;
    number: number;
    description: string;
    fileUrl: string;
    emoji: string;
    color?: string;
    hasMdx?: boolean;
};

const activityCategories: NeoTagCategory[] = [
    "Caça Palavras",
    "Caligrafia",
    "Caminhos",
    "Cruzadinha",
    "Colorir",
    "Detetive",
    "Matemática",
    "Pesquisa",
    "Quiz",
    "Ligue as Sombras",
];

type ActiveTab = "atividades" | "historias";

export function KidsClient({
    activities,
    stories,
    hasAccess,
    completedIds = [],
}: {
    activities: KidsActivity[];
    stories: KidsStory[];
    hasAccess: boolean;
    completedIds?: string[];
}) {
    const completedSet = new Set(completedIds);
    const [activeTab, setActiveTab] = useState<ActiveTab>("atividades");
    const [activeFilter, setActiveFilter] = useState<NeoTagCategory | "all">(
        "all"
    );
    const [previewPdf, setPreviewPdf] = useState<{
        title: string;
        url: string;
        canDownload: boolean;
    } | null>(null);

    const filteredActivities =
        activeFilter === "all"
            ? activities
            : activities.filter((r) => r.category === activeFilter);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
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

            {/* Header Pop Kids */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#10B981] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
            >
                <div className="absolute top-4 right-4 animate-bounce">
                    <Sparkles className="w-16 h-16 text-white stroke-black fill-white" strokeWidth={2} />
                </div>

                <div className="relative z-10 flex items-center gap-4">
                    <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-6">
                        <Baby className="w-12 h-12 stroke-black" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tight mb-2 text-white text-stroke-2 drop-shadow-md">Fun Bible Kids</h1>
                        <p className="text-xl font-bold text-black border-2 border-black bg-white inline-block px-2 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {activeTab === "atividades" ? "Atividades Divertidas!" : "Histórias Ilustradas!"}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Tabs Pop */}
            <div className="flex gap-4 p-2 bg-black/5 border-2 border-black border-dashed rounded-lg">
                <button
                    onClick={() => {
                        setActiveTab("atividades");
                        setActiveFilter("all");
                    }}
                    className={`flex-1 py-4 font-black uppercase tracking-wide text-lg flex items-center justify-center gap-3 transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${activeTab === "atividades"
                        ? "bg-[#FDE047] -translate-y-1"
                        : "bg-white hover:bg-[#FEF08A] hover:-translate-y-1"
                        }`}
                >
                    <Puzzle className="w-6 h-6" strokeWidth={2.5} />
                    Atividades
                </button>
                <button
                    onClick={() => setActiveTab("historias")}
                    className={`flex-1 py-4 font-black uppercase tracking-wide text-lg flex items-center justify-center gap-3 transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${activeTab === "historias"
                        ? "bg-[#EC4899] text-white -translate-y-1"
                        : "bg-white hover:bg-[#FBCFE8] hover:-translate-y-1"
                        }`}
                >
                    <BookOpen className="w-6 h-6" strokeWidth={2.5} />
                    Histórias
                </button>
            </div>

            {/* TAB: ATIVIDADES */}
            {activeTab === "atividades" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 mb-8 justify-center">
                        <button
                            onClick={() => setActiveFilter("all")}
                            className={`border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${activeFilter === "all"
                                ? "bg-[#a3e635] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px]"
                                : "bg-white hover:bg-[#10B981] active:bg-[#10B981]"
                                }`}
                        >
                            Todos
                        </button>
                        {activityCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${activeFilter === cat
                                    ? "bg-[#a3e635] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px]"
                                    : "bg-white hover:bg-[#10B981] active:bg-[#10B981]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Activities Grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredActivities.map((resource) => (
                            <AnimatedCard key={resource.id}>
                                <div className="flex flex-col h-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                    {/* Cover (3D Mockup UAL) */}
                                    <button
                                        onClick={() =>
                                            setPreviewPdf({
                                                title: hasAccess ? resource.title : `Amostra: ${resource.title}`,
                                                url: resource.fileUrl,
                                                canDownload: hasAccess,
                                            })
                                        }
                                        className="relative aspect-[4/3] w-full flex items-center justify-center p-6 overflow-hidden border-b-4 border-black group cursor-pointer bg-[#1B222C]"
                                    >
                                        {/* Efeito Glow */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 blur-[50px] rounded-full pointer-events-none"></div>

                                        {/* Book Mockup */}
                                        <div className="relative w-auto h-full aspect-[1/1.414] shadow-[12px_15px_30px_rgba(0,0,0,0.8)] border border-white/20 rounded-r-md border-l-[6px] border-l-black/80 group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-1 transition-all duration-500 z-10 bg-zinc-900">
                                            <Image
                                                src={resource.coverUrl}
                                                alt={resource.title}
                                                fill
                                                className="object-cover rounded-r-md opacity-95 group-hover:opacity-100 transition-opacity"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                quality={100}
                                            />
                                            {/* Spine Highlight */}
                                            <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent mix-blend-overlay"></div>
                                        </div>

                                        {!hasAccess && (
                                            <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs font-black uppercase border-2 border-white z-20">
                                                Locked
                                            </div>
                                        )}
                                    </button>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="mb-2">
                                            <span className="bg-[#A855F7] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">
                                                {resource.category}
                                            </span>
                                        </div>
                                        <h3 className="font-black text-xl mb-2 uppercase leading-none">{resource.title}</h3>
                                        <p className="text-zinc-600 text-sm font-serif italic mb-4 flex-1">
                                            {resource.description}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 mt-auto">
                                            {hasAccess ? (
                                                <div className="flex gap-2">
                                                    <button onClick={() => setPreviewPdf({ title: resource.title, url: resource.fileUrl, canDownload: true })} className="flex-1">
                                                        <NeoButton size="sm" className="w-full bg-[#10B981] hover:bg-[#34D399] border-2 text-sm font-bold shadow-[2px_2px_0px_0px_#000]">
                                                            Abrir
                                                        </NeoButton>
                                                    </button>
                                                    <div className="shrink-0">
                                                        <MarkAsReadButton contentItemId={resource.id} initialIsRead={completedSet.has(resource.id)} size="sm" className="h-full px-3 border-2" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Link href={`/read/${resource.id}?from=kids`} className="flex-1">
                                                        <NeoButton size="sm" className="w-full bg-[#E9D5FF] border-2 shadow-[2px_2px_0px_0px_#000] text-black hover:bg-[#D8B4FE]">Amostra</NeoButton>
                                                    </Link>
                                                    <Link href="/precos" className="flex-1">
                                                        <NeoButton size="sm" className="w-full bg-[#EC4899] hover:bg-[#F472B6] text-white border-2 shadow-[2px_2px_0px_0px_#000]">Comprar</NeoButton>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </AnimatedCard>
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* TAB: HISTÓRIAS */}
            {activeTab === "historias" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {stories.map((story, i) => (
                        <AnimatedCard key={story.id} delay={i * 0.1}>
                            <div className="flex flex-col h-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-transform">
                                <div className="flex items-stretch flex-1">
                                    <div className={`p-4 ${story.color || 'bg-[#93C5FD]'} border-r-4 border-black flex flex-col items-center justify-center min-w-[80px]`}>
                                        <span className="text-4xl filter drop-shadow-md">{story.emoji}</span>
                                        <span className="bg-black text-white px-1 text-xs font-black mt-2">#{story.number}</span>
                                    </div>
                                    <div className="p-4 flex flex-col justify-center">
                                        <h3 className="font-black text-2xl uppercase leading-none mb-2">{story.title}</h3>
                                        <p className="text-zinc-600 text-sm font-serif italic">{story.description}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-zinc-50 border-t-4 border-black flex gap-3">
                                    {hasAccess ? (
                                        <>
                                            <Link href={`/read/${story.id}?from=kids`} className="flex-1">
                                                <NeoButton size="sm" className="w-full bg-[#10B981] hover:bg-[#34D399] text-black border-2 shadow-[2px_2px_0px_0px_#000]">Leia Online</NeoButton>
                                            </Link>
                                            <a href={story.fileUrl} download className="flex-1">
                                                <NeoButton size="sm" className="w-full bg-black text-white border-2 hover:bg-zinc-800">Baixar</NeoButton>
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={`/read/${story.id}?from=kids`} className="flex-1">
                                                <NeoButton size="sm" className="w-full bg-[#E9D5FF] border-2 shadow-[2px_2px_0px_0px_#000] text-black hover:bg-[#D8B4FE]">Amostra</NeoButton>
                                            </Link>
                                            <Link href="/precos" className="flex-1">
                                                <NeoButton size="sm" className="w-full bg-[#EC4899] hover:bg-[#F472B6] text-white border-2 shadow-[2px_2px_0px_0px_#000]">Comprar</NeoButton>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </AnimatedCard>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
