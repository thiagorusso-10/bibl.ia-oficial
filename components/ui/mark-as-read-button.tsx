"use client";

import { useState, useTransition } from "react";
import { NeoButton } from "@/components/ui/neo-button";
import { Check, BookOpenCheck, Loader2 } from "lucide-react";

interface MarkAsReadButtonProps {
    contentItemId: string;
    initialIsRead: boolean;
    size?: "sm" | "md";
    className?: string;
}

export function MarkAsReadButton({
    contentItemId,
    initialIsRead,
    size = "sm",
    className = "",
}: MarkAsReadButtonProps) {
    const [isRead, setIsRead] = useState(initialIsRead);
    const [isPending, startTransition] = useTransition();

    async function handleToggle() {
        startTransition(async () => {
            try {
                const res = await fetch("/api/progress", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contentItemId }),
                });

                if (res.ok) {
                    const data = await res.json();
                    setIsRead(data.isCompleted);
                }
            } catch {
                // Silently fail — user can retry
            }
        });
    }

    if (isRead) {
        return (
            <button
                onClick={handleToggle}
                disabled={isPending}
                className={`neo-border px-3 py-1.5 text-sm font-bold uppercase tracking-wide inline-flex items-center gap-2 bg-[#BBF7D0] text-green-800 hover:bg-green-200 transition-colors ${className}`}
            >
                {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                ) : (
                    <Check className="w-4 h-4" strokeWidth={3} />
                )}
                Lido ✓
            </button>
        );
    }

    return (
        <NeoButton
            variant="outline"
            size={size}
            onClick={handleToggle}
            disabled={isPending}
            className={className}
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
            ) : (
                <BookOpenCheck className="w-4 h-4" strokeWidth={2} />
            )}
            Marcar como Lido
        </NeoButton>
    );
}
