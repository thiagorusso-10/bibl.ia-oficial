"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Cross, BookOpen, Baby, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { NeoButton } from "@/components/ui/neo-button";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="neo-border border-t-0 border-x-0 bg-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2 z-50 relative">
                    <Cross className="w-6 h-6" strokeWidth={2} />
                    <span className="text-xl font-bold tracking-tight">BIBL.IA</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline"
                    >
                        <Home className="w-4 h-4" strokeWidth={2} />
                        Início
                    </Link>
                    <Link
                        href="/learn"
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline"
                    >
                        <BookOpen className="w-4 h-4" strokeWidth={2} />
                        Estudos
                    </Link>
                    <Link
                        href="/kids"
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline"
                    >
                        <Baby className="w-4 h-4" strokeWidth={2} />
                        Kids
                    </Link>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "neo-border w-9 h-9",
                            },
                        }}
                    />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden z-50 relative p-2 -mr-2"
                    aria-label="Menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 gap-6 md:hidden animate-in slide-in-from-top-10 duration-200">
                        <Link
                            href="/dashboard"
                            onClick={toggleMenu}
                            className="flex items-center gap-4 text-xl font-bold uppercase tracking-wide border-b-2 border-black pb-4"
                        >
                            <Home className="w-6 h-6" strokeWidth={2} />
                            Início
                        </Link>
                        <Link
                            href="/learn"
                            onClick={toggleMenu}
                            className="flex items-center gap-4 text-xl font-bold uppercase tracking-wide border-b-2 border-black pb-4"
                        >
                            <BookOpen className="w-6 h-6" strokeWidth={2} />
                            Estudos
                        </Link>
                        <Link
                            href="/kids"
                            onClick={toggleMenu}
                            className="flex items-center gap-4 text-xl font-bold uppercase tracking-wide border-b-2 border-black pb-4"
                        >
                            <Baby className="w-6 h-6" strokeWidth={2} />
                            Kids
                        </Link>

                        <div className="mt-auto mb-8 flex items-center gap-4 border-t-2 border-black pt-6">
                            <span className="font-bold text-sm uppercase">Perfil:</span>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "neo-border w-10 h-10",
                                        userButtonPopoverCard: "neo-border",
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
