"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  Instagram,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";

type LinkGroup = "order" | "update";

type BioLink = {
  title: string;
  url: string;
  image: string;
  group: LinkGroup;
  highlighted?: boolean;
  imageScale?: string;
};

const bioLinks: BioLink[] = [
  {
    title: "RAW File Copy Tool",
    url: "https://ryaneko.myr.id/pl/raw-file-copy-tool",
    image: "/raw-file-copy-tool.png",
    group: "order",
    highlighted: true,
  },
  {
    title: "Client Desk — Vendor Management",
    url: "https://clientdesk.ryanekoapp.web.id/id",
    image: "/client-desk-maskable.png",
    group: "order",
    highlighted: true,
  },
  {
    title: "Fastpik — Photo Culling",
    url: "https://fastpik.ryanekoapp.web.id/id",
    image: "/fastpik.png",
    group: "order",
    highlighted: true,
  },
  {
    title: "Photo Split Express",
    url: "https://ryaneko.myr.id/pl/photo-split-express",
    image: "/photo-split-express.png",
    group: "order",
    imageScale: "scale-[1.3]",
  },
  {
    title: "Update 2.7.3 — RAW File Copy Tool",
    url: "https://drive.google.com/drive/folders/10ujMTzZPuR31TSsu59uHl3NJ093Hn0Ix?usp=sharing",
    image: "/raw-file-copy-tool.png",
    group: "update",
  },
];

const groups: Array<{
  key: LinkGroup;
  title: string;
  description: string;
  icon: typeof ShoppingBag;
}> = [
  {
    key: "order",
    title: "Order Aplikasi",
    description: "Pilih aplikasi yang kamu butuhkan",
    icon: ShoppingBag,
  },
  {
    key: "update",
    title: "Update Aplikasi",
    description: "Unduh versi terbaru aplikasi",
    icon: Download,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 110, damping: 17 },
  },
};

const trackingProps = (url: string) => ({
  "data-umami-event": "outbound-link-click",
  "data-umami-event-url": url,
});

export function LinksLandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.025]" />
      <div className="pointer-events-none fixed -left-24 top-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="pointer-events-none fixed -right-28 top-1/3 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-end"
        >
          <ThemeToggle />
        </motion.div>

        <motion.header
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-2 pb-8 pt-3 text-center sm:pb-10 sm:pt-5"
        >
          <div className="relative mx-auto mb-5 h-24 w-24 sm:h-28 sm:w-28">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-400/40 via-sky-400/30 to-amber-300/40 blur-xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border/70 bg-card p-1.5 shadow-[0_18px_55px_rgba(15,23,42,0.16)]">
              <Image
                src="/ryaneko-logo.png"
                alt="Logo Ryan Eko Apps"
                width={224}
                height={224}
                className="h-full w-full rounded-[1.65rem] object-cover"
                priority
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ryan Eko Apps
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Mempermudah workflow fotografer dan videografer 🚀
          </p>
          <a
            href="https://instagram.com/ryanekoapps"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka Instagram Ryan Eko Apps"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-pink-500/30 hover:text-pink-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:text-pink-400"
            {...trackingProps("https://instagram.com/ryanekoapps")}
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            @ryanekoapps
          </a>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-9"
        >
          {groups.map((group) => {
            const GroupIcon = group.icon;
            const links = bioLinks.filter((link) => link.group === group.key);

            return (
              <motion.section
                key={group.key}
                variants={itemVariants}
                aria-labelledby={`${group.key}-heading`}
              >
                <div className="mb-3 flex items-end justify-between gap-4 px-1">
                  <div>
                    <h2
                      id={`${group.key}-heading`}
                      className="flex items-center gap-2 text-base font-bold sm:text-lg"
                    >
                      <GroupIcon
                        className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      {group.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      {group.description}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {links.length} {links.length === 1 ? "link" : "pilihan"}
                  </span>
                </div>

                <div className="space-y-3">
                  {links.map((link) => (
                    <motion.a
                      key={link.url}
                      variants={itemVariants}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.985 }}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buka ${link.title}`}
                      className="group relative flex min-h-20 w-full items-center gap-4 overflow-hidden rounded-[1.4rem] border border-border/70 bg-card/90 p-3.5 pr-4 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:shadow-[0_16px_45px_rgba(15,23,42,0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-24 sm:gap-5 sm:p-4"
                      {...trackingProps(link.url)}
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-emerald-500/[0.07] via-sky-500/[0.04] to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm sm:h-16 sm:w-16">
                        <Image
                          src={link.image}
                          alt=""
                          width={128}
                          height={128}
                          className={`h-full w-full object-contain ${link.imageScale ?? ""}`}
                        />
                      </div>

                      <div className="relative min-w-0 flex-1 text-left">
                        {link.highlighted ? (
                          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-600 dark:text-orange-400">
                            <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                            Hot
                          </span>
                        ) : null}
                        <h3 className="break-words text-sm font-bold leading-5 tracking-tight transition-colors group-hover:text-emerald-700 sm:text-base dark:group-hover:text-emerald-300">
                          {link.title}
                        </h3>
                      </div>

                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground transition-all group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.45 }}
          className="mt-auto pt-12 text-center text-xs text-muted-foreground"
        >
          <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <p>© {new Date().getFullYear()} Ryan Eko Apps</p>
          <p className="mt-1">Creative tools for faster workflows.</p>
        </motion.footer>
      </div>
    </main>
  );
}
