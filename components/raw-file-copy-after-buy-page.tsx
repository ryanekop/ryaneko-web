"use client";

import { useEffect, useState } from "react";
import { History, Loader2, Mail, MailSearch } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { SoftwareOrderReceiptPage, SoftwareStoreShell } from "@/components/software-order-receipt";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";
import { captureReceiptAccess, type ReceiptAccess } from "@/lib/software-store";
import { getStoreCopy } from "@/lib/software-store-i18n";

export function RawFileCopyAfterBuyPage() {
    const { t, locale } = useI18n();
    const page = t.purchaseNotice.rawFileCopyTool;
    const storeCopy = getStoreCopy(locale);
    const [access, setAccess] = useState<ReceiptAccess | null | undefined>(undefined);

    useEffect(() => {
        const captured = captureReceiptAccess();
        queueMicrotask(() => setAccess(captured));
    }, []);

    if (access === undefined) {
        return <SoftwareStoreShell title={storeCopy.receiptTitle}><p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{storeCopy.loading}</p></SoftwareStoreShell>;
    }
    if (access) return <SoftwareOrderReceiptPage access={access} />;

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
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
                    <ol className="mt-6 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-muted/30 text-left shadow-sm">
                        <li className="flex items-start gap-3 p-4">
                            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground ring-1 ring-border">
                                1
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold leading-6 text-foreground">Mayar</p>
                                <p className="text-sm leading-6 text-muted-foreground">{page.mayarEmailDescription}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 p-4">
                            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold text-foreground ring-1 ring-border">
                                2
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold leading-6 text-foreground">Ryan Eko Apps</p>
                                <p className="text-sm leading-6 text-muted-foreground">{page.ryanEkoAppsEmailDescription}</p>
                            </div>
                        </li>
                    </ol>
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
                    <a href="/purchase-history" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted">
                        <History aria-hidden="true" className="h-4 w-4 shrink-0" />
                        {storeCopy.historyEmailLink}
                    </a>
                </div>
            </main>
        </div>
    );
}
