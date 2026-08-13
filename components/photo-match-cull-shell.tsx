"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Menu } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { photoMatchCullContent } from "@/lib/photo-match-cull";

const links = [
  ["product", "/photo-match-cull"],
  ["support", "/photo-match-cull/support"],
  ["privacy", "/photo-match-cull/privacy"],
  ["terms", "/photo-match-cull/terms"],
] as const;

export function usePhotoMatchCullLocale(copy: { id: { title: string; description: string }; en: { title: string; description: string } }) {
  const { locale } = useI18n();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy[locale].title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy[locale].description);
  }, [copy, locale]);

  return locale;
}

export function PhotoMatchCullShell({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  const copy = photoMatchCullContent.common[locale];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/photo-match-cull" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <Image src="/ryaneko-logo.png" alt="Ryan Eko Apps" width={40} height={40} className="h-9 w-9 rounded-xl object-cover shadow-sm" priority />
            <span className="leading-tight"><span className="block text-sm font-bold">Photo Match & Cull</span><span className="block text-[11px] text-muted-foreground">Ryan Eko Apps</span></span>
          </Link>
          <nav aria-label="Photo Match & Cull" className="hidden items-center gap-1 lg:flex">
            {links.map(([key, href]) => <Button key={key} asChild variant="ghost" size="sm"><Link href={href}>{copy[key]}</Link></Button>)}
          </nav>
          <div className="flex items-center gap-1.5">
            <LanguageToggle showLabel />
            <ThemeToggle />
            <details className="relative lg:hidden">
              <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring" aria-label="Open navigation"><Menu className="h-4 w-4" /></summary>
              <nav className="absolute right-0 top-12 grid w-52 gap-1 rounded-2xl border border-border bg-popover p-2 shadow-xl" aria-label="Mobile navigation">
                {links.map(([key, href]) => <Link key={key} href={href} className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-accent">{copy[key]}</Link>)}
              </nav>
            </details>
          </div>
        </div>
      </header>
      <main id="top" className="flex-1">{children}</main>
      <footer className="border-t border-border/70 bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
          <div><p className="font-bold">Photo Match & Cull</p><p className="mt-1 text-sm text-muted-foreground">{copy.developer}</p><p className="mt-4 text-xs text-muted-foreground">© 2026 Ryan Eko Apps. {copy.copyright}</p></div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Footer navigation">
            {links.slice(1).map(([key, href]) => <Link key={key} href={href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">{copy[key]}</Link>)}
          </nav>
        </div>
      </footer>
    </div>
  );
}
