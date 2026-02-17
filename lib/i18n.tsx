"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type Locale = "id" | "en";

interface Translations {
    heroTitle: string;
    heroDescription: string;
    footer: string;
    comingSoon: string;
    apps: {
        rawFileCopyTool: { description: string };
        fastpik: { description: string };
        realtimeUploadPro: { description: string };
        photoSplitExpress: { description: string };
        autoExportLrC: { description: string };
        clientManagement: { description: string };
    };
}

const translations: Record<Locale, Translations> = {
    id: {
        heroTitle: "Ryan Eko Apps",
        heroDescription:
            "Kumpulan tools profesional untuk fotografer dan videografer. Tingkatkan produktivitas workflow mu dengan aplikasi kami.",
        footer: "All rights reserved.",
        comingSoon: "Coming Soon",
        apps: {
            rawFileCopyTool: {
                description:
                    "Tool otomatis untuk filter JPEG dan RAW berdasarkan teks input.",
            },
            fastpik: {
                description: "Tool untuk mempermudah kamu dalam memilih foto.",
            },
            realtimeUploadPro: {
                description:
                    "Tool untuk mengotomatisasi upload secara otomatis ke Google Drive.",
            },
            photoSplitExpress: {
                description: "Tool untuk memisahkan RAW & JPEG secara otomatis.",
            },
            autoExportLrC: {
                description:
                    "Tool untuk auto export foto dalam mode tether dengan settingan export (preset, frame, dll).",
            },
            clientManagement: {
                description: "Coming Soon.",
            },
        },
    },
    en: {
        heroTitle: "Ryan Eko Apps",
        heroDescription:
            "A collection of professional tools for photographers and videographers. Boost your workflow productivity with our apps.",
        footer: "All rights reserved.",
        comingSoon: "Coming Soon",
        apps: {
            rawFileCopyTool: {
                description:
                    "Automatic tool to filter JPEG and RAW files based on text input.",
            },
            fastpik: {
                description: "A tool to help you pick photos easily.",
            },
            realtimeUploadPro: {
                description:
                    "A tool to automatically upload files to Google Drive in real-time.",
            },
            photoSplitExpress: {
                description: "A tool to automatically separate RAW & JPEG files.",
            },
            autoExportLrC: {
                description:
                    "A tool for auto exporting photos in tether mode with export settings (preset, frame, etc).",
            },
            clientManagement: {
                description: "Coming Soon.",
            },
        },
    },
};

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Translations;
}

const I18nContext = createContext<I18nContextType>({
    locale: "id",
    setLocale: () => { },
    t: translations.id,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("id");

    useEffect(() => {
        const saved = localStorage.getItem("locale") as Locale | null;
        if (saved && (saved === "id" || saved === "en")) {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);
    }, []);

    return (
        <I18nContext.Provider
            value={{ locale, setLocale, t: translations[locale] }}
        >
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    return useContext(I18nContext);
}

export type { Locale, Translations };
