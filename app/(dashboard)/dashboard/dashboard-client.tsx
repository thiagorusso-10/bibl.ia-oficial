"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { BookOpen, Baby, ArrowRight, Sparkles, Trophy, Flame, Star, Heart } from "lucide-react";

interface DashboardClientProps {
    ebooks: any[];
    completedCount: number;
    kidsCount: number;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export function DashboardClient({ ebooks, completedCount, kidsCount }: DashboardClientProps) {
    const { user } = useUser();
    const firstName = user?.firstName || "Visitante";

    return (
        <div className="space-y-12">
            {/* HERO SECTION - POP THEOLOGY STYLE */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative overflow-hidden border-4 border-black bg-[#A855F7] text-black p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#FDE047] rounded-full border-4 border-black z-0" />
                <div className="hidden md:block absolute top-[40%] right-[10%] w-16 h-16 bg-[#FDE047] rounded-full border-4 border-black z-0" />
                <div className="hidden md:block absolute top-[20%] right-[30%] w-8 h-8 bg-black rounded-full z-0" />
                <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-[#10B981] rounded-full border-4 border-black z-0" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, rotate: -5 }}
                            animate={{ opacity: 1, rotate: -2 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border-2 border-black px-4 py-2 inline-block mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <span className="text-sm font-black uppercase tracking-widest">Sua Jornada Começa Aqui</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-6 drop-shadow-sm">
                            Olá, <span className="text-white text-stroke-2">{firstName}</span>!
                        </h1>
                        <p className="text-xl md:text-2xl font-bold font-serif italic mb-8 max-w-xl leading-relaxed">
                            "Hoje é um dia perfeito para descobrir algo novo e incrível nas Escrituras."
                        </p>

                        <div className="flex gap-4">
                            <Link href="/learn">
                                <NeoButton className="bg-black text-white hover:bg-white hover:text-black border-2 border-black text-lg py-6 px-8 shadow-[8px_8px_0px_0px_#ffffff]">
                                    Continuar Estudos <ArrowRight className="ml-2 w-6 h-6" />
                                </NeoButton>
                            </Link>
                        </div>
                    </div>

                    {/* Fun Illustration Placeholder */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="hidden md:flex relative bg-white border-4 border-black p-6 rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <Flame className="w-24 h-24 text-[#FDE047] fill-[#FDE047] stroke-black transform hover:scale-110 transition-transform" strokeWidth={2.5} />
                        <div className="absolute -top-4 -right-4 bg-[#EC4899] border-2 border-black px-3 py-1 font-black text-xs rotate-12">
                            ON FIRE!
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* STATS BAR - POP CARDS */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <AnimatedCard delay={0.1}>
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#FDE047] translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 z-0" />
                        <div className="relative z-10 text-center">
                            <BookOpen className="w-12 h-12 mb-2 mx-auto stroke-black group-hover:scale-110 group-active:scale-110 transition-transform" strokeWidth={2.5} />
                            <p className="text-6xl font-black">{ebooks.length}</p>
                            <p className="text-sm font-bold uppercase tracking-widest mt-1">Ebooks Disponíveis</p>
                        </div>
                        <div className="absolute bottom-2 right-2 md:hidden opacity-0 group-active:opacity-100 transition-opacity">
                            <ArrowRight className="w-6 h-6 stroke-black" strokeWidth={3} />
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={0.2}>
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#10B981] translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 z-0" />
                        <div className="relative z-10 text-center">
                            <Baby className="w-12 h-12 mb-2 mx-auto stroke-black group-hover:scale-110 group-active:scale-110 transition-transform" strokeWidth={2.5} />
                            <p className="text-6xl font-black">{kidsCount > 0 ? kidsCount : "20+"}</p>
                            <p className="text-sm font-bold uppercase tracking-widest mt-1">Atividades Kids</p>
                        </div>
                        <div className="absolute bottom-2 right-2 md:hidden opacity-0 group-active:opacity-100 transition-opacity">
                            <ArrowRight className="w-6 h-6 stroke-black" strokeWidth={3} />
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={0.3}>
                    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#EC4899] translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300 z-0" />
                        <div className="relative z-10 text-center">
                            <Trophy className="w-12 h-12 mb-2 mx-auto stroke-black group-hover:scale-110 group-active:scale-110 transition-transform" strokeWidth={2.5} />
                            <p className="text-6xl font-black">{completedCount}</p>
                            <p className="text-sm font-bold uppercase tracking-widest mt-1">Conquistas</p>
                        </div>
                        <div className="absolute bottom-2 right-2 md:hidden opacity-0 group-active:opacity-100 transition-opacity">
                            <ArrowRight className="w-6 h-6 stroke-black" strokeWidth={3} />
                        </div>
                    </div>
                </AnimatedCard>
            </motion.div>

            {/* MAIN GRID */}
            <div className="grid md:grid-cols-12 gap-12">
                {/* Column: Ebooks */}
                <div className="md:col-span-8 flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b-4 border-black pb-4">
                        <h2 className="text-4xl font-black uppercase flex items-center gap-4">
                            <span className="bg-[#93C5FD] border-2 border-black p-1 block shadow-[4px_4px_0px_0px_#000]">
                                <BookOpen className="w-6 h-6" strokeWidth={3} />
                            </span>
                            Estudos
                        </h2>
                        <Link href="/learn">
                            <span className="font-bold underlinedecoration-2 underline-offset-4 hover:bg-[#FDE047] px-1 transition-colors">
                                Ver todos &rarr;
                            </span>
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        {ebooks.slice(0, 3).map((ebook, i) => (
                            <AnimatedCard key={ebook.id} delay={0.4 + (i * 0.1)}>
                                <Link href="/learn">
                                    <div className="bg-white border-4 border-black p-0 flex flex-col sm:flex-row shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group overflow-hidden">
                                        {/* 3D Book Thumbnail (UAL Factor) */}
                                        <div className={`relative w-full sm:w-[150px] h-40 sm:h-auto shrink-0 border-b-4 sm:border-b-0 sm:border-r-4 border-black ${ebook.color || "bg-zinc-100"} flex items-center justify-center overflow-hidden`}>
                                            {/* Halftone / Dotted Pattern */}
                                            <div className="absolute inset-0 bg-[radial-gradient(circle,_#000000_1.5px,_transparent_2px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

                                            {/* Mini 3D Book - Ajustado para dar respiro (w-20/w-24) */}
                                            <div className="relative w-20 sm:w-24 aspect-[1/1.414] shadow-[8px_10px_15px_rgba(0,0,0,0.6)] border border-white/20 rounded-r-sm border-l-4 border-l-black/80 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 transition-transform duration-500 z-10 bg-zinc-900 rotate-[-4deg]">
                                                {(ebook.coverUrl || ebook.imageUrl) ? (
                                                    <Image
                                                        src={ebook.coverUrl || ebook.imageUrl}
                                                        alt={ebook.title}
                                                        fill
                                                        className="object-cover rounded-r-sm"
                                                        sizes="(max-width: 768px) 150px, 200px"
                                                        quality={100}
                                                        priority
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-500"><BookOpen /></div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Text Section (Pop & Alive) */}
                                        <div className="relative flex-1 p-6 flex flex-col justify-center bg-white overflow-hidden group-hover:bg-zinc-50 transition-colors">
                                            {/* Subtle Grid Background */}
                                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                                            {/* Background Decoration Icon */}
                                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 group-hover:scale-110 duration-500 pointer-events-none">
                                                <Sparkles className="w-32 h-32" />
                                            </div>

                                            <div className="relative z-10 flex items-center gap-3 mb-3">
                                                <span className={`${ebook.color || "bg-black"} border-2 border-black text-black text-[10px] font-black uppercase px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                                    Ebook
                                                </span>
                                                {ebook.isRead && (
                                                    <span className="bg-green-100 border-2 border-green-600 text-green-700 text-[10px] font-black uppercase px-2 py-1 shadow-[2px_2px_0px_0px_#166534]">
                                                        ✓ Lido
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="relative z-10 font-black text-2xl uppercase leading-none mb-3 group-hover:text-[#A855F7] transition-colors font-sans">
                                                {ebook.title}
                                            </h3>
                                            <p className="relative z-10 text-zinc-700 font-serif italic line-clamp-2 text-sm max-w-sm">
                                                "{ebook.description}"
                                            </p>
                                        </div>

                                        {/* Action Button Segment */}
                                        <div className={`hidden sm:flex items-center justify-center p-6 border-l-4 border-black transition-colors ${ebook.color || "bg-[#f4f4f5]"} group-hover:bg-black group-hover:text-white`}>
                                            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 group-hover:scale-110 transition-transform stroke-current" strokeWidth={3} />
                                        </div>
                                    </div>
                                </Link>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>

                {/* Column: Kids Promo */}
                <div className="md:col-span-4 flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b-4 border-black pb-4">
                        <h2 className="text-4xl font-black uppercase flex items-center gap-4">
                            <span className="bg-[#EC4899] border-2 border-black p-1 block shadow-[4px_4px_0px_0px_#000]">
                                <Baby className="w-6 h-6" strokeWidth={3} />
                            </span>
                            Kids
                        </h2>
                    </div>

                    <AnimatedCard delay={0.6} className="h-full">
                        <Link href="/kids" className="h-full block">
                            <div className="h-full min-h-[400px] border-4 border-black bg-[#10B981] p-8 flex flex-col items-center justify-center text-center gap-6 relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
                                {/* Dotted Pattern */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle,_#000000_2px,_transparent_2.5px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                                <div className="bg-white border-4 border-black p-8 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 rotate-6 group-hover:rotate-12 transition-transform">
                                    <Baby className="w-16 h-16 stroke-black" strokeWidth={2} />
                                </div>

                                <div className="relative z-10 mt-4 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                                    <h3 className="text-3xl font-black uppercase mb-2 leading-none">
                                        FUN BIBLE <br /> <span className="text-[#A855F7]">KIDS</span>
                                    </h3>
                                    <p className="font-bold font-serif text-sm">
                                        Para os pequenos teólogos!
                                    </p>
                                </div>

                                <NeoButton className="w-full font-black text-xl py-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black mt-auto shadow-[6px_6px_0px_0px_#fff]">
                                    ACESSAR
                                </NeoButton>
                            </div>
                        </Link>
                    </AnimatedCard>
                </div>
            </div>
        </div>
    );
}
