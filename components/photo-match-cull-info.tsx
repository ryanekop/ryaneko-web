"use client";

import Link from "next/link";
import { ExternalLink, Instagram, Mail, ShieldCheck, Wrench } from "lucide-react";

import { PhotoMatchCullShell, usePhotoMatchCullLocale } from "@/components/photo-match-cull-shell";
import { Button } from "@/components/ui/button";
import { photoMatchCullConfig, photoMatchCullContent } from "@/lib/photo-match-cull";

export function PhotoMatchCullSupport() {
  const locale = usePhotoMatchCullLocale(photoMatchCullContent.support);
  const copy = photoMatchCullContent.support[locale];
  const common = photoMatchCullContent.common[locale];

  return <PhotoMatchCullShell><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header className="max-w-3xl"><span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-indigo-700 dark:text-indigo-300">{common.support}</span><h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">{copy.heading}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{copy.intro}</p></header>
    <section className="mt-10 grid gap-5 md:grid-cols-2" aria-labelledby="contact-title"><div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8"><Mail className="h-7 w-7 text-indigo-600" /><h2 id="contact-title" className="mt-5 text-2xl font-bold">{copy.contactTitle}</h2><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-muted-foreground">Developer</dt><dd className="mt-1 font-semibold">Ryan Eko Apps</dd></div><div><dt className="text-muted-foreground">{copy.emailLabel}</dt><dd className="mt-1 break-all font-semibold">{photoMatchCullConfig.supportEmail}</dd></div></dl><Button asChild className="mt-6 rounded-full"><a href={`mailto:${photoMatchCullConfig.supportEmail}`}>{copy.emailCta}</a></Button></div><div className="rounded-[2rem] border border-border bg-gradient-to-br from-pink-500/10 via-card to-indigo-500/10 p-6 sm:p-8"><Instagram className="h-7 w-7 text-pink-600" /><h2 className="mt-5 text-2xl font-bold">Ryan Eko Apps</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.instagram}</p><Button asChild variant="outline" className="mt-6 rounded-full"><a href={photoMatchCullConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram<ExternalLink className="ml-2 h-4 w-4" /></a></Button></div></section>
    <section className="mt-16" aria-labelledby="troubleshooting-title"><div className="flex items-center gap-3"><Wrench className="h-7 w-7 text-indigo-600" /><h2 id="troubleshooting-title" className="text-3xl font-bold">{copy.troubleshootingTitle}</h2></div><div className="mt-7 grid gap-4 md:grid-cols-2">{copy.troubleshooting.map(([title, items]) => <article key={title} className="rounded-[1.75rem] border border-border bg-card p-6"><h3 className="font-bold">{title}</h3><ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{items.map(item => <li key={item} className="flex gap-2"><span aria-hidden="true">•</span>{item}</li>)}</ul></article>)}</div></section>
    <section className="mt-16 rounded-[2rem] border border-border bg-muted/30 p-6 sm:p-8"><ShieldCheck className="h-7 w-7 text-emerald-600" /><h2 className="mt-4 text-2xl font-bold">{copy.purchaseTitle}</h2><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{copy.purchaseBody}</p><Button asChild variant="outline" className="mt-5 rounded-full"><a href="https://reportaproblem.apple.com/" target="_blank" rel="noreferrer">{copy.reportCta}<ExternalLink className="ml-2 h-4 w-4" /></a></Button></section>
    <section className="mt-12"><h2 className="text-lg font-bold">{copy.usefulLinks}</h2><div className="mt-4 flex flex-wrap gap-3"><Button asChild variant="outline"><Link href="/photo-match-cull">{common.product}</Link></Button><Button asChild variant="outline"><Link href="/photo-match-cull/privacy">{common.privacy}</Link></Button><Button asChild variant="outline"><Link href="/photo-match-cull/terms">{common.terms}</Link></Button><Button disabled variant="outline">{common.comingSoon}</Button></div></section>
  </div></PhotoMatchCullShell>;
}

export function PhotoMatchCullLegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const locale = usePhotoMatchCullLocale(photoMatchCullContent.legal[kind]);
  const copy = photoMatchCullContent.legal[kind][locale];
  const common = photoMatchCullContent.common[locale];
  const isPrivacy = kind === "privacy";

  return <PhotoMatchCullShell><div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header className="max-w-4xl"><span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-indigo-700 dark:text-indigo-300">{isPrivacy ? common.privacy : common.terms}</span><h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">{copy.heading}</h1><p className="mt-5 text-sm font-semibold text-muted-foreground">{common.lastUpdated}: {photoMatchCullConfig.lastUpdated[locale]}</p></header>
    <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-[1.5rem] border border-border bg-card p-5 lg:sticky lg:top-24"><h2 className="text-sm font-bold uppercase tracking-[.16em] text-muted-foreground">{common.contents}</h2><nav className="mt-4 grid gap-1" aria-label={common.contents}>{copy.sections.map(section => <a key={section.id} href={`#${section.id}`} className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{section.title}</a>)}</nav></aside>
      <article className="min-w-0 rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-10"><div className="space-y-10">{copy.sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-24"><h2 className="text-xl font-bold sm:text-2xl">{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>)}</section>)}</div>
        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-7">
          {isPrivacy && <><a className="text-sm font-semibold underline underline-offset-4" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a><a className="text-sm font-semibold underline underline-offset-4" href="https://www.apple.com/legal/privacy/" target="_blank" rel="noreferrer">Apple Privacy Policy</a></>}
          {!isPrivacy && <a className="text-sm font-semibold underline underline-offset-4" href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer">Apple Standard EULA</a>}
          <Link className="text-sm font-semibold underline underline-offset-4" href="/photo-match-cull/support">{common.support}</Link><Link className="text-sm font-semibold underline underline-offset-4" href={isPrivacy ? "/photo-match-cull/terms" : "/photo-match-cull/privacy"}>{isPrivacy ? common.terms : common.privacy}</Link><a className="ml-auto text-sm text-muted-foreground underline underline-offset-4" href="#top">{common.backToTop}</a>
        </div>
      </article>
    </div>
  </div></PhotoMatchCullShell>;
}
