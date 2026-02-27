"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, Type } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";

interface EbookReaderProps {
    title: string;
    slug: string;
    returnUrl?: string;
    children: React.ReactNode;
}

export function EbookReader({ title, slug, returnUrl = "/learn", children }: EbookReaderProps) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [fontSize, setFontSize] = useState<"text-base" | "text-lg" | "text-xl">("text-lg");
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("readerTheme") as "light" | "dark";
        if (savedTheme) setTheme(savedTheme);
        const savedFontSize = localStorage.getItem("readerFontSize") as any;
        if (savedFontSize) setFontSize(savedFontSize);

        // Smooth restore progress after a short delay
        setTimeout(() => {
            const savedProgress = localStorage.getItem(`readerProgress-${slug}`);
            if (savedProgress && scrollRef.current) {
                const totalHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
                scrollRef.current.scrollTop = totalHeight * (parseFloat(savedProgress) / 100);
            }
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollHeight <= clientHeight) return;

        const totalHeight = scrollHeight - clientHeight;
        const calculatedProgress = (scrollTop / totalHeight) * 100;
        setProgress(calculatedProgress);

        localStorage.setItem(`readerProgress-${slug}`, calculatedProgress.toString());
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("readerTheme", newTheme);
    };

    const cycleFontSize = () => {
        const sizes = ["text-base", "text-lg", "text-xl"] as const;
        const nextIndex = (sizes.indexOf(fontSize) + 1) % sizes.length;
        setFontSize(sizes[nextIndex]);
        localStorage.setItem("readerFontSize", sizes[nextIndex]);
    };

    return (
        <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-300 ${theme === "dark" ? "bg-zinc-950 text-zinc-100 dark" : "bg-[#FFFBEB] text-black"}`}>
            <header className={`shrink-0 flex items-center justify-between p-4 border-b-4 transition-colors ${theme === "dark" ? "border-zinc-800 bg-zinc-900" : "border-black bg-white"}`}>
                <div className="flex items-center gap-4">
                    <Link href={returnUrl}>
                        <NeoButton variant="outline" className={`p-3 ${theme === "dark" ? "border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:shadow-none" : ""}`}>
                            <ArrowLeft className="w-5 h-5" />
                        </NeoButton>
                    </Link>
                    <h1 className={`font-black uppercase tracking-widest text-sm md:text-base hidden sm:block truncate max-w-xs md:max-w-md ${theme === "dark" ? "text-zinc-300" : "text-black"}`}>{title}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <NeoButton onClick={toggleTheme} variant="outline" className={`p-3 ${theme === "dark" ? "border-zinc-700 bg-zinc-800 text-[#FDE047] hover:bg-zinc-700 hover:shadow-none" : "text-[#A855F7]"}`}>
                        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </NeoButton>
                </div>
            </header>

            {/* Progress Bar */}
            <div className={`h-1.5 w-full shrink-0 ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}`}>
                <div className="h-full bg-[#10B981] transition-all duration-75 ease-out" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Reader Body */}
            <main
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto scroll-smooth"
            >
                <div className={`max-w-5xl mx-auto px-2 md:px-6 pt-8 pb-32 ${fontSize} transition-all duration-300 relative`}>

                    {/* The MDX Content renders here */}
                    {children}

                    <div className={`mt-24 p-8 border-4 text-center max-w-3xl mx-auto ${theme === "dark" ? "border-zinc-800 bg-zinc-900" : "border-black bg-[#FDE047] shadow-[8px_8px_0px_#000]"}`}>
                        <h3 className="font-black text-2xl md:text-3xl uppercase mb-2">Fim da Leitura</h3>
                        <p className="font-bold font-serif mb-8 text-lg">Você chegou ao fim deste conteúdo. Que a palavra ressoe no seu coração!</p>
                        <Link href={returnUrl}>
                            <NeoButton size="lg" className={`w-full md:w-auto px-12 ${theme === "dark" ? "bg-zinc-100 text-black border-zinc-700 hover:shadow-none" : "bg-black text-white hover:bg-[#A855F7] hover:text-black border-2 shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-y-1 hover:translate-x-1"}`}>
                                Voltar para o App
                            </NeoButton>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
