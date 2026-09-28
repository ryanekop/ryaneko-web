"use client";

import { Mail, MailSearch } from "lucide-react";

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
                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-left text-amber-900 dark:text-amber-100">
                        <MailSearch aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" strokeWidth={1.8} />
                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold leading-6">{page.spamTitle}</h2>
                            <p className="mt-1 text-sm leading-6">{page.spamDescription}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
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
            </main>
        </div>
    );
}
