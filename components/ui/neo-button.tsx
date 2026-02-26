import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type NeoButtonVariant = "primary" | "secondary" | "outline" | "accent";

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: NeoButtonVariant;
    size?: "sm" | "md" | "lg";
}

const variantStyles: Record<NeoButtonVariant, string> = {
    primary: "bg-[#FEF08A] text-black",
    secondary: "bg-[#E9D5FF] text-black",
    outline: "bg-white text-black",
    accent: "bg-black text-white",
};

const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
};

const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
    ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={cn(
                    "neo-border neo-shadow neo-hover font-bold uppercase tracking-wide inline-flex items-center justify-center gap-2",
                    variantStyles[variant],
                    sizeStyles[size],
                    disabled && "opacity-50 cursor-not-allowed neo-shadow-none translate-0",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

NeoButton.displayName = "NeoButton";

export { NeoButton, type NeoButtonProps, type NeoButtonVariant };
