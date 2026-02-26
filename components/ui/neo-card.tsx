import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

type NeoCardVariant = "default" | "yellow" | "purple" | "green" | "blue";

interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: NeoCardVariant;
    hover?: boolean;
}

const variantStyles: Record<NeoCardVariant, string> = {
    default: "bg-white",
    yellow: "bg-[#FEF08A]",
    purple: "bg-[#E9D5FF]",
    green: "bg-[#BBF7D0]",
    blue: "bg-[#BFDBFE]",
};

const NeoCard = forwardRef<HTMLDivElement, NeoCardProps>(
    ({ className, variant = "default", hover = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "neo-border neo-shadow p-6",
                    variantStyles[variant],
                    hover && "neo-hover cursor-pointer",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

NeoCard.displayName = "NeoCard";

export { NeoCard, type NeoCardProps, type NeoCardVariant };
