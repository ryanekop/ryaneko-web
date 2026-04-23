"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    BadgeCheck,
    Check,
    Clipboard,
    Copy,
    Globe2,
    KeyRound,
    Layers3,
    ShieldCheck,
} from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const sectionReveal = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" as const },
    },
};

const domainCardStyles = [
    {
        accent:
            "border-rose-500/20 bg-rose-500/8 text-rose-700 dark:text-rose-300",
        icon: "bg-rose-500/12 text-rose-700 dark:text-rose-300",
    },
    {
        accent:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        icon: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    },
    {
        accent:
            "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
        icon: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
    },
    {
        accent:
            "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        icon: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
    },
];

export function CustomDomainInfoPage() {
    const { t } = useI18n();
    const page = t.customDomainPage;
    const [copied, setCopied] = useState(false);
    const templateText = useMemo(
        () => page.templateLines.join("\n"),
        [page.templateLines]
    );

    async function copyTemplate() {
        try {
            await navigator.clipboard.writeText(templateText);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-lg font-bold sm:text-xl"
                    >
                        <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-border/10">
                            <Image
                                src="/ryaneko-logo.png"
                                alt="Ryan Eko Apps"
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                        Ryan Eko Apps
                    </Link>

                    <div className="flex items-center gap-2">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </motion.nav>

            <main className="relative flex-1 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
                <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,rgba(34,197,94,0.10),rgba(14,165,233,0.08),rgba(245,158,11,0.12))]" />
                <div className="pointer-events-none absolute left-[-8%] top-16 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="pointer-events-none absolute right-[-6%] top-24 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

                <div className="container relative z-10 mx-auto px-4 py-10 sm:py-16">
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={sectionReveal}
                        className="mx-auto max-w-6xl"
                    >
                        <div className="mb-5 flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm dark:text-emerald-300">
                                <Globe2 className="h-3.5 w-3.5" />
                                {page.badge}
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/88 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
                            <div className="pointer-events-none absolute inset-x-8 top-0 h-28 rounded-b-[2rem] bg-gradient-to-r from-emerald-500/12 via-sky-500/12 to-amber-500/12 blur-2xl" />

                            <div className="relative mb-8 flex flex-col items-center gap-4 border-b border-border/60 pb-7 text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/12 text-emerald-700 shadow-sm dark:text-emerald-300">
                                    <Globe2 className="h-7 w-7" />
                                </div>

                                <div className="space-y-3">
                                    <h1 className="mx-auto max-w-4xl text-3xl font-extrabold text-balance sm:text-4xl lg:text-[3.35rem]">
                                        {page.title}
                                    </h1>
                                    <p className="mx-auto max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
                                        {page.subtitle}
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {page.heroChips.map((chip, index) => {
                                        const chipClassNames = [
                                            "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                                            "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
                                            "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
                                        ];

                                        return (
                                            <span
                                                key={chip}
                                                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-sm ${chipClassNames[index % chipClassNames.length]}`}
                                            >
                                                {chip}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.85fr)]">
                                <div className="space-y-5">
                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <div className="mb-3 flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
                                                        <BadgeCheck className="h-4 w-4" />
                                                    </div>
                                                    <h2 className="text-base font-semibold sm:text-lg">
                                                        {page.optionsTitle}
                                                    </h2>
                                                </div>
                                                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                                                    {page.optionsDescription}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {page.domainOptions.map((option, index) => {
                                                const style =
                                                    domainCardStyles[index % domainCardStyles.length];

                                                return (
                                                    <article
                                                        key={option.extension}
                                                        className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm"
                                                    >
                                                        <div className="mb-3 flex items-start justify-between gap-3">
                                                            <div
                                                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${style.icon}`}
                                                            >
                                                                <Globe2 className="h-5 w-5" />
                                                            </div>
                                                            <span
                                                                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.accent}`}
                                                            >
                                                                {option.badge}
                                                            </span>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                                                <p className="font-mono text-2xl font-bold">
                                                                    {option.extension}
                                                                </p>
                                                                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                                                                    {option.price}
                                                                </p>
                                                            </div>
                                                            <h3 className="text-sm font-semibold">
                                                                {option.title}
                                                            </h3>
                                                            <p className="text-sm leading-6 text-muted-foreground">
                                                                {option.description}
                                                            </p>
                                                        </div>
                                                    </article>
                                                );
                                            })}
                                        </div>
                                    </section>

                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-700 dark:text-sky-300">
                                                <Layers3 className="h-4 w-4" />
                                            </div>
                                            <h2 className="text-base font-semibold sm:text-lg">
                                                {page.structureTitle}
                                            </h2>
                                        </div>

                                        <p className="mb-4 text-sm leading-6 text-muted-foreground">
                                            {page.structureDescription}
                                        </p>

                                        <div className="space-y-3">
                                            {page.structureExamples.map((example) => (
                                                <article
                                                    key={example.domain}
                                                    className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm"
                                                >
                                                    <div className="grid gap-3 md:grid-cols-[minmax(220px,0.85fr)_minmax(0,1fr)] md:items-center">
                                                        <div className="min-w-0">
                                                            <p className="text-xs font-semibold text-muted-foreground">
                                                                {example.label}
                                                            </p>
                                                            <p className="mt-2 max-w-full overflow-x-auto whitespace-nowrap rounded-xl border border-border/70 bg-background/90 px-3 py-2 font-mono text-sm font-bold text-foreground shadow-sm sm:text-base">
                                                                {example.domain}
                                                            </p>
                                                        </div>
                                                        <p className="min-w-0 text-sm leading-6 text-muted-foreground">
                                                            {example.description}
                                                        </p>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <aside className="space-y-3.5">
                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
                                                <ShieldCheck className="h-4 w-4" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {page.recommendationTitle}
                                            </h2>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {page.recommendationBody}
                                        </p>
                                    </section>

                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-700 dark:text-sky-300">
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {page.freedomNoteTitle}
                                            </h2>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {page.freedomNoteBody}
                                        </p>
                                    </section>

                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-700 dark:text-amber-300">
                                                <Clipboard className="h-4 w-4" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {page.registrationTitle}
                                            </h2>
                                        </div>
                                        <p className="mb-4 text-sm leading-6 text-muted-foreground">
                                            {page.registrationDescription}
                                        </p>
                                        <div className="grid gap-2">
                                            {page.registrationFields.map((field) => (
                                                <div
                                                    key={field}
                                                    className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/90 px-3 py-2 text-sm shadow-sm"
                                                >
                                                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                    {field}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500/12 text-rose-700 dark:text-rose-300">
                                                <KeyRound className="h-4 w-4" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {page.passwordNoteTitle}
                                            </h2>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {page.passwordNoteBody}
                                        </p>
                                    </section>
                                </aside>
                            </div>

                            <section className="relative mt-5 rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h2 className="text-base font-semibold sm:text-lg">
                                            {page.templateTitle}
                                        </h2>
                                        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                                            {page.templateDescription}
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="shrink-0 rounded-full"
                                        onClick={copyTemplate}
                                    >
                                        {copied ? (
                                            <Check className="mr-2 h-4 w-4" />
                                        ) : (
                                            <Copy className="mr-2 h-4 w-4" />
                                        )}
                                        {copied ? page.copiedButtonLabel : page.copyButtonLabel}
                                    </Button>
                                </div>

                                <pre className="overflow-x-auto rounded-2xl border border-border/70 bg-card/90 p-4 font-mono text-sm leading-7 text-foreground shadow-sm">{templateText}</pre>

                                <p className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-900 dark:text-amber-100">
                                    {page.addressNote}
                                </p>
                            </section>
                        </div>
                    </motion.section>
                </div>
            </main>

            <footer className="mt-auto border-t border-border py-8">
                <div className="container mx-auto px-4 text-center text-xs text-muted-foreground sm:text-sm">
                    &copy; {new Date().getFullYear()} Ryan Eko Apps. {t.footer}
                </div>
            </footer>
        </div>
    );
}
