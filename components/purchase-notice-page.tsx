"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, LogIn, MailCheck, ShieldAlert } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";
import {
    purchaseNoticeConfig,
    type PurchaseNoticeVariant,
} from "@/lib/purchase-notice";

interface PurchaseNoticePageProps {
    variant: PurchaseNoticeVariant;
}

export function PurchaseNoticePage({ variant }: PurchaseNoticePageProps) {
    const { t } = useI18n();
    const page = t.purchaseNotice[variant];
    const common = t.purchaseNotice.common;
    const config = purchaseNoticeConfig[variant];
    const Icon = config.icon;

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
                        className="flex items-center gap-3 text-lg font-bold tracking-tight sm:text-xl"
                    >
                        <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-border/10">
                            <Image
                                src="/ryaneko-logo.png"
                                alt={common.navTitle}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                        {common.navTitle}
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
                <div className="absolute left-[-8%] top-16 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="absolute right-[-6%] top-24 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
                <div className="absolute bottom-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

                <div className="container relative z-10 mx-auto px-4 py-10 sm:py-16">
                    <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mx-auto max-w-5xl"
                    >
                        <div className="mb-5 flex justify-center">
                            <div
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm ${config.panelClassName}`}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                {page.badge}
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/88 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
                            <div className="pointer-events-none absolute inset-x-8 top-0 h-28 rounded-b-[2rem] bg-gradient-to-r from-emerald-500/12 via-sky-500/12 to-amber-500/12 blur-2xl" />
                            <div className="mb-6 flex flex-col items-center gap-4 border-b border-border/60 pb-6 text-center">
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-current/10 shadow-sm ${config.iconClassName}`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {page.productLabels.map((label) => (
                                            <span
                                                key={label}
                                                className="rounded-full border border-border bg-background/90 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[3.35rem]">
                                        {page.title}
                                    </h1>
                                    <p className="mx-auto max-w-3xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
                                        {page.subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-5 flex flex-wrap gap-2">
                                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-700 shadow-sm dark:text-emerald-300">
                                    Check email first
                                </div>
                                <div className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-[11px] font-medium text-sky-700 shadow-sm dark:text-sky-300">
                                    Create password
                                </div>
                                <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[11px] font-medium text-amber-700 shadow-sm dark:text-amber-300">
                                    Login after setup
                                </div>
                            </div>

                            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.8fr)]">
                                <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <MailCheck className="h-4.5 w-4.5" />
                                        </div>
                                        <h2 className="text-base font-semibold sm:text-lg">
                                            {common.checklistTitle}
                                        </h2>
                                    </div>

                                    <ol className="space-y-3">
                                        {page.checklist.map((step, index) => (
                                            <li
                                                key={step}
                                                className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/90 px-4 py-3.5 shadow-sm"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                                    {index + 1}
                                                </div>
                                                <div className="space-y-2 pt-0.5">
                                                    <p className="text-sm leading-6 text-foreground/90">
                                                        {step}
                                                    </p>
                                                    {index === 1 && (
                                                        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/8 px-3 py-2.5 text-xs leading-5 text-sky-900 shadow-sm dark:text-sky-100">
                                                            <span className="font-semibold">
                                                                {common.emailTipsTitle}:
                                                            </span>{" "}
                                                            {common.emailTips}
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </section>

                                <div className="space-y-3.5">
                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-700 dark:text-amber-300">
                                                <ShieldAlert className="h-4.5 w-4.5" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {common.noteTitle}
                                            </h2>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {page.note}
                                        </p>
                                    </section>

                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
                                                <LogIn className="h-4.5 w-4.5" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {common.existingAccountTitle}
                                            </h2>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {page.existingAccountHint}
                                        </p>
                                    </section>
                                    <section className="rounded-[1.75rem] border border-border bg-background/85 p-5 shadow-sm">
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500/12 text-rose-700 dark:text-rose-300">
                                                <HelpCircle className="h-4.5 w-4.5" />
                                            </div>
                                            <h2 className="text-sm font-semibold sm:text-[15px]">
                                                {common.supportTitle}
                                            </h2>
                                        </div>
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {common.supportNote}
                                        </p>
                                    </section>
                                </div>
                            </div>
                        </div>

                    </motion.div>
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
