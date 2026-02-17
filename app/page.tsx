'use client';

import Image from "next/image";
import { ArrowRight, ExternalLink, Clock, Instagram } from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/lib/i18n";

type AppKey = "rawFileCopyTool" | "fastpik" | "realtimeUploadPro" | "photoSplitExpress" | "autoExportLrC" | "clientManagement";

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
      name: "Realtime Upload Pro",
      key: "realtimeUploadPro",
      icon: "/realtime-upload-pro.png",
      status: "active",
      link: "#",
      iconScale: "scale-[1.35]"
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
      name: "Auto Export LrC Plugin",
      key: "autoExportLrC",
      icon: "/lightroom-plugin.png",
      status: "active",
      link: "#"
    },
    {
      name: "Client Management",
      key: "clientManagement",
      icon: null,
      status: "coming-soon",
      link: null
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
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
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
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            {t.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-12 bg-muted/30">
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
                  group relative flex flex-col p-6 rounded-2xl border border-border bg-card 
                  hover:shadow-lg hover:border-primary/20 transition-all duration-300
                  ${app.status === 'coming-soon' ? 'opacity-75' : 'hover:-translate-y-1'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-muted flex items-center justify-center border border-border/50 shadow-sm">
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
                      <Clock className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  {app.status === 'active' && (
                    <div className="p-2 rounded-full bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  )}
                  {app.status === 'coming-soon' && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
                      {t.comingSoon}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {app.name}
                </h3>
                <p className="text-muted-foreground text-sm flex-grow leading-relaxed">
                  {t.apps[app.key].description}
                </p>

                {app.link && app.status === 'active' && (
                  <Link href={app.link} className="absolute inset-0 z-10">
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
          <p className="text-sm text-muted-foreground mb-4">
            &copy; {new Date().getFullYear()} Ryan Eko Apps. {t.footer}
          </p>
          <div className="flex justify-center gap-6 text-muted-foreground">
            <a href="https://instagram.com/ryanekopram" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4" /> @ryanekopram
            </a>
            <a href="https://instagram.com/ryanekoapps" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4" /> @ryanekoapps
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
