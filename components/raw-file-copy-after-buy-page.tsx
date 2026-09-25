"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";

export function RawFileCopyAfterBuyPage() {
    const { t } = useI18n();
    const page = t.purchaseNotice.rawFileCopyTool;

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <header className="flex justify-end gap-2 px-4 py-4 sm:px-8">
                <LanguageToggle />
                <ThemeToggle />
            </header>

            <main className="flex flex-1 items-center justify-center px-5 pb-16 pt-4 sm:px-8">
                <div className="w-full max-w-xl text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted sm:h-24 sm:w-24">
                        <Mail aria-hidden="true" className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.8} />
                    </div>

                    <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-5xl">
                        {page.title}
                    </h1>
                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        {page.description}
                    </p>
                    <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        {page.spamPrefix}<strong className="font-semibold text-foreground">{page.spamLabel}</strong>{page.spamSuffix}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {page.supportPrompt}{" "}
                        <a
                            href={`mailto:${photoMatchCullConfig.supportEmail}`}
                            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                        >
                            {page.supportLink}
                        </a>
                    </p>

                    <Button asChild variant="outline" className="mt-10 h-14 w-full rounded-xl text-base shadow-sm">
                        <Link href="/raw-file-copy-tool">
                            <ArrowLeft aria-hidden="true" className="mr-2 h-5 w-5" />
                            {page.backLabel}
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}
