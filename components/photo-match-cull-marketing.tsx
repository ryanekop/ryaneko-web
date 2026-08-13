"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Cloud, Copy, FolderHeart, Images, MoveRight, ShieldCheck, Smartphone, Sparkles } from "lucide-react";

import { PhotoMatchCullShell, usePhotoMatchCullLocale } from "@/components/photo-match-cull-shell";
import { Button } from "@/components/ui/button";
import { photoMatchCullConfig, photoMatchCullContent } from "@/lib/photo-match-cull";

const formats = ["ARW", "CR2", "CR3", "NEF", "NRW", "RAF", "RW2", "ORF", "PEF", "DNG", "JPG"];
const featureIcons = [FolderHeart, Sparkles, Images, Cloud, Copy, MoveRight];
const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export function PhotoMatchCullMarketing() {
  const locale = usePhotoMatchCullLocale(photoMatchCullContent.marketing);
  const copy = photoMatchCullContent.marketing[locale];
  const common = photoMatchCullContent.common[locale];

  return (
    <PhotoMatchCullShell>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(99,102,241,.16),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(236,72,153,.12),transparent_25%),linear-gradient(180deg,transparent,rgba(99,102,241,.04))]" />
        <section className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:pb-28">
          <motion.div initial="hidden" animate="visible" variants={reveal} className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-indigo-700 dark:text-indigo-300"><Sparkles className="h-4 w-4" />{copy.eyebrow}</div>
            <div className="space-y-5"><p className="text-sm font-semibold text-muted-foreground">Photo Match & Cull</p><h1 className="max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight text-balance sm:text-6xl lg:text-7xl">{copy.headline}</h1><p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{copy.heroDescription}</p></div>
            <div className="flex flex-wrap gap-2">{copy.badges.map((badge, index) => <span key={badge} className={`rounded-full border px-3 py-1.5 text-xs font-medium ${index === 0 ? "border-pink-500/25 bg-pink-500/10 text-pink-700 dark:text-pink-300" : "border-border bg-card/80 text-muted-foreground"}`}>{badge}</span>)}</div>
            <div className="flex flex-wrap gap-3">
              {photoMatchCullConfig.appStoreUrl ? <Button asChild size="lg" className="rounded-full px-6"><a href={photoMatchCullConfig.appStoreUrl} target="_blank" rel="noreferrer">{common.appStoreCta}<ArrowRight className="ml-2 h-4 w-4" /></a></Button> : <Button size="lg" disabled className="rounded-full px-6 opacity-90"><span className="mr-2 text-lg">●</span>{common.comingSoon}</Button>}
              <Button asChild size="lg" variant="outline" className="rounded-full px-6"><Link href="/photo-match-cull/support">{copy.supportCta}</Link></Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-6"><Link href="/photo-match-cull/privacy">{copy.privacyCta}</Link></Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: .96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .55, delay: .08 }} className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-indigo-500/25 via-pink-500/20 to-amber-400/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-white/30 bg-card/90 p-4 shadow-[0_35px_100px_rgba(15,23,42,.18)] backdrop-blur dark:border-white/10">
              <div className="rounded-[2rem] border border-border/60 bg-background p-5 sm:p-7">
                <div className="flex items-center justify-between"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20"><Images className="h-7 w-7" /></div><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">iPhone · iPad</span></div>
                <div className="mt-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">Photo Match & Cull</p><h2 className="mt-2 text-2xl font-bold">RAW Match</h2></div>
                <div className="mt-6 space-y-3">
                  {["RAW Source", "JPEG Reference", "Destination"].map((label, index) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/35 p-3"><div className={`h-9 w-9 rounded-xl ${["bg-indigo-500/15", "bg-pink-500/15", "bg-amber-500/15"][index]} flex items-center justify-center`}><FolderHeart className="h-4 w-4" /></div><span className="text-sm font-semibold">{label}</span>{index < 2 && <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />}</div>)}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-foreground p-4 text-background"><Copy className="h-5 w-5" /><p className="mt-3 text-sm font-bold">Copy</p></div><div className="rounded-2xl border border-border p-4"><MoveRight className="h-5 w-5" /><p className="mt-3 text-sm font-bold">Move</p></div></div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600 dark:text-indigo-400">{copy.highlightsEyebrow}</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{copy.highlightsTitle}</h2></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{copy.features.map((feature, index) => { const Icon = featureIcons[index]; return <motion.article key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-bold">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.description}</p></motion.article> })}</div>
      </section>

      <section className="border-y border-border/60 bg-muted/20"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-pink-600 dark:text-pink-400">RAW · JPEG</p><h2 className="mt-3 text-3xl font-bold">{copy.formatsTitle}</h2><p className="mt-3 leading-7 text-muted-foreground">{copy.formatsDescription}</p></div><div className="flex flex-wrap gap-3">{formats.map(format => <span key={format} className="rounded-2xl border border-border bg-background px-5 py-3 font-mono text-sm font-bold shadow-sm">.{format}</span>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl"><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{copy.howTitle}</h2><p className="mt-4 text-muted-foreground">{copy.howDescription}</p></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">{[["RAW Match", copy.rawSteps], ["Photo Culler", copy.cullerSteps]].map(([title, steps]) => <article key={title as string} className="rounded-[2rem] border border-border/70 bg-card p-6 sm:p-8"><h3 className="text-2xl font-bold">{title as string}</h3><ol className="mt-6 space-y-4">{(steps as readonly string[]).map((step, i) => <li key={step} className="flex gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">{i + 1}</span><span className="pt-0.5 text-sm leading-6 text-muted-foreground">{step}</span></li>)}</ol></article>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6"><div className="grid overflow-hidden rounded-[2.25rem] border border-border/70 bg-gradient-to-br from-indigo-500/10 via-card to-pink-500/10 lg:grid-cols-2"><div className="p-7 sm:p-10"><Smartphone className="h-8 w-8 text-indigo-600 dark:text-indigo-300" /><h2 className="mt-5 text-3xl font-bold">{copy.compatibilityTitle}</h2><ul className="mt-6 space-y-3">{copy.compatibility.map(item => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>)}</ul></div><div className="border-t border-border/70 p-7 sm:p-10 lg:border-l lg:border-t-0"><ShieldCheck className="h-8 w-8 text-pink-600 dark:text-pink-300" /><h2 className="mt-5 text-3xl font-bold">{copy.freeTitle}</h2><p className="mt-5 leading-8 text-muted-foreground">{copy.freeDescription}</p><p className="mt-5 inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold">{copy.localizedPrice}</p></div></div></section>

      <section className="border-y border-border/60 bg-muted/20"><div className="mx-auto max-w-4xl px-4 py-20 sm:px-6"><h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{copy.faqTitle}</h2><div className="mt-10 divide-y divide-border rounded-[2rem] border border-border bg-card px-5 sm:px-7">{copy.faq.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold focus-visible:outline-2 focus-visible:outline-ring">{question}<span className="text-xl text-muted-foreground transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-3 text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></div></section>

      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6"><div className="rounded-[2.5rem] bg-foreground px-6 py-14 text-background sm:px-12"><h2 className="text-3xl font-bold sm:text-5xl">{copy.finalTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-background/70">{copy.finalDescription}</p><Button disabled size="lg" variant="secondary" className="mt-8 rounded-full px-7 opacity-90">{common.comingSoon}</Button></div></section>
    </PhotoMatchCullShell>
  );
}
