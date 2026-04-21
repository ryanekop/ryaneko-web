"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    CopyPlus,
    ExternalLink,
    FolderGit2,
    FolderOutput,
    HardDriveDownload,
    RefreshCw,
    SearchCheck,
    ShieldCheck,
    Sparkles,
    WandSparkles,
} from "lucide-react";

import { InstagramPostEmbeds } from "@/components/instagram-post-embeds";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const purchaseUrl = "https://ryaneko.myr.id/pl/raw-file-copy-tool";
const updateUrl =
    "https://drive.google.com/drive/folders/10ujMTzZPuR31TSsu59uHl3NJ093Hn0Ix?usp=sharing";
const instagramUrls = [
    "https://www.instagram.com/p/DTQLcnuk1WL/?img_index=1",
    "https://www.instagram.com/p/DOn1zFPkxoS/",
];

const trackedOutboundLinks = new Set([
    purchaseUrl,
    updateUrl,
    ...instagramUrls,
]);

function getOutboundTrackingProps(url: string) {
    if (!trackedOutboundLinks.has(url)) {
        return {};
    }

    return {
        "data-umami-event": "outbound-link-click",
        "data-umami-event-url": url,
    };
}

const sectionReveal = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" as const },
    },
};

export function RawFileCopyToolPage() {
    const { t } = useI18n();
    const page = t.rawFileCopyToolPage;

    const featureIcons = [
        SearchCheck,
        Sparkles,
        CopyPlus,
        RefreshCw,
        ShieldCheck,
        WandSparkles,
    ];

    const workflowIcons = [FolderGit2, FolderOutput, HardDriveDownload];
    const platformItems = [
        { label: page.platforms[0], src: "/platform-logos/mac.svg" },
        { label: page.platforms[1], src: "/platform-logos/windows.svg" },
        { label: page.platforms[2], src: "/platform-logos/android.svg" },
    ];

    const afterBuyButtonClassName =
        "rounded-full border-emerald-500/25 bg-emerald-500/12 px-7 text-emerald-900 hover:bg-emerald-500/18 hover:text-emerald-950 dark:border-emerald-400/25 dark:bg-emerald-400/12 dark:text-emerald-200 dark:hover:bg-emerald-400/18 dark:hover:text-emerald-100";

    const socialCards = instagramUrls.map((url, index) => ({
        ...page.socialCards[index],
        url,
        imageSrc: `/instagram-previews/raw-file-copy-tool-post-${index + 1}.jpg`,
    }));

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
            <motion.nav
                initial={{ y: -18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-lg font-bold tracking-tight sm:text-xl"
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
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.06),rgba(14,165,233,0.04),rgba(251,191,36,0.08))]" />
                <div className="pointer-events-none absolute left-[-8%] top-12 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="pointer-events-none absolute right-[-10%] top-20 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

                <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 py-10 sm:px-6 sm:py-16">
                    <motion.section
                        initial="hidden"
                        animate="visible"
                        variants={sectionReveal}
                        className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_420px]"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-700 shadow-sm dark:text-emerald-300">
                                {page.badge}
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                    <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/65 bg-clip-text text-transparent">
                                        {page.heroTitle}
                                    </span>
                                </h1>
                                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                    {page.heroDescription}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {page.heroChips.map((chip, index) => {
                                    const chipClassNames = [
                                        "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                                        "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
                                        "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
                                    ];

                                    return (
                                        <span
                                            key={chip}
                                            className={`rounded-full border px-4 py-2 text-xs font-medium shadow-sm ${chipClassNames[index % chipClassNames.length]}`}
                                        >
                                            {chip}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button asChild size="lg" className="rounded-full px-7">
                                    <a
                                        href={purchaseUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        {...getOutboundTrackingProps(purchaseUrl)}
                                    >
                                        {page.buyButtonLabel}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>

                                <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                                    <a
                                        href={updateUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        {...getOutboundTrackingProps(updateUrl)}
                                    >
                                        {page.updateButtonLabel}
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>

                                <Button asChild size="lg" variant="outline" className={afterBuyButtonClassName}>
                                    <Link href="/after-buy/raw-file-copy-tool">
                                        {page.afterBuyButtonLabel}
                                    </Link>
                                </Button>
                            </div>

                            <div className="rounded-[1.85rem] border border-border/70 bg-card/92 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    {page.platformLabel}
                                </p>

                                <div className="grid gap-3 sm:grid-cols-3">
                                    {platformItems.map((platform) => (
                                        <div
                                            key={platform.label}
                                            className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-background/92 px-4 py-3 shadow-sm"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-white">
                                                <Image
                                                    src={platform.src}
                                                    alt={platform.label}
                                                    width={22}
                                                    height={22}
                                                    className="h-[22px] w-[22px] object-contain"
                                                />
                                            </div>
                                            <p className="text-sm font-semibold">{platform.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-x-10 top-6 h-36 rounded-full bg-gradient-to-r from-emerald-500/20 via-sky-500/18 to-amber-500/18 blur-3xl" />
                            <div className="relative overflow-hidden rounded-[2.25rem] border border-border/70 bg-card/95 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                                            RAW File Copy Tool
                                        </p>
                                        <h2 className="mt-1 text-2xl font-bold">{page.previewTitle}</h2>
                                    </div>
                                    <Image
                                        src="/raw-file-copy-tool.png"
                                        alt="RAW File Copy Tool"
                                        width={72}
                                        height={72}
                                        className="h-14 w-14 rounded-2xl border border-border/50 object-cover shadow-sm"
                                        priority
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="rounded-[1.6rem] border border-border/70 bg-background/90 p-4 shadow-sm">
                                        <h3 className="text-sm font-semibold">{page.problemTitle}</h3>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {page.problemBody}
                                        </p>
                                    </div>

                                    <div className="rounded-[1.6rem] border border-border/70 bg-gradient-to-br from-emerald-500/10 via-background to-sky-500/8 p-4 shadow-sm">
                                        <div className="mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <p className="text-sm font-semibold">{page.formatTitle}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {page.formats.map((format) => (
                                                <span
                                                    key={format}
                                                    className="rounded-full border border-border/70 bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
                                                >
                                                    {format}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionReveal}
                        className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_320px]"
                    >
                        <div className="rounded-[2rem] border border-border/70 bg-card/94 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
                                {page.overviewBadge}
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                {page.aboutTitle}
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                                {page.aboutBody}
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-border/70 bg-background/92 p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-700 dark:text-amber-300">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{page.problemTitle}</p>
                                </div>
                            </div>
                            <p className="text-sm leading-6 text-muted-foreground">
                                {page.problemBody}
                            </p>
                        </div>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={sectionReveal}
                        className="mt-10"
                    >
                        <div className="mb-6 max-w-3xl space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-sm dark:text-emerald-300">
                                {page.highlightsBadge}
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                {page.featuresTitle}
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {page.features.map((feature, index) => {
                                const FeatureIcon = featureIcons[index] ?? Sparkles;

                                return (
                                    <div
                                        key={feature.title}
                                        className="rounded-[1.7rem] border border-border/70 bg-card/94 p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <FeatureIcon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={sectionReveal}
                        className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
                    >
                        <div className="rounded-[2rem] border border-border/70 bg-card/94 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
                            <div className="mb-6 max-w-2xl space-y-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm dark:text-sky-300">
                                    {page.workflowBadge}
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                    {page.workflowTitle}
                                </h2>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                {page.workflowSteps.map((step, index) => {
                                    const StepIcon = workflowIcons[index] ?? CheckCircle2;

                                    return (
                                        <div
                                            key={step.title}
                                            className="rounded-[1.5rem] border border-border/70 bg-background/90 p-5 shadow-sm"
                                        >
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                                                <StepIcon className="h-5 w-5" />
                                            </div>
                                            <div className="mb-3 flex items-center gap-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-base font-semibold">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm leading-6 text-muted-foreground">
                                                {step.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-border/70 bg-background/92 p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">
                                        {page.extraFeaturesTitle}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm leading-6 text-muted-foreground">
                                {page.extraFeaturesIntro}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {page.extraFeatures.map((feature) => (
                                    <span
                                        key={feature}
                                        className="rounded-full border border-border/70 bg-card/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={sectionReveal}
                        className="mt-10 rounded-[2rem] border border-border/70 bg-card/94 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8"
                    >
                        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_330px]">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700 shadow-sm dark:text-amber-300">
                                    {page.updateBadge}
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                    {page.updateTitle}
                                </h2>
                                <p className="mt-3 text-sm font-semibold text-foreground/80">
                                    {page.updateVersionLabel}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                    {page.updateSummary}
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {page.updateHighlights.map((highlight) => (
                                        <li
                                            key={highlight}
                                            className="flex items-start gap-3 rounded-[1.35rem] border border-border/70 bg-background/90 px-4 py-3 shadow-sm"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-sm leading-6 text-foreground/90">
                                                {highlight}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-[1.6rem] border border-border/70 bg-background/90 p-5 shadow-sm">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <RefreshCw className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{page.updateTitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                    {page.updateSummary}
                                </p>
                                <div className="mt-5">
                                    <Button asChild className="w-full rounded-full">
                                        <a
                                            href={updateUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            {...getOutboundTrackingProps(updateUrl)}
                                        >
                                            {page.updateButtonLabel}
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={sectionReveal}
                        className="mt-10"
                    >
                        <InstagramPostEmbeds
                            badgeLabel={page.instagramBadge}
                            title={page.socialTitle}
                            description={page.socialDescription}
                            posts={socialCards}
                        />
                    </motion.div>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionReveal}
                        className="mt-10 overflow-hidden rounded-[2.25rem] border border-border/70 bg-card/95 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.1)] sm:p-8"
                    >
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-gradient-to-r from-emerald-500/16 via-sky-500/12 to-amber-500/16 blur-3xl" />
                            <div className="relative grid gap-6 lg:grid-cols-[minmax(520px,1fr)_minmax(0,560px)] lg:items-center">
                                <div className="min-w-0 max-w-3xl">
                                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                        {page.finalCtaTitle}
                                    </h2>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                                        {page.finalCtaDescription}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                                    <Button asChild size="lg" className="rounded-full px-6">
                                        <a
                                            href={purchaseUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            {...getOutboundTrackingProps(purchaseUrl)}
                                        >
                                            {page.buyButtonLabel}
                                        </a>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                                        <a
                                            href={updateUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            {...getOutboundTrackingProps(updateUrl)}
                                        >
                                            {page.updateButtonLabel}
                                        </a>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className={afterBuyButtonClassName.replace("px-7", "px-6")}>
                                        <Link href="/after-buy/raw-file-copy-tool">
                                            {page.afterBuyButtonLabel}
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="ghost" className="rounded-full px-5">
                                        <Link href="/">{page.backHomeLabel}</Link>
                                    </Button>
                                </div>
                            </div>
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
