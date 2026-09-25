"use client";

import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { PurchaseConfetti } from "@/components/purchase-confetti";
import { RawFileCopyAfterBuyPage } from "@/components/raw-file-copy-after-buy-page";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";
import {
    packageUrls,
    purchaseRedirectConfig,
    type PurchaseNoticeVariant,
    type PurchaseRedirectVariant,
} from "@/lib/purchase-notice";

interface PurchaseNoticePageProps {
    variant: PurchaseNoticeVariant;
}

export function PurchaseNoticePage({ variant }: PurchaseNoticePageProps) {
    if (variant === "rawFileCopyTool") {
        return <RawFileCopyAfterBuyPage />;
    }

    return <PurchaseRedirectPage key={variant} variant={variant} />;
}

function PurchaseRedirectPage({ variant }: { variant: PurchaseRedirectVariant }) {
    const { t } = useI18n();
    const [secondsRemaining, setSecondsRemaining] = useState(5);
    const config = purchaseRedirectConfig[variant];
    const page = t.purchaseNotice[variant];
    const common = t.purchaseNotice.redirectCommon;

    useEffect(() => {
        const interval = window.setInterval(() => {
            setSecondsRemaining((seconds) => Math.max(0, seconds - 1));
        }, 1000);
        const timeout = window.setTimeout(() => {
            window.location.assign(config.redirectUrl);
        }, 5000);

        return () => {
            window.clearInterval(interval);
            window.clearTimeout(timeout);
        };
    }, [config.redirectUrl]);

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <PurchaseConfetti />
            <header className="flex justify-end gap-2 px-4 py-4 sm:px-8">
                <LanguageToggle />
                <ThemeToggle />
            </header>

            <main className="flex flex-1 items-center justify-center px-5 pb-10 pt-4 sm:px-8">
                <div className="w-full max-w-md text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        <CircleCheck aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                    </div>

                    <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                        {page.title}
                    </h1>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {page.description}
                    </p>
                    <p aria-live="polite" className="mt-5 text-sm font-medium text-foreground">
                        {common.redirectPrefix} {secondsRemaining} {common.redirectSuffix}
                    </p>

                    <div className="mt-6 border-t border-border/70 pt-5">
                        <p className="text-xs leading-5 text-muted-foreground">
                            {common.fallbackHint}
                        </p>
                        <div className="mt-3 space-y-2">
                            {config.linkProducts.map((product) => (
                                <a
                                    key={product}
                                    href={packageUrls[product]}
                                    className="flex min-h-11 items-center justify-center rounded-xl border border-border px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {common.linkLabels[product]}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
