'use client';

import Image from "next/image";
import { ExternalLink, Clock, Instagram } from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/lib/i18n";

type AppKey = "rawFileCopyTool" | "fastpik" | "clientDesk" | "photoSplitExpress" | "realtimeUploadPro" | "autoExportLrC";

const apps: {
  name: string;
  key: AppKey;
  icon: string | null;
  status: string;
  link: string | null;
  iconScale?: string;
}[] = [
    {
      name: "RAW File Copy Tool",
      key: "rawFileCopyTool",
      icon: "/raw-file-copy-tool.png",
      status: "active",
      link: "#"
    },
    {
      name: "Fastpik",
      key: "fastpik",
      icon: "/fastpik.png",
      status: "active",
      link: "https://fastpik.ryanekoapp.web.id"
    },
    {
      name: "Client Desk",
      key: "clientDesk",
      icon: "/client-desk-maskable.png",
      status: "active",
      link: "https://clientdesk.ryanekoapp.web.id"
    },
    {
      name: "Photo Split Express",
      key: "photoSplitExpress",
      icon: "/photo-split-express.png",
      status: "active",
      link: "#",
      iconScale: "scale-[1.35]"
    },
    {
      name: "Realtime Upload Pro",
      key: "realtimeUploadPro",
      icon: "/realtime-upload-pro.png",
      status: "active",
      link: "#",
      iconScale: "scale-[1.35]"
    },
    {
      name: "Auto Export LrC Plugin",
      key: "autoExportLrC",
      icon: "/lightroom-plugin.png",
      status: "active",
      link: "#"
    }
  ];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const trackedOutboundLinks = new Set([
  "https://fastpik.ryanekoapp.web.id",
  "https://clientdesk.ryanekoapp.web.id",
  "https://instagram.com/ryanekopram",
  "https://instagram.com/ryanekoapps",
]);

function getOutboundTrackingProps(url: string | null) {
  if (!url || !trackedOutboundLinks.has(url)) {
    return {};
  }

  return {
    "data-umami-event": "outbound-link-click",
    "data-umami-event-url": url,
  };
}

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground transition-colors duration-300">

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight sm:text-xl">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border/10">
              <Image src="/ryaneko-logo.png" alt="Ryan Eko Apps" width={64} height={64} className="object-cover w-full h-full" priority />
            </div>
            Ryan Eko Apps
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.02]"></div>
        <div className="absolute left-[-5%] top-8 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute right-[-8%] top-16 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-300/12 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground shadow-sm backdrop-blur"
          >
            Ryan Eko Apps
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Creative Tools
          </motion.div>
          <motion.h1
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-5 max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              {t.heroTitle}
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-muted-foreground text-balance sm:text-base"
          >
            {t.heroDescription}
          </motion.p>
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3"
          >
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-700 shadow-sm dark:text-emerald-300">
              Fast launch
            </div>
            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-xs font-medium text-sky-700 shadow-sm dark:text-sky-300">
              Clean workflow
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-700 shadow-sm dark:text-amber-300">
              Photographer-ready
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="relative bg-muted/20 py-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {apps.map((app, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`
                  group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]
                  transition-all duration-300
                  ${app.status === 'coming-soon' ? 'opacity-75' : 'hover:-translate-y-1'}
                `}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-20 rounded-b-[1.5rem] bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-amber-500/10 blur-2xl" />
                <div className="mb-4 flex items-start justify-between">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm">
                    {app.icon ? (
                      <Image
                        src={app.icon}
                        alt={app.name}
                        width={128}
                        height={128}
                        loading="lazy"
                        className={`object-contain w-full h-full ${app.iconScale || ''}`}
                      />
                    ) : (
                      <Clock className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>
                  {app.status === 'active' && (
                    <div className="absolute right-5 top-5 translate-y-2 rounded-full border border-border/60 bg-background/90 p-2 text-secondary-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-primary">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  )}
                  {app.status === 'coming-soon' && (
                    <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-accent-foreground">
                      {t.comingSoon}
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                  {app.name}
                </h3>
                <p className="flex-grow text-sm leading-6 text-muted-foreground">
                  {t.apps[app.key].description}
                </p>

                {app.link && app.status === 'active' && (
                  <Link
                    href={app.link}
                    className="absolute inset-0 z-10"
                    {...getOutboundTrackingProps(app.link)}
                  >
                    <span className="sr-only">View {app.name}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-xs text-muted-foreground sm:text-sm">
            &copy; {new Date().getFullYear()} Ryan Eko Apps. {t.footer}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:gap-6">
            <a
              href="https://instagram.com/ryanekopram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              {...getOutboundTrackingProps("https://instagram.com/ryanekopram")}
            >
              <Instagram className="h-4 w-4" /> @ryanekopram
            </a>
            <a
              href="https://instagram.com/ryanekoapps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
              {...getOutboundTrackingProps("https://instagram.com/ryanekoapps")}
            >
              <Instagram className="h-4 w-4" /> @ryanekoapps
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
