"use client";

import { useEffect } from "react";

export function SWRegister() {
    useEffect(() => {
        if ("serviceWorker" in navigator && window.location.protocol === "https:") {
            // Register SW
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("SW registered:", registration);
                })
                .catch((error) => {
                    console.error("SW registration failed:", error);
                });
        }
    }, []);

    return null;
}
