import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

type NeoTagCategory =
    | "Caça Palavras"
    | "Caligrafia"
    | "Caminhos"
    | "Cruzadinha"
    | "Colorir"
    | "Detetive"
    | "Matemática"
    | "Pesquisa"
    | "Quiz"
    | "Ligue as Sombras";

interface NeoTagProps extends HTMLAttributes<HTMLSpanElement> {
    category: NeoTagCategory;
}

const categoryStyles: Record<NeoTagCategory, string> = {
    "Caça Palavras": "bg-[#FEF08A]",
    "Caligrafia": "bg-[#BBF7D0]",
    "Caminhos": "bg-[#BFDBFE]",
    "Cruzadinha": "bg-[#FED7AA]",
    "Colorir": "bg-[#E9D5FF]",
    "Detetive": "bg-[#FCA5A5]",
    "Matemática": "bg-[#FEF08A]",
    "Pesquisa": "bg-[#BFDBFE]",
    "Quiz": "bg-[#A5F3FC]",
    "Ligue as Sombras": "bg-[#D9F99D]",
};

const NeoTag = forwardRef<HTMLSpanElement, NeoTagProps>(
    ({ className, category, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 border-black neo-shadow-sm",
                    categoryStyles[category],
                    className
                )}
                {...props}
            >
                {category}
            </span>
        );
    }
);

NeoTag.displayName = "NeoTag";

export { NeoTag, type NeoTagProps, type NeoTagCategory };
