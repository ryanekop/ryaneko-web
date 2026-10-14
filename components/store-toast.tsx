"use client";

import { Bell, CircleCheck, CircleX, ShieldCheck, X } from "lucide-react";
import type { ReactNode } from "react";

export function StoreToast({ tone, children, verification, onClose, closeLabel }: {
    tone: "purchase" | "success" | "error";
    children: ReactNode;
    verification?: string;
    onClose: () => void;
    closeLabel: string;
}) {
    const accent = tone === "purchase" ? "border-l-cyan-500" : tone === "success" ? "border-l-emerald-500" : "border-l-red-500";
    const color = tone === "purchase" ? "text-cyan-600 dark:text-cyan-400" : tone === "success" ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300";
    const Icon = tone === "purchase" ? Bell : tone === "success" ? CircleCheck : CircleX;
    return (
        <div className={`fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex w-[calc(100%-max(1rem,env(safe-area-inset-left))-max(1rem,env(safe-area-inset-right)))] max-w-[420px] items-start gap-3 rounded-xl border border-border border-l-4 bg-card p-4 text-card-foreground shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-full ${accent}`}>
            <Icon aria-hidden="true" className={`mt-1 h-6 w-6 shrink-0 ${color}`} />
            <div className="min-w-0 flex-1" role={tone === "error" ? "alert" : "status"} aria-live={tone === "error" ? "assertive" : "polite"} aria-atomic="true">
                <div className={`break-words text-sm leading-6 ${tone === "purchase" ? "" : color}`}>{children}</div>
                {verification && <p className={`mt-2 flex items-center gap-1.5 text-xs ${color}`}><ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />{verification}</p>}
            </div>
            <button type="button" aria-label={closeLabel} onClick={onClose} className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"><X aria-hidden="true" className="h-5 w-5" /></button>
        </div>
    );
}
