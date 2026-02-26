"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoCard } from "@/components/ui/neo-card";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Menu,
    X,
    BookOpen,
} from "lucide-react";

// Placeholder data — will be replaced with DB queries
const coursesData: Record<string, { title: string; chapters: { id: string; title: string; content: string }[] }> = {
    "o-plano-de-redencao": {
        title: "O Plano de Redenção",
        chapters: [
            {
                id: "1",
                title: "A Criação",
                content: `# A Criação

## O Início de Todas as Coisas

"No princípio, criou Deus os céus e a terra" (Gênesis 1:1). Esta declaração monumental abre as páginas da Escritura com uma afirmação que fundamenta toda a teologia bíblica: Deus é o Criador soberano de tudo o que existe.

### A Palavra Criadora

O relato da criação em Gênesis 1-2 revela um Deus que cria pela palavra. "Disse Deus: Haja luz; e houve luz" (Gn 1:3). Cada ato criativo demonstra o poder absoluto e a sabedoria infinita do Criador. Não houve esforço, não houve tentativa — apenas a vontade soberana expressa em palavras.

### A Imago Dei

O ápice da criação é a formação do ser humano. "Criou Deus o homem à sua imagem, à imagem de Deus o criou; homem e mulher os criou" (Gn 1:27). A *Imago Dei* — a imagem de Deus no homem — é o que diferencia a humanidade de toda a criação.

> "Ser criado à imagem de Deus significa que o ser humano foi designado para refletir o caráter de Deus na terra, governando com sabedoria, justiça e amor."

### O Jardim e a Comunhão

Deus plantou um jardim no Éden e ali colocou o homem. O jardim representa o estado original de comunhão perfeita entre Deus e a humanidade. Não havia pecado, não havia morte, não havia separação. O homem andava com Deus na viração do dia.

### Implicações Teológicas

1. **Deus é pessoal** — Ele não é uma força impessoal, mas um Ser que cria, fala e se relaciona.
2. **A criação tem propósito** — Nada foi feito ao acaso; tudo reflete a glória de Deus.
3. **O ser humano tem dignidade** — Como portador da imagem divina, cada pessoa tem valor intrínseco.
4. **O trabalho é sagrado** — Antes da queda, Deus já havia designado o homem para cultivar e guardar o jardim.`,
            },
            {
                id: "2",
                title: "A Queda",
                content: `# A Queda

## A Tragédia do Pecado Original

O terceiro capítulo de Gênesis narra o evento mais catastrófico da história humana: a queda. O que era perfeito foi corrompido. O que era imortal tornou-se mortal. A comunhão foi quebrada.

### A Tentação

A serpente, identificada posteriormente como Satanás (Ap 12:9), abordou Eva com uma pergunta aparentemente inocente: "É assim que Deus disse?" (Gn 3:1). A estratégia do inimigo sempre começa com a dúvida — questionar a Palavra de Deus.

### O Ato de Desobediência

"Viu a mulher que a árvore era boa para se comer, agradável aos olhos e desejável para dar entendimento; tomou do seu fruto e comeu" (Gn 3:6). Três dimensões da tentação: **desejo da carne** (boa para comer), **desejo dos olhos** (agradável aos olhos) e **soberba da vida** (desejável para dar entendimento).

> "A queda não foi simplesmente comer um fruto proibido — foi a decisão consciente de rejeitar a autoridade de Deus e buscar autonomia moral."

### As Consequências Imediatas

1. **Vergonha** — "Abriram-se os olhos de ambos e perceberam que estavam nus" (Gn 3:7)
2. **Medo** — "Ouvi a tua voz no jardim e tive medo" (Gn 3:10)
3. **Culpa transferida** — Adão culpou Eva, Eva culpou a serpente
4. **Separação de Deus** — Expulsos do jardim, impedidos pela espada flamejante

### A Maldição e a Esperança

Deus pronunciou juízo sobre a serpente, sobre a mulher e sobre o homem. Mas no meio do juízo, brilha a primeira promessa de redenção: o *Protoevangelium* de Gênesis 3:15.`,
            },
            {
                id: "3",
                title: "A Promessa",
                content: `# A Promessa

## O Proto-Evangelho e a Esperança da Redenção

Em meio ao juízo pronunciado no Jardim do Éden, Deus revela a primeira promessa do evangelho — o *Protoevangelium*: "Porei inimizade entre ti e a mulher, entre a tua descendência e o seu descendente. Este te ferirá a cabeça, e tu lhe ferirás o calcanhar" (Gênesis 3:15).

### A Semente da Mulher

Esta profecia misteriosa anuncia um descendente da mulher que esmagaria a cabeça da serpente. Ao longo de toda a Escritura, veremos o desdobramento desta promessa — de Abraão a Davi, dos profetas ao nascimento em Belém.

### As Alianças como Veículos da Promessa

Deus escolheu estabelecer alianças como o meio pelo qual Sua promessa de redenção avançaria na história:

1. **Aliança com Noé** — Preservação da humanidade e da promessa
2. **Aliança com Abraão** — "Em ti serão benditas todas as famílias da terra" (Gn 12:3)
3. **Aliança com Moisés** — A Lei como pedagogo que conduz a Cristo (Gl 3:24)
4. **Aliança com Davi** — "O teu trono será firme para sempre" (2 Sm 7:16)
5. **Nova Aliança** — "Porei minha lei no interior deles" (Jr 31:33)

> "Cada aliança não substitui a anterior, mas a expande e aprofunda, revelando progressivamente o plano redentor de Deus."

### O Fio Escarlate

Da pele de animal com que Deus cobriu Adão e Eva, passando pelo sangue do cordeiro pascal, até o sangue derramado na cruz — há um fio escarlate que percorre toda a Escritura. Cada sacrifício apontava para o Sacrifício definitivo.

### A Expectativa Messiânica

Os profetas do Antigo Testamento pintaram um retrato cada vez mais detalhado do Redentor prometido: nasceria de uma virgem (Is 7:14), em Belém (Mq 5:2), da tribo de Judá (Gn 49:10), seria um servo sofredor (Is 53) e reinaria para sempre (Dn 7:14).`,
            },
        ],
    },
    "visao-geral-novo-testamento": {
        title: "Visão Geral do Novo Testamento",
        chapters: [
            {
                id: "1",
                title: "Os Evangelhos",
                content: `# Os Evangelhos

## Quatro Retratos de Cristo

Os quatro Evangelhos — Mateus, Marcos, Lucas e João — apresentam a pessoa e a obra de Jesus Cristo sob perspectivas complementares. Cada evangelista, inspirado pelo Espírito Santo, escreveu com um público e propósito específicos.

### Mateus — O Rei Prometido

Mateus escreve primariamente para um público judeu, demonstrando que Jesus é o Messias prometido. Sua genealogia começa com Abraão e Davi, citando o AT mais de 60 vezes.

### Marcos — O Servo Sofredor

O evangelho mais curto e dinâmico. Marcos retrata Jesus como o servo obediente que veio "para servir e dar a sua vida em resgate por muitos" (Mc 10:45).

### Lucas — O Salvador Universal

Lucas, o médico amado, apresenta Jesus como o Salvador de todos os povos no sentido mais amplo. Atenção especial aos marginalizados.

### João — O Filho de Deus

João escreve com propósito declarado: "para que creiais que Jesus é o Cristo, o Filho de Deus" (Jo 20:31). O mais teológico e contemplativo.`,
            },
            {
                id: "2",
                title: "Atos dos Apóstolos",
                content: `# Atos dos Apóstolos

## A Igreja Nasce e Se Expande

Atos narra o nascimento e expansão da Igreja primitiva, impulsionada pelo Espírito Santo. De Jerusalém aos confins da terra.

### O Pentecostes

O derramamento do Espírito Santo marca o nascimento oficial da Igreja. De 120 para milhares em um único dia.

### De Jerusalém aos Confins da Terra

1. **Jerusalém** (Atos 1-7) — A igreja cresce
2. **Judeia e Samaria** (Atos 8-12) — Perseguição espalha os crentes
3. **Confins da Terra** (Atos 13-28) — Viagens missionárias de Paulo`,
            },
            {
                id: "3",
                title: "As Cartas Paulinas",
                content: `# As Cartas Paulinas

## A Teologia do Apóstolo aos Gentios

Paulo escreveu 13 epístolas que compõem quase um quarto do Novo Testamento.

### Classificação das Cartas

**Cartas Maiores:** Romanos, 1 e 2 Coríntios, Gálatas
**Cartas da Prisão:** Efésios, Filipenses, Colossenses, Filemom
**Cartas Escatológicas:** 1 e 2 Tessalonicenses
**Cartas Pastorais:** 1 e 2 Timóteo, Tito

> "Porque pela graça sois salvos, mediante a fé; e isto não vem de vós; é dom de Deus." (Efésios 2:8-9)`,
            },
        ],
    },
};

export default function CourseReaderPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const chapterId = params.chapterId as string;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [completedChapters, setCompletedChapters] = useState<Set<string>>(
        new Set()
    );

    const course = coursesData[courseId];

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <NeoCard>
                    <p className="text-xl font-bold">Curso não encontrado</p>
                    <Link href="/dashboard" className="mt-4 inline-block">
                        <NeoButton variant="outline">Voltar ao Dashboard</NeoButton>
                    </Link>
                </NeoCard>
            </div>
        );
    }

    const currentChapter = course.chapters.find((c) => c.id === chapterId);
    const currentIndex = course.chapters.findIndex((c) => c.id === chapterId);
    const prevChapter = currentIndex > 0 ? course.chapters[currentIndex - 1] : null;
    const nextChapter =
        currentIndex < course.chapters.length - 1
            ? course.chapters[currentIndex + 1]
            : null;

    const toggleCompleted = () => {
        setCompletedChapters((prev) => {
            const next = new Set(prev);
            if (next.has(chapterId)) {
                next.delete(chapterId);
            } else {
                next.add(chapterId);
            }
            return next;
        });
    };

    const renderMarkdown = (content: string) => {
        return content
            .split("\n")
            .map((line, i) => {
                if (line.startsWith("# "))
                    return (
                        <h1 key={i} className="text-3xl font-bold mb-4 mt-8 first:mt-0">
                            {line.replace("# ", "")}
                        </h1>
                    );
                if (line.startsWith("## "))
                    return (
                        <h2 key={i} className="text-2xl font-bold mb-3 mt-8">
                            {line.replace("## ", "")}
                        </h2>
                    );
                if (line.startsWith("### "))
                    return (
                        <h3 key={i} className="text-xl font-bold mb-2 mt-6">
                            {line.replace("### ", "")}
                        </h3>
                    );
                if (line.startsWith("> "))
                    return (
                        <blockquote
                            key={i}
                            className="border-l-4 border-black pl-4 italic my-6 bg-zinc-100 py-3 pr-4"
                        >
                            {line.replace("> ", "").replace(/\"/g, "")}
                        </blockquote>
                    );
                if (line.startsWith("1. ") || line.match(/^\d+\. /))
                    return (
                        <li key={i} className="ml-6 mb-1 list-decimal">
                            {line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                        </li>
                    );
                if (line.trim() === "") return <div key={i} className="h-4" />;
                return (
                    <p key={i} className="mb-4 leading-relaxed">
                        {line
                            .replace(/\*\*(.*?)\*\*/g, "⟨b⟩$1⟨/b⟩")
                            .replace(/\*(.*?)\*/g, "⟨i⟩$1⟨/i⟩")
                            .split(/⟨(\/?[bi])⟩/)
                            .map((part, j) => {
                                if (part === "b") return null;
                                if (part === "/b") return null;
                                if (part === "i") return null;
                                if (part === "/i") return null;
                                return <span key={j}>{part}</span>;
                            })}
                    </p>
                );
            });
    };

    return (
        <div className="flex gap-0 -mx-6 -mt-8 min-h-[calc(100vh-73px)]">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    } fixed md:relative z-40 w-80 bg-white neo-border border-t-0 border-l-0 border-b-0 min-h-full transition-transform duration-200 overflow-y-auto`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-lg">{course.title}</h2>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="md:hidden neo-border p-1"
                        >
                            <X className="w-4 h-4" strokeWidth={2} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {course.chapters.map((chapter) => (
                            <Link
                                key={chapter.id}
                                href={`/learn/${courseId}/${chapter.id}`}
                                className={`flex items-center gap-3 p-3 neo-border transition-all ${chapter.id === chapterId
                                        ? "bg-[#FEF08A] neo-shadow-sm"
                                        : "bg-white hover:bg-zinc-50"
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <div
                                    className={`w-6 h-6 neo-border flex items-center justify-center shrink-0 ${completedChapters.has(chapter.id) ? "bg-black" : "bg-white"
                                        }`}
                                >
                                    {completedChapters.has(chapter.id) && (
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    )}
                                </div>
                                <span className="text-sm font-bold">{chapter.title}</span>
                            </Link>
                        ))}
                    </nav>

                    <Link href="/dashboard" className="block mt-8">
                        <NeoButton variant="outline" size="sm" className="w-full">
                            ← Voltar aos Cursos
                        </NeoButton>
                    </Link>
                </div>
            </aside>

            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed bottom-6 left-6 z-30 md:hidden neo-border neo-shadow bg-[#FEF08A] p-3"
            >
                <Menu className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Reader */}
            <main className="flex-1 px-6 md:px-16 py-12 max-w-3xl mx-auto">
                {currentChapter ? (
                    <>
                        {/* Chapter Content */}
                        <article className="prose-reader">{renderMarkdown(currentChapter.content)}</article>

                        {/* Mark as completed */}
                        <div className="mt-12 pt-8 border-t-2 border-black">
                            <NeoButton
                                variant={completedChapters.has(chapterId) ? "accent" : "primary"}
                                onClick={toggleCompleted}
                                className="w-full"
                            >
                                {completedChapters.has(chapterId) ? (
                                    <>
                                        <Check className="w-5 h-5" strokeWidth={2} />
                                        Leitura Concluída ✓
                                    </>
                                ) : (
                                    <>
                                        <BookOpen className="w-5 h-5" strokeWidth={2} />
                                        Marcar como Lido
                                    </>
                                )}
                            </NeoButton>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between mt-6">
                            {prevChapter ? (
                                <Link href={`/learn/${courseId}/${prevChapter.id}`}>
                                    <NeoButton variant="outline" size="sm">
                                        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                                        {prevChapter.title}
                                    </NeoButton>
                                </Link>
                            ) : (
                                <div />
                            )}
                            {nextChapter ? (
                                <Link href={`/learn/${courseId}/${nextChapter.id}`}>
                                    <NeoButton variant="outline" size="sm">
                                        {nextChapter.title}
                                        <ChevronRight className="w-4 h-4" strokeWidth={2} />
                                    </NeoButton>
                                </Link>
                            ) : (
                                <div />
                            )}
                        </div>
                    </>
                ) : (
                    <NeoCard>
                        <p className="font-bold">Capítulo não encontrado.</p>
                    </NeoCard>
                )}
            </main>
        </div>
    );
}
