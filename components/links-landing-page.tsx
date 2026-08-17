"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  Flame,
  Instagram,
  ShoppingBag,
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
    image: "/links-raw-file-copy-tool.webp",
    group: "order",
    highlighted: true,
  },
  {
    title: "Client Desk — Vendor Management",
    url: "https://clientdesk.ryanekoapp.web.id/id",
    image: "/links-client-desk.webp",
    group: "order",
    highlighted: true,
  },
  {
    title: "Fastpik — Photo Culling",
    url: "https://fastpik.ryanekoapp.web.id/id",
    image: "/links-fastpik.webp",
    group: "order",
    highlighted: true,
  },
  {
    title: "Photo Split Express",
    url: "https://ryaneko.myr.id/pl/photo-split-express",
    image: "/links-photo-split-express.webp",
    group: "order",
    imageScale: "scale-[1.3]",
  },
  {
    title: "Update 2.7.3 — RAW File Copy Tool",
    url: "https://drive.google.com/drive/folders/10ujMTzZPuR31TSsu59uHl3NJ093Hn0Ix?usp=sharing",
    image: "/links-raw-file-copy-tool.webp",
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-10 pt-4 sm:px-6 sm:pb-12 sm:pt-6">
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
          className="px-2 pb-7 pt-2 text-center sm:pb-8 sm:pt-3"
        >
          <div className="relative mx-auto mb-4 h-24 w-24">
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-emerald-400/40 via-sky-400/30 to-amber-300/40 blur-xl" />
            <Image
              src="/links-ryaneko-logo.webp"
              alt="Logo Ryan Eko Apps"
              width={192}
              height={192}
              className="relative h-full w-full rounded-full object-cover shadow-[0_16px_45px_rgba(15,23,42,0.14)]"
              priority
            />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Ryan Eko Apps
          </h1>
          <p className="mx-auto mt-2.5 max-w-md text-[13px] leading-5 text-muted-foreground sm:text-sm">
            Mempermudah workflow fotografer dan videografer 🚀
          </p>
          <a
            href="https://instagram.com/ryanekoapps"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka Instagram Ryan Eko Apps"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-[13px] font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-pink-500/30 hover:text-pink-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:text-pink-400"
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
          className="space-y-7"
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
                      className="flex items-center gap-2 text-sm font-bold sm:text-base"
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

                <div className="space-y-2.5">
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
                      className="group relative flex min-h-16 w-full items-center gap-3 overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/90 p-2.5 pr-3 shadow-[0_8px_28px_rgba(15,23,42,0.06)] backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:shadow-[0_12px_38px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-3"
                      {...trackingProps(link.url)}
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-emerald-500/[0.07] via-sky-500/[0.04] to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm sm:h-[52px] sm:w-[52px]">
                        <Image
                          src={link.image}
                          alt=""
                          width={128}
                          height={128}
                          className={`h-full w-full object-contain ${link.imageScale ?? ""}`}
                        />
                      </div>

                      <div className="relative min-w-0 flex-1 text-left">
                        <h3 className="break-words text-[13px] font-bold leading-5 tracking-tight transition-colors group-hover:text-emerald-700 sm:text-sm dark:group-hover:text-emerald-300">
                          {link.title}
                          {link.highlighted ? (
                            <span className="ml-2 inline-flex items-center gap-0.5 whitespace-nowrap align-middle text-[10px] font-bold uppercase tracking-[0.1em] text-red-600 dark:text-red-400">
                              <Flame className="h-3 w-3" aria-hidden="true" />
                              Hot
                            </span>
                          ) : null}
                        </h3>
                      </div>

                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground transition-all group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
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
