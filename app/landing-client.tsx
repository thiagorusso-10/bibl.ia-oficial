"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { AccordionItem } from "@/components/ui/accordion";
import {
    BookOpen,
    Baby,
    Sparkles,
    ArrowRight,
    Cross,
    Heart,
    Zap,
    Star,
    CheckCircle2,
    MonitorPlay,
    ShieldCheck,
    Lock,
    Gift,
    Flame
} from "lucide-react";
import type { ProductCard } from "@/app/(marketing)/precos/precos-client";
import { Check } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";

function formatPrice(cents: number) {
    return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
}

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function LandingClient({ products }: { products: ProductCard[] }) {
    const combos = products.filter((p) => p.slug.startsWith("combo-"));

    return (
        <div className="min-h-screen bg-[#FFFBEB] font-sans selection:bg-[#FDE047] selection:text-black antialiased overflow-x-hidden">
            {/* Nav Transparente/Sticky */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFBEB]/90 backdrop-blur-md border-b-4 border-black py-4 px-6 md:px-12 flex justify-between items-center shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-black text-white p-1 group-hover:bg-[#FDE047] group-hover:text-black transition-colors">
                        <Cross className="w-6 h-6" strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
                        BIBL.IA
                    </span>
                </Link>
                <div className="flex gap-4">
                    <Link href="/sign-in">
                        <NeoButton variant="outline" size="sm" className="font-bold border-2 border-black bg-white hover:bg-zinc-100 transition-colors px-3 md:px-4">
                            Entrar
                        </NeoButton>
                    </Link>
                    <Link href="#planos">
                        <NeoButton variant="primary" size="sm" className="bg-[#10B981] text-black hover:bg-black hover:text-[#10B981] border-2 border-black font-black uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-none transition-all">
                            Ver Planos
                        </NeoButton>
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-0">
                {/* 1. Hero Section Explosivo */}
                <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="z-10 relative"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
                                className="inline-block bg-[#FDE047] border-4 border-black px-4 py-1 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2"
                            >
                                <span className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Plataforma Definitiva
                                </span>
                            </motion.div>

                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 relative">
                                Descubra a <br />
                                <span className="relative inline-block mt-2">
                                    <span className="absolute inset-0 bg-[#FDE047] -skew-x-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></span>
                                    <span className="relative z-10 px-4">Verdade.</span>
                                </span>
                                <br /> Visual
                                <span className="text-[#A855F7]"> Limpo.</span>
                            </h1>

                            <p className="text-2xl font-serif italic text-zinc-700 mb-10 leading-relaxed border-l-4 border-black pl-6">
                                A única plataforma que une <strong>Teologia Viva</strong> para você e o <strong>Kit Fun Bible</strong> para as crianças, sem complicação e com design impecável.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link href="#planos">
                                    <NeoButton variant="primary" size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-[#10B981] hover:text-black text-xl py-8 px-10 font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none transition-all flex items-center justify-center gap-3">
                                        Quero Ter Acesso  <ArrowRight className="w-6 h-6" strokeWidth={3} />
                                    </NeoButton>
                                </Link>
                            </div>
                            <div className="mt-6 flex items-center gap-4 text-sm font-bold uppercase text-zinc-600">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-200"></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-300"></div>
                                    <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-400"></div>
                                </div>
                                <p>Junte-se a Centenas de Leitores</p>
                            </div>
                        </motion.div>

                        {/* Floating Cards Display (Remodelled for High Ticket) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-[#EC4899]/20 blur-[80px] -z-10 rounded-full"></div>

                            <div className="relative z-10 space-y-6">
                                <NeoCard className="bg-white border-4 border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-3 absolute -right-10 top-0 z-20 w-80">
                                    <div className="flex items-center gap-4 border-b-2 border-dashed border-zinc-200 pb-4 mb-4">
                                        <div className="bg-[#FDE047] p-3 border-4 border-black">
                                            <BookOpen className="w-6 h-6" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Teologia Viva</h3>
                                            <p className="font-serif italic text-sm text-zinc-500">Antigo e Novo Testamento</p>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-zinc-100 border-2 border-black w-3/4 mb-2"></div>
                                    <div className="h-4 bg-zinc-100 border-2 border-black w-1/2"></div>
                                </NeoCard>

                                <NeoCard className="bg-[#10B981] border-4 border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-3 absolute -left-10 top-32 z-30 w-80">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-3 border-4 border-black">
                                            <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Progresso Salvo</h3>
                                            <p className="font-serif italic text-sm text-black/70">Saiba onde parou.</p>
                                        </div>
                                    </div>
                                </NeoCard>

                                <NeoCard className="bg-[#A855F7] border-4 border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-2 absolute right-0 top-64 z-10 w-80">
                                    <div className="flex items-center gap-4 border-b-2 border-black pb-4 mb-4">
                                        <div className="bg-white p-3 border-4 border-black">
                                            <Baby className="w-6 h-6" strokeWidth={3} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Kids Bible</h3>
                                            <p className="font-serif italic text-sm text-black/70">Atividades de colorir</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="aspect-square bg-white border-2 border-black"></div>
                                        <div className="aspect-square bg-white border-2 border-black"></div>
                                        <div className="aspect-square bg-white border-2 border-black"></div>
                                    </div>
                                </NeoCard>
                            </div>
                            {/* Um bloco invisivel para manter a altura */}
                            <div className="h-[500px] w-full invisible"></div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. Sneak Peek (Mockups) */}
                <section className="bg-black text-white py-24 px-6 md:px-12 border-y-8 border-[#FDE047] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tight">
                                Por dentro do <span className="text-[#10B981]">App</span>
                            </h2>
                            <p className="text-xl font-serif italic text-zinc-400 max-w-2xl mx-auto mb-16">
                                Uma experiência de leitura moderna. Diga adeus aos PDFs difíceis de ler no celular. Tudo foi pensado para a sua imersão.
                            </p>
                        </motion.div>

                        {/* Mockup Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900 border-4 border-zinc-700 rounded-3xl p-4 md:p-8 max-w-5xl mx-auto shadow-[0px_20px_0px_0px_#000] rotate-1"
                        >
                            <div className="bg-white rounded-xl overflow-hidden border-4 border-black text-black">
                                {/* Header Mockup */}
                                <div className="border-b-4 border-black p-4 flex justify-between items-center bg-[#FFFBEB]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
                                    </div>
                                    <div className="font-black tracking-widest uppercase text-sm">Painel de Acesso</div>
                                </div>
                                {/* Body Mockup (Split Pane) */}
                                <div className="flex bg-[url('/texture.png')] min-h-[400px]">
                                    {/* Sidebar Mockup (Hidden on mobile) */}
                                    <div className="hidden md:flex flex-col w-1/4 border-r-4 border-black bg-white p-6 justify-between">
                                        <div>
                                            <div className="font-black italic text-xl mb-8">BIBL.IA <span className="text-[#A855F7]">PRO</span></div>
                                            <div className="space-y-3">
                                                <div className="bg-zinc-100 border-2 border-transparent p-2 flex items-center gap-3 w-full">
                                                    <div className="w-5 h-5 bg-zinc-300 rounded-sm"></div>
                                                    <div className="h-2 w-16 bg-zinc-300 rounded-full"></div>
                                                </div>
                                                <div className="bg-[#A855F7]/10 border-2 border-black p-2 flex items-center gap-3 w-full shadow-[2px_2px_0px_#000]">
                                                    <div className="w-5 h-5 bg-black rounded-sm"></div>
                                                    <div className="h-2 w-24 bg-black rounded-full"></div>
                                                </div>
                                                <div className="p-2 flex items-center gap-3 w-full">
                                                    <div className="w-5 h-5 bg-zinc-300 rounded-sm"></div>
                                                    <div className="h-2 w-20 bg-zinc-300 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 border-t-2 border-zinc-200 pt-4 mt-8">
                                            <div className="w-8 h-8 rounded-full bg-zinc-300 border-2 border-black"></div>
                                            <div className="h-2 w-16 bg-zinc-300 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Content Mockup */}
                                    <div className="flex-1 p-8 md:p-10 relative overflow-hidden">
                                        {/* Hero Block */}
                                        <div className="bg-[#A855F7] border-4 border-black p-6 shadow-[8px_8px_0px_#000] mb-8 relative">
                                            <div className="absolute top-4 right-4 text-[#FDE047]">
                                                <Flame className="w-8 h-8" strokeWidth={2.5} fill="currentColor" />
                                            </div>
                                            <h3 className="font-black text-2xl uppercase mb-2">Bem-vindo de volta, Aluno!</h3>
                                            <p className="font-serif italic text-sm text-black/80 max-w-sm">Continue da onde parou. O Antigo Testamento te espera.</p>
                                        </div>

                                        <h4 className="font-black uppercase mb-4 text-sm tracking-widest text-zinc-500">Seus E-books</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform group">
                                                <div className="w-full h-24 bg-zinc-100 border-2 border-black mb-3 flex items-center justify-center relative overflow-hidden">
                                                    <img src="/images/ebooks/visao-geral-vt-capa.png" className="absolute w-16 h-auto shadow-[2px_2px_0px_rgba(0,0,0,0.5)] border border-black group-hover:scale-110 transition-transform" alt="VT" />
                                                </div>
                                                <div className="h-2 w-full bg-black rounded-full mb-2"></div>
                                                <div className="h-2 w-2/3 bg-black rounded-full opacity-50"></div>
                                            </div>
                                            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform group">
                                                <div className="w-full h-24 bg-zinc-100 border-2 border-black mb-3 flex items-center justify-center relative overflow-hidden">
                                                    <img src="/images/ebooks/visao-geral-nt-capa.png" className="absolute w-16 h-auto shadow-[2px_2px_0px_rgba(0,0,0,0.5)] border border-black group-hover:scale-110 transition-transform" alt="NT" />
                                                </div>
                                                <div className="h-2 w-full bg-black rounded-full mb-2"></div>
                                                <div className="h-2 w-1/2 bg-black rounded-full opacity-50"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <MonitorPlay className="w-96 h-96 text-[#FDE047]" />
                    </div>
                </section>

                {/* 3. Benefícios (Para quem é?) */}
                <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tight">
                            Uma Plataforma. <br /> <span className="text-[#EC4899] italic font-serif lowercase">Duas gerações.</span>
                        </h2>
                        <div className="h-2 w-24 bg-black mx-auto"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Box Adulto */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
                        >
                            <div className="bg-[#FDE047] border-4 border-black w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 -rotate-3">
                                <BookOpen className="w-8 h-8" strokeWidth={3} />
                            </div>
                            <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Para Você</h3>
                            <h4 className="text-xl font-bold uppercase text-zinc-400 mb-6">Teologia Viva</h4>
                            <ul className="space-y-4 font-bold text-lg">
                                <li className="flex gap-4"><Check className="text-[#10B981] shrink-0 w-6 h-6 border-2 border-black bg-black rounded-full p-1" /> Compreensão Profunda de todo Panorama Bíblico (AT e NT).</li>
                                <li className="flex gap-4"><Check className="text-[#10B981] shrink-0 w-6 h-6 border-2 border-black bg-black rounded-full p-1" /> Chega de linguagem difícil. Acesso direto ao conteúdo central.</li>
                                <li className="flex gap-4"><Check className="text-[#10B981] shrink-0 w-6 h-6 border-2 border-black bg-black rounded-full p-1" /> Ambiente de leitura livre de distrações, focado no texto.</li>
                            </ul>
                        </motion.div>

                        {/* Box Kids */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
                        >
                            <div className="bg-[#A855F7] border-4 border-black w-16 h-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 rotate-3">
                                <Baby className="w-8 h-8" strokeWidth={3} />
                            </div>
                            <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Para Seus Filhos</h3>
                            <h4 className="text-xl font-bold uppercase text-zinc-400 mb-6">Kit Fun Bible Kids</h4>
                            <ul className="space-y-4 font-bold text-lg">
                                <li className="flex gap-4"><Check className="text-[#A855F7] shrink-0 w-6 h-6 border-2 border-black bg-black rounded-full p-1" /> 10 Histórias ilustradas abordando os heróis da fé bíblica.</li>
                                <li className="flex gap-4"><Check className="text-[#A855F7] shrink-0 w-6 h-6 border-2 border-black bg-black rounded-full p-1" /> 10 Atividades prontas para imprimir: Colorir, caça-palavras.</li>
                                <li className="flex gap-4"><Check className="text-[#A855F7] shrink-0 w-6 h-6 border-2 border-black bg-black rounded-full p-1" /> Ensine a Palavra enquanto eles brincam e se divertem.</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>


                {/* 4. Tabela de Preços e COMBOS Integrados */}
                <section id="planos" className="py-24 px-6 md:px-12 bg-[#10B981] border-y-8 border-black">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 tracking-tight text-black">
                                Escolha Seu <span className="text-white drop-shadow-[4px_4px_0px_#000]">Acesso</span>
                            </h2>
                            <p className="text-2xl font-serif italic text-black font-bold max-w-2xl mx-auto">
                                Pagamento único. Acesso vitalício. Sem mensalidades ocultas.
                            </p>
                        </motion.div>

                        {/* Combo Tudo — Hero Card Explosion */}
                        {combos.find((c) => c.slug === "combo-tudo") && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mb-16 max-w-5xl mx-auto"
                            >
                                {(() => {
                                    const combo = combos.find((c) => c.slug === "combo-tudo")!;
                                    return (
                                        <div className="bg-[#FDE047] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all p-8 md:p-16 relative overflow-visible group">
                                            {/* Sticker Best Value */}
                                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#EC4899] rounded-full border-4 border-black flex items-center justify-center text-center font-black uppercase text-sm leading-tight rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 animate-pulse-slow">
                                                Melhor <br /> Oferta!
                                            </div>

                                            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-0">
                                                <div className="flex-1 text-left">
                                                    <div className="bg-black text-white px-4 py-2 inline-block font-black uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_#fff]">
                                                        🏆 O Pacote Completo
                                                    </div>
                                                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6">
                                                        {combo.title}
                                                    </h2>

                                                    {/* Imagens do Combo Tudo (Desktop) */}
                                                    <div className="lg:hidden w-full h-48 relative flex items-center justify-center mb-8">
                                                        <img src="/images/ebooks/plano-de-redencao-capa.png" className="absolute w-32 h-auto -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black -ml-20 z-20" alt="Ebook Redenção" />
                                                        <img src="/images/covers/desenhos-biblicos.png" className="absolute w-32 h-auto rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black ml-20 z-10" alt="Kids Desenhos" />
                                                    </div>
                                                    <p className="text-xl font-bold font-serif italic mb-8 border-l-4 border-black pl-4">
                                                        "Acesso liberado a toda Teologia Viva + Todo Kit Fun Bible."
                                                    </p>
                                                    <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                                                        {combo.features.map((f) => (
                                                            <li key={f} className="flex items-center gap-3 font-bold text-lg">
                                                                <div className="bg-black text-[#FDE047] p-1">
                                                                    <Check className="w-5 h-5" strokeWidth={4} />
                                                                </div>
                                                                {f}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Imagens do Combo Tudo (Desktop Lateral) */}
                                                <div className="hidden lg:flex flex-1 items-center justify-center relative w-full min-h-[300px]">
                                                    <div className="absolute w-32 h-32 bg-[#A855F7] rounded-full border-4 border-black -translate-y-16 translate-x-20 z-0"></div>
                                                    <div className="absolute w-20 h-20 bg-[#10B981] rounded-full border-4 border-black translate-y-24 -translate-x-24 z-0"></div>
                                                    <img src="/images/ebooks/plano-de-redencao-capa.png" className="absolute w-48 h-auto -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black -ml-32 z-20 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300" alt="Ebook" />
                                                    <img src="/images/covers/desenhos-biblicos.png" className="absolute w-44 h-auto rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black ml-24 z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" alt="Kids" />
                                                </div>

                                                <div className="w-full lg:w-auto bg-white border-4 border-black p-8 text-center min-w-[320px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 group-hover:rotate-0 transition-transform">
                                                    <p className="text-zinc-500 font-bold line-through text-lg mb-2 decoration-2 decoration-red-500">
                                                        De R$ 97,50
                                                    </p>
                                                    <p className="text-7xl font-black mb-1 tracking-tighter">
                                                        {formatPrice(combo.priceInCents)}
                                                    </p>
                                                    <p className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6 bg-zinc-100 py-1">
                                                        Pagamento Único
                                                    </p>
                                                    <NeoButton variant="primary" size="lg" className="w-full bg-black text-white hover:bg-[#10B981] hover:text-black border-2 text-xl py-6 font-black uppercase flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none">
                                                        <Zap className="w-6 h-6 fill-current" /> Liberar Acesso
                                                    </NeoButton>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        )}

                        {/* Outros Combos Grid */}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        >
                            {combos.filter((c) => c.slug !== "combo-tudo").map((product) => (
                                <AnimatedCard key={product.slug}>
                                    <div className={`flex flex-col h-full bg-white border-4 border-black p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 group`}>
                                        <div className={`p-6 border-b-4 border-black ${product.color} flex items-center justify-between`}>
                                            <div className="bg-white p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">
                                                <Gift className="w-8 h-8" strokeWidth={3} />
                                            </div>
                                            <span className="font-black text-2xl tracking-tighter opacity-40 uppercase">Combo</span>
                                        </div>

                                        {/* Mockup Area para Combos Normais */}
                                        <div className="bg-zinc-100 border-b-4 border-black relative overflow-hidden h-56 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                                            <div className="absolute inset-0 bg-[url('/texture.png')] mix-blend-overlay opacity-30"></div>

                                            {product.slug === 'combo-ebooks' && (
                                                <div className="relative w-full h-full flex items-center justify-center pt-8">
                                                    <img src="/images/ebooks/visao-geral-vt-capa.png" className="absolute w-28 h-auto -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-black -ml-20 group-hover:-translate-x-4 transition-transform z-0" alt="VT" />
                                                    <img src="/images/ebooks/visao-geral-nt-capa.png" className="absolute w-28 h-auto rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-black ml-20 group-hover:translate-x-4 transition-transform z-10" alt="NT" />
                                                    <img src="/images/ebooks/plano-de-redencao-capa.png" className="relative w-32 h-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black z-20 group-hover:-translate-y-2 transition-transform" alt="Redenção" />
                                                </div>
                                            )}

                                            {product.slug === 'combo-kids' && (
                                                <div className="relative w-full h-full flex items-center justify-center pt-6">
                                                    <img src="/images/covers/cruzadinha.png" className="absolute w-28 h-auto -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-black -ml-20 group-hover:-translate-x-4 transition-transform z-0" alt="Kids 1" />
                                                    <img src="/images/covers/caca-palavras.png" className="absolute w-28 h-auto rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] border-2 border-black ml-20 group-hover:translate-x-4 transition-transform z-10" alt="Kids 2" />
                                                    <img src="/images/covers/desenhos-biblicos.png" className="relative w-32 h-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] border-4 border-black z-20 group-hover:-translate-y-2 transition-transform" alt="Kids 3" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col pt-6">
                                            <h3 className="font-black text-3xl uppercase mb-3 leading-none group-hover:text-[#A855F7] transition-colors">
                                                {product.title}
                                            </h3>

                                            <ul className="space-y-3 mb-8 mt-6 flex-1 border-t-2 border-dashed border-zinc-200 pt-6">
                                                {product.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-3 text-lg font-bold">
                                                        <Check className="w-6 h-6 text-black shrink-0" strokeWidth={3} />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="pt-6 border-t-4 border-black mt-auto">
                                                <div className="flex items-end justify-between mb-4">
                                                    <span className="text-sm font-bold uppercase text-zinc-400">À Vista</span>
                                                    <span className="text-4xl font-black tracking-tighter">{formatPrice(product.priceInCents)}</span>
                                                </div>
                                                <NeoButton className="w-full bg-black text-white hover:bg-[#FDE047] hover:text-black border-2 border-black text-lg py-6 font-black uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                                                    Comprar Agora
                                                </NeoButton>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            ))}
                        </motion.div>
                        <div className="text-center mt-12">
                            <Link href="/precos" className="font-black uppercase tracking-widest text-black hover:text-white underline decoration-4 underline-offset-8 transition-colors text-xl">
                                Procurando acesso individual aos e-books? Veja os produtos avulsos →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 5. Garantia Incondicional */}
                <section className="py-24 px-6 md:px-12 bg-black text-white text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-[#FDE047]/10 blur-[100px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="bg-[#FDE047] text-black w-48 h-48 shrink-0 rounded-full border-4 border-white shadow-[0px_0px_0px_8px_#000,0px_0px_0px_12px_#FDE047] flex flex-col items-center justify-center -rotate-6">
                            <ShieldCheck className="w-16 h-16 mb-2" strokeWidth={2} />
                            <span className="font-black uppercase text-3xl leading-none">7 Dias</span>
                            <span className="font-bold uppercase text-xs tracking-widest mt-1">Garantido</span>
                        </div>
                        <div className="text-left">
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-[#FDE047]">
                                Risco Zero Garantido
                            </h2>
                            <p className="text-xl font-serif italic text-zinc-300 leading-relaxed mb-6">
                                Tem dúvidas se o conteúdo é pra você ou se as crianças vão curtir? Entre, baixe as atividades, leia os primeiros capítulos. Se em 7 dias você achar que não valeu o investimento, devolvemos 100% do seu dinheiro. Sem burocracia, direto pela provedora de pagamento (Kiwify).
                            </p>
                            <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[#10B981] border-l-4 border-current pl-4">
                                <Lock className="w-5 h-5" /> Compra Totalmente Segura
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. FAQ Animado */}
                <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto bg-[#FFFBEB]">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">Perguntas Frequentes</h2>
                        <p className="text-xl font-serif italic text-zinc-600">Ainda tem dúvidas? A gente responde de forma reta e direta.</p>
                    </div>

                    <div className="space-y-4">
                        <AccordionItem
                            question="Como recebo o acesso à plataforma?"
                            answer="É imediato e automático! Assim que o pagamento for aprovado (via Pix ou Cartão, por exemplo), você já pode fazer login na nossa plataforma e acessar todo o material instantaneamente."
                        />
                        <AccordionItem
                            question="O material é para imprimir ou ler no celular?"
                            answer="Você decide. A leitura dos E-books adultos (Teologia Viva) é totalmente Otimizada no nosso painel de leitura, mas você também pode baixar os PDFs. Já o conteúdo infantil (Kids) foi projetado pensando em baixar, imprimir na sua casa e entregar pras crianças colorirem!"
                        />
                        <AccordionItem
                            question="Preciso pagar mensalidade?"
                            answer="Não! De forma alguma! Nenhum plano exige assinatura mensal. O pagamento é único e o acesso é vitalício para o conteúdo que você escolher."
                        />
                        <AccordionItem
                            question="O que tem de diferente nestes E-books?"
                            answer="Eles unificam profundidade teológica com clareza visual. Sem longos parágrafos massantes de texto cru. O design e os resumos de estrutura de palavras-chaves facilitam o entendimento como nenhuma outra ferramenta visual da Bíblia faz de forma tão acessível."
                        />
                    </div>
                </section>
            </main>

            {/* Footer Final */}
            <footer className="bg-black text-white py-16 px-6 text-center border-t-8 border-[#FDA4AF] relative">
                <div className="absolute top-0 right-10 bg-[#FDA4AF] text-black w-12 h-24 border-x-4 border-b-4 border-black flex items-end justify-center pb-4 -translate-y-[8px]">
                    <ArrowRight className="w-6 h-6 rotate-90" strokeWidth={4} />
                </div>
                <div className="max-w-4xl mx-auto pt-8">
                    <h3 className="text-4xl font-black uppercase tracking-widest mb-4">
                        BIBL.IA <span className="text-[#FDA4AF]">OFICIAL</span>
                    </h3>
                    <p className="text-zinc-400 font-serif italic text-xl mb-12">
                        "Estudando a verdade. Protegendo a próxima geração."
                    </p>
                    <div className="h-1 w-32 bg-zinc-800 mx-auto mb-10"></div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 font-bold uppercase tracking-widest text-sm text-zinc-500">
                        <Link href="/sign-in" className="hover:text-white transition-colors">Entrar</Link>
                        <span className="hidden md:block">|</span>
                        <Link href="/precos" className="hover:text-white transition-colors">Preços Avulsos</Link>
                        <span className="hidden md:block">|</span>
                        <Link href="#" className="hover:text-white transition-colors">Contato</Link>
                    </div>
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">
                        Para a Glória de Deus © {new Date().getFullYear()} BIBL.IA OFICIAL
                    </p>
                </div>
            </footer>
        </div>
    );
}
