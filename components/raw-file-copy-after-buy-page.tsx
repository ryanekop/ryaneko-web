"use client";

import { Mail } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { PurchaseConfetti } from "@/components/purchase-confetti";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";

export function RawFileCopyAfterBuyPage() {
    const { t } = useI18n();
    const page = t.purchaseNotice.rawFileCopyTool;

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <PurchaseConfetti />
            <header className="flex justify-end gap-2 px-4 py-4 sm:px-8">
                <LanguageToggle />
                <ThemeToggle />
            </header>

            <main className="flex flex-1 items-center justify-center px-5 pb-10 pt-4 sm:px-8">
                <div className="w-full max-w-md text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Mail aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                        {page.title}
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {page.description}
                    </p>
                    <div className="mt-6 border-t border-border/70 pt-5">
                        <p className="text-sm leading-6 text-muted-foreground">
                            {page.spamPrefix}<strong className="font-semibold text-foreground">{page.spamLabel}</strong>{page.spamSuffix}
                        </p>
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                            {page.supportPrompt}{" "}
                            <a
                                href={photoMatchCullConfig.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                            >
                                {page.supportLink}
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
