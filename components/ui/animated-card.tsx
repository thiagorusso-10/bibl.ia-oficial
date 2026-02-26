"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    onClick?: () => void;
}

export function AnimatedCard({
    children,
    className,
    delay = 0,
    onClick,
}: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98], // Spring-like ease
            }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            className={cn("h-full", className)}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
