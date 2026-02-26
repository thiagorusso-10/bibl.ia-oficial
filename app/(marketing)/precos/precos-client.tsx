"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NeoButton } from "@/components/ui/neo-button";
import { AnimatedCard } from "@/components/ui/animated-card";
import {
    BookOpen,
    Baby,
    Gift,
    Trophy,
    Check,
    Cross,
    Sparkles,
    Zap,
} from "lucide-react";

export type ProductCard = {
    slug: string;
    title: string;
    description: string;
    priceInCents: number;
    icon: React.ReactNode;
    color: string;
    highlight?: boolean;
    features: string[];
};

export const PRODUCT_META: Record<
    string,
    {
        icon: React.ReactNode;
        color: string;
        highlight?: boolean;
        features: string[];
    }
> = {
    "ebook-plano-redencao": {
        icon: <BookOpen className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#FDE047]", // Yellow Pop
        features: [
            "Ebook completo em PDF",
            "Da Criação à Nova Criação",
            "Estudo profundo e acessível",
        ],
    },
    "ebook-visao-vt": {
        icon: <BookOpen className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#10B981]", // Mint Pop
        features: [
            "Ebook completo em PDF",
            "39 livros do Antigo Testamento",
            "Panorâmica completa",
        ],
    },
    "ebook-visao-nt": {
        icon: <BookOpen className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#93C5FD]", // Blue Pop
        features: [
            "Ebook completo em PDF",
            "27 livros do Novo Testamento",
            "Evangelhos ao Apocalipse",
        ],
    },
    "kids-atividades": {
        icon: <Baby className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#EC4899]", // Coral Pop
        features: [
            "10 atividades para imprimir",
            "Caça palavras, cruzadinha, colorir",
            "Diversão bíblica para crianças",
        ],
    },
    "kids-historias": {
        icon: <Baby className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#A855F7]", // Purple Pop
        features: [
            "10 histórias ilustradas",
            "De Davi a Daniel",
            "Slides interativos",
        ],
    },
    "combo-ebooks": {
        icon: <Gift className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#FDE047]",
        features: [
            "3 ebooks teológicos",
            "Redenção + VT + NT",
            "Economize R$ 19,80",
        ],
    },
    "combo-kids": {
        icon: <Gift className="w-8 h-8" strokeWidth={2.5} />,
        color: "bg-[#A855F7]",
        features: [
            "Atividades + Histórias",
            "20 materiais para crianças",
            "Economize R$ 15,90",
        ],
    },
    "combo-tudo": {
        icon: <Trophy className="w-10 h-10" strokeWidth={2.5} />,
        color: "bg-[#FDE047]",
        highlight: true,
        features: [
            "TUDO incluído",
            "3 ebooks + 20 materiais kids",
            "Maior economia: R$ 37,60",
            "Acesso vitalício",
        ],
    },
};

function formatPrice(cents: number) {
    return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
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

const SectionTitle = ({ icon: Icon, title, color }: any) => (
    <div className="flex items-center gap-4 mb-12 border-b-4 border-black pb-4">
        <div className={`p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${color}`}>
            <Icon className="w-8 h-8 stroke-black" strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase">{title}</h2>
    </div>
);

export function PrecosClient({ products }: { products: ProductCard[] }) {
    const ebooks = products.filter((p) => p.slug.startsWith("ebook-"));
    const kids = products.filter((p) => p.slug.startsWith("kids-"));
    const combos = products.filter((p) => p.slug.startsWith("combo-"));

    return (
        <div className="min-h-screen bg-[#FFFBEB] font-sans selection:bg-[#FDE047] selection:text-black">
            {/* Header Pop */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black py-4 px-6 md:px-12 flex justify-between items-center shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-black text-white p-1 group-hover:bg-[#FDE047] group-hover:text-black transition-colors">
                        <Cross className="w-6 h-6" strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase">
                        BIBL.IA
                    </span>
                </Link>
                <Link href="/dashboard">
                    <NeoButton variant="primary" size="sm" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-bold uppercase shadow-[4px_4px_0px_0px_#fff] hover:shadow-[4px_4px_0px_0px_#000]">
                        Entrar no App
                    </NeoButton>
                </Link>
            </header>

            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24 relative"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-block bg-[#FDE047] border-4 border-black px-6 py-2 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2"
                    >
                        <span className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-5 h-5" strokeWidth={3} /> Ofertas Exclusivas
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                        Invista na sua <br className="hidden md:block" />
                        <span className="relative inline-block px-4">
                            <span className="absolute inset-0 bg-[#A855F7] -skew-y-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-0 block"></span>
                            <span className="relative z-10 text-black">Eternidade</span>
                        </span>
                    </h1>

                    <p className="text-2xl md:text-3xl font-serif italic text-zinc-800 font-bold max-w-3xl mx-auto leading-relaxed">
                        "Teologia profunda para mentes curiosas e diversão bíblica para corações pequenos."
                    </p>
                </motion.div>

                {/* Combo Tudo — Hero Card Explosion */}
                {combos.find((c) => c.slug === "combo-tudo") && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-24"
                    >
                        {(() => {
                            const combo = combos.find((c) => c.slug === "combo-tudo")!;
                            return (
                                <div className="bg-[#FDE047] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all p-8 md:p-16 relative overflow-visible group">
                                    {/* Sticker Best Value */}
                                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#EC4899] rounded-full border-4 border-black flex items-center justify-center text-center font-black uppercase text-sm leading-tight rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 animate-pulse-slow">
                                        Melhor <br /> Oferta!
                                    </div>

                                    <div className="flex flex-col lg:flex-row items-center gap-12 relative z-0">
                                        <div className="flex-1 text-left">
                                            <div className="bg-black text-white px-4 py-2 inline-block font-black uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_#fff]">
                                                🏆 Plano Completo
                                            </div>
                                            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-6">
                                                {combo.title}
                                            </h2>
                                            <p className="text-xl font-bold font-serif italic mb-8 border-l-4 border-black pl-4">
                                                "{combo.description}"
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
                                                <Zap className="w-6 h-6 fill-current" /> Acesso Total
                                            </NeoButton>
                                            <p className="text-xs text-zinc-500 mt-4 font-bold uppercase">
                                                Compra Segura via Kiwify
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}

                {/* Ebooks Grid */}
                <div className="mb-24">
                    <SectionTitle
                        icon={BookOpen}
                        title="Teologia Viva"
                        color="bg-[#FDE047]"
                    />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {ebooks.map((product) => (
                            <ProductCardComponent key={product.slug} product={product} />
                        ))}
                    </motion.div>
                </div>

                {/* Kids Grid */}
                <div className="mb-24">
                    <SectionTitle
                        icon={Baby}
                        title="Kit Fun Bible Kids"
                        color="bg-[#A855F7]"
                    />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {kids.map((product) => (
                            <ProductCardComponent key={product.slug} product={product} />
                        ))}
                    </motion.div>
                </div>

                {/* Combos Grid */}
                <div className="mb-24">
                    <SectionTitle
                        icon={Gift}
                        title="Combos"
                        color="bg-[#10B981]"
                    />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {combos.filter((c) => c.slug !== "combo-tudo").map((product) => (
                            <ProductCardComponent key={product.slug} product={product} />
                        ))}
                    </motion.div>
                </div>

                {/* FAQ Pop */}
                <div className="max-w-4xl mx-auto mb-24">
                    <h2 className="text-4xl font-black uppercase text-center mb-12">Dúvidas? <br /><span className="text-[#EC4899] font-serif italic normal-case">nós respondemos.</span></h2>

                    <div className="space-y-6">
                        {[
                            { q: "Como recebo o acesso?", a: "Assim que o pagamento confirmar, puf! O acesso é liberado automaticamente na sua conta." },
                            { q: "Posso imprimir?", a: "Claro! O conteúdo é seu. Baixe e imprima quantas vezes quiser." },
                            { q: "É vitalício mesmo?", a: "Sim. Para sempre. Eterno. Tipo a vida eterna, só que do seu ebook." },
                            { q: "Aceita pix?", a: "Sim! Pix, cartão, boleto. A Kiwify cuida de tudo com segurança." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                <h3 className="font-black text-xl mb-2 flex items-center gap-3">
                                    <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm rounded-none">?</span>
                                    {faq.q}
                                </h3>
                                <p className="text-lg font-serif pl-11">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Pop */}
            <footer className="bg-black text-white py-12 px-6 text-center border-t-8 border-[#FDE047]">
                <p className="font-black text-2xl mb-2 uppercase tracking-widest">BIBL.IA OFICIAL © {new Date().getFullYear()}</p>
                <p className="text-[#FDE047] font-serif italic text-lg">Feito com fé, café e código.</p>
            </footer>
        </div>
    );
}

function ProductCardComponent({ product }: { product: ProductCard }) {
    return (
        <AnimatedCard>
            <div className={`flex flex-col h-full bg-white border-4 border-black p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 group`}>
                <div className={`p-6 border-b-4 border-black ${product.color} flex items-center justify-between`}>
                    <div className="bg-white p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">
                        {product.icon}
                    </div>
                    <span className="font-black text-4xl tracking-tighter opacity-20">#01</span>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-black text-2xl uppercase mb-3 leading-none min-h-[3rem] group-hover:text-[#A855F7] transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-zinc-600 font-serif italic mb-6 border-l-2 border-zinc-200 pl-3">
                        {product.description}
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                        {product.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-sm font-bold">
                                <Check className="w-5 h-5 text-black shrink-0" strokeWidth={3} />
                                {f}
                            </li>
                        ))}
                    </ul>

                    <div className="pt-6 border-t-4 border-black/5 mt-auto">
                        <div className="flex items-end justify-between mb-4">
                            <span className="text-sm font-bold uppercase text-zinc-400">Investimento</span>
                            <span className="text-3xl font-black tracking-tighter">{formatPrice(product.priceInCents)}</span>
                        </div>
                        <NeoButton className="w-full bg-black text-white hover:bg-[#EC4899] hover:text-black border-2 text-lg py-4 font-black uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            Comprar Agora
                        </NeoButton>
                    </div>
                </div>
            </div>
        </AnimatedCard>
    );
}
