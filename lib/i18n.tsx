"use client";

import React, { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Locale = "id" | "en";

interface PurchaseNoticePageTranslation {
    badge: string;
    title: string;
    subtitle: string;
    quickChips: string[];
    checklist: string[];
    inlineTipTitle: string;
    inlineTipBody: string;
    note: string;
    secondaryTitle: string;
    secondaryHint: string;
    productLabels: string[];
}

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
        clientDesk: { description: string };
    };
    purchaseNotice: {
        common: {
            navTitle: string;
            checklistTitle: string;
            noteTitle: string;
            existingAccountTitle: string;
            emailTipsTitle: string;
            emailTips: string;
            supportTitle: string;
            supportNote: string;
            footerNote: string;
        };
        fastpik: PurchaseNoticePageTranslation;
        clientDesk: PurchaseNoticePageTranslation;
        bundle: PurchaseNoticePageTranslation;
        rawFileCopyTool: PurchaseNoticePageTranslation;
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
            clientDesk: {
                description:
                    "Platform untuk mengelola booking, invoice, jadwal, dan komunikasi klien dalam satu dashboard.",
            },
        },
        purchaseNotice: {
            common: {
                navTitle: "Ryan Eko Apps",
                checklistTitle: "Yang perlu kamu lakukan sekarang",
                noteTitle: "Penting",
                existingAccountTitle: "Kalau kamu sudah punya akun",
                emailTipsTitle: "Kalau email belum masuk",
                emailTips:
                    "Coba cek folder Spam, Promotions, atau Updates. Kadang email baru terlihat beberapa menit setelah pembayaran selesai. Kalau email verifikasi atau set password sudah masuk, sebaiknya segera dibuka karena link biasanya hanya berlaku 1x24 jam.",
                supportTitle: "Masih belum menerima email?",
                supportNote:
                    "Kalau setelah menunggu beberapa menit email tetap belum ada, hubungi Ryan Eko Apps dan sertakan email yang kamu pakai di halaman pembelian agar kami bisa bantu cek.",
                footerNote:
                    "Petunjuk utamanya ditujukan untuk akun baru, tapi clue untuk akun yang sudah ada juga tersedia di halaman ini.",
            },
            fastpik: {
                badge: "Fastpik Purchase / Upgrade",
                title: "Pembelian atau upgrade Fastpik berhasil",
                subtitle:
                    "Kalau kamu beli Fastpik dari halaman pembelian tapi belum pernah membuat akun sebelumnya, cek email dulu sebelum mencoba login.",
                quickChips: [
                    "Cek email dulu",
                    "Buat password",
                    "Login setelah siap",
                ],
                checklist: [
                    "Buka inbox email yang kamu pakai saat checkout di halaman pembelian.",
                    "Cari email dari Fastpik untuk membuat password akun.",
                    "Klik link di email tersebut lalu buat atau set password Fastpik kamu.",
                    "Setelah password berhasil dibuat, baru login ke Fastpik dengan email yang sama.",
                ],
                inlineTipTitle: "Kalau email belum masuk",
                inlineTipBody:
                    "Coba cek folder Spam, Promotions, atau Updates. Kalau email verifikasi atau set password sudah masuk, sebaiknya segera dibuka karena link biasanya hanya berlaku 1x24 jam.",
                note:
                    "Akses akun baru tidak langsung siap dipakai setelah pembayaran. Langkah pertama tetap harus lewat email untuk membuat password.",
                secondaryTitle: "Kalau kamu sudah punya akun",
                secondaryHint:
                    "Kalau email checkout dari halaman pembelian sama dengan email akun Fastpik kamu yang sudah ada, paket atau upgrade biasanya akan masuk ke akun tersebut. Kamu biasanya tidak perlu buat password baru lagi, cukup cek email untuk link login jika dikirim lalu masuk memakai email yang sama.",
                productLabels: ["Fastpik"],
            },
            clientDesk: {
                badge: "Client Desk Purchase / Upgrade",
                title: "Pembelian atau upgrade Client Desk berhasil",
                subtitle:
                    "Kalau kamu beli Client Desk dari halaman pembelian tapi belum pernah membuat akun sebelumnya, cek email dulu sebelum mencoba login.",
                quickChips: [
                    "Cek email dulu",
                    "Buat password",
                    "Login setelah siap",
                ],
                checklist: [
                    "Buka inbox email yang kamu pakai saat checkout di halaman pembelian.",
                    "Cari email dari Client Desk untuk membuat password akun.",
                    "Klik link di email tersebut lalu buat atau set password Client Desk kamu.",
                    "Setelah password berhasil dibuat, baru login ke Client Desk dengan email yang sama.",
                ],
                inlineTipTitle: "Kalau email belum masuk",
                inlineTipBody:
                    "Coba cek folder Spam, Promotions, atau Updates. Kalau email verifikasi atau set password sudah masuk, sebaiknya segera dibuka karena link biasanya hanya berlaku 1x24 jam.",
                note:
                    "Untuk akun baru, akses Client Desk disiapkan melalui email setelah pembayaran berhasil. Jadi jangan langsung panik kalau belum bisa login.",
                secondaryTitle: "Kalau kamu sudah punya akun",
                secondaryHint:
                    "Kalau email checkout dari halaman pembelian sama dengan email akun Client Desk kamu yang sudah ada, paket atau upgrade biasanya akan masuk ke akun tersebut. Kamu biasanya tidak perlu membuat password baru, cukup cek email untuk link login jika dikirim lalu masuk memakai email yang sama.",
                productLabels: ["Client Desk"],
            },
            bundle: {
                badge: "Bundle Purchase / Upgrade",
                title: "Pembelian atau upgrade Client Desk & Fastpik berhasil",
                subtitle:
                    "Kalau kamu beli bundle dari halaman pembelian tapi belum pernah membuat akun sebelumnya, cek email dulu karena akses untuk kedua app disiapkan dari email checkout yang sama.",
                quickChips: [
                    "Cek email dulu",
                    "Buat password",
                    "Login setelah siap",
                ],
                checklist: [
                    "Buka inbox email yang kamu pakai saat checkout di halaman pembelian.",
                    "Cari email akses dari Client Desk dan Fastpik untuk menyiapkan akunmu.",
                    "Klik link di email yang kamu terima lalu buat atau set password terlebih dahulu.",
                    "Setelah password selesai dibuat, baru login ke Client Desk dan Fastpik menggunakan email checkout yang sama.",
                ],
                inlineTipTitle: "Kalau email belum masuk",
                inlineTipBody:
                    "Coba cek folder Spam, Promotions, atau Updates. Kalau email verifikasi atau set password sudah masuk, sebaiknya segera dibuka karena link biasanya hanya berlaku 1x24 jam.",
                note:
                    "Bundle ini bukan berarti satu halaman login gabungan. Client Desk dan Fastpik tetap disiapkan sebagai dua akses app terpisah, dan emailnya bisa masuk terpisah.",
                secondaryTitle: "Kalau kamu sudah punya akun",
                secondaryHint:
                    "Kalau kamu sudah punya akun Client Desk, Fastpik, atau keduanya dengan email checkout yang sama, paket atau upgrade bundle akan mengikuti akses yang sudah ada di masing-masing app. Kamu biasanya tidak perlu membuat password baru lagi, tapi tetap cek email karena link login untuk tiap app bisa dikirim terpisah.",
                productLabels: ["Client Desk", "Fastpik"],
            },
            rawFileCopyTool: {
                badge: "RAW File Copy Tool Purchase",
                title: "Pembelian RAW File Copy Tool berhasil",
                subtitle:
                    "Kalau kamu beli RAW File Copy Tool dari halaman pembelian, cek email dulu karena link download, serial number, dan tutorial install dikirim ke sana.",
                quickChips: [
                    "Cek email",
                    "Download app",
                    "Aktivasi serial",
                ],
                checklist: [
                    "Buka inbox email yang kamu pakai saat checkout di halaman pembelian.",
                    "Cari email RAW File Copy Tool yang berisi link download dan serial number.",
                    "Download app lalu ikuti tutorial install sesuai perangkat dari email tersebut.",
                    "Buka app dan masukkan serial number dari email untuk aktivasi.",
                    "Pastikan internet aktif saat aktivasi pertama.",
                ],
                inlineTipTitle: "Kalau email belum masuk",
                inlineTipBody:
                    "Coba cek folder Spam, Promotions, atau Updates. Kalau emailnya sudah ketemu, simpan serial number-nya lalu buka info download atau tutorial installnya supaya tidak kelewat.",
                note:
                    "RAW File Copy Tool tidak memakai flow akun atau password. Akses utamanya dikirim lewat email pembelian berupa link download, serial number, dan tutorial install.",
                secondaryTitle: "Kalau email sudah ketemu",
                secondaryHint:
                    "Simpan serial number-nya, lalu gunakan link download dan tutorial install dari email tersebut. Saat aktivasi pertama, pastikan perangkat terhubung ke internet.",
                productLabels: ["RAW File Copy Tool"],
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
            clientDesk: {
                description:
                    "A platform to manage bookings, invoices, schedules, and client communication in one dashboard.",
            },
        },
        purchaseNotice: {
            common: {
                navTitle: "Ryan Eko Apps",
                checklistTitle: "What you should do now",
                noteTitle: "Important",
                existingAccountTitle: "If you already have an account",
                emailTipsTitle: "If the email has not arrived yet",
                emailTips:
                    "Please check your Spam, Promotions, or Updates folders. Sometimes the email appears a few minutes after the payment is completed. If the verification or password setup email has arrived, open it as soon as possible because the link usually expires within 24 hours.",
                supportTitle: "Still have not received the email?",
                supportNote:
                    "If the email is still missing after waiting a few minutes, contact Ryan Eko Apps and include the email address you used on the purchase page so we can help check it.",
                footerNote:
                    "The main guidance is intended for new accounts, but this page also includes a clue for buyers who already have an account.",
            },
            fastpik: {
                badge: "Fastpik Purchase / Upgrade",
                title: "Your Fastpik purchase or upgrade was successful",
                subtitle:
                    "If you bought Fastpik from the purchase page and had not created an account before, check your email first before trying to log in.",
                quickChips: [
                    "Check email first",
                    "Create password",
                    "Login after setup",
                ],
                checklist: [
                    "Open the inbox for the email address you used on the purchase page.",
                    "Look for an email from Fastpik to create your account password.",
                    "Open the link in that email and create or set your Fastpik password.",
                    "Once your password is ready, log in to Fastpik with the same email address.",
                ],
                inlineTipTitle: "If the email has not arrived yet",
                inlineTipBody:
                    "Please check your Spam, Promotions, or Updates folders. If the verification or password setup email has arrived, open it as soon as possible because the link usually expires within 24 hours.",
                note:
                    "A newly created account is not ready for immediate access right after payment. The first step still happens through email so you can create your password.",
                secondaryTitle: "If you already have an account",
                secondaryHint:
                    "If the email you used on the purchase page matches your existing Fastpik account email, the package or upgrade will usually be applied to that account. You usually do not need to create a new password again. Just check your email for a login link if one is sent, then sign in with the same email address.",
                productLabels: ["Fastpik"],
            },
            clientDesk: {
                badge: "Client Desk Purchase / Upgrade",
                title: "Your Client Desk purchase or upgrade was successful",
                subtitle:
                    "If you bought Client Desk from the purchase page and had not created an account before, check your email first before trying to log in.",
                quickChips: [
                    "Check email first",
                    "Create password",
                    "Login after setup",
                ],
                checklist: [
                    "Open the inbox for the email address you used on the purchase page.",
                    "Look for an email from Client Desk to create your account password.",
                    "Open the link in that email and create or set your Client Desk password.",
                    "Once your password is ready, log in to Client Desk with the same email address.",
                ],
                inlineTipTitle: "If the email has not arrived yet",
                inlineTipBody:
                    "Please check your Spam, Promotions, or Updates folders. If the verification or password setup email has arrived, open it as soon as possible because the link usually expires within 24 hours.",
                note:
                    "For a new account, Client Desk access is prepared through email after payment succeeds, so do not worry if you cannot log in right away.",
                secondaryTitle: "If you already have an account",
                secondaryHint:
                    "If the email you used on the purchase page matches your existing Client Desk account email, the package or upgrade will usually be applied to that account. You usually do not need to create a new password again. Just check your email for a login link if one is sent, then sign in with the same email address.",
                productLabels: ["Client Desk"],
            },
            bundle: {
                badge: "Bundle Purchase / Upgrade",
                title: "Your Client Desk & Fastpik purchase or upgrade was successful",
                subtitle:
                    "If you bought the bundle from the purchase page and had not created an account before, check your email first because access for both apps is prepared using the same checkout email.",
                quickChips: [
                    "Check email first",
                    "Create password",
                    "Login after setup",
                ],
                checklist: [
                    "Open the inbox for the email address you used on the purchase page.",
                    "Look for the access emails from Client Desk and Fastpik so your accounts can be prepared.",
                    "Open the links in the emails you receive, then create or set your password first.",
                    "After your password is ready, log in to Client Desk and Fastpik using the same checkout email.",
                ],
                inlineTipTitle: "If the email has not arrived yet",
                inlineTipBody:
                    "Please check your Spam, Promotions, or Updates folders. If the verification or password setup email has arrived, open it as soon as possible because the link usually expires within 24 hours.",
                note:
                    "This bundle does not mean one combined login page. Client Desk and Fastpik are still prepared as access to two separate apps, and their emails may arrive separately.",
                secondaryTitle: "If you already have an account",
                secondaryHint:
                    "If you already have a Client Desk account, a Fastpik account, or both with the same checkout email, the bundle package or upgrade will follow those existing app accesses. You usually do not need to create a new password again, but you should still check your email because login links for each app may arrive separately.",
                productLabels: ["Client Desk", "Fastpik"],
            },
            rawFileCopyTool: {
                badge: "RAW File Copy Tool Purchase",
                title: "Your RAW File Copy Tool purchase was successful",
                subtitle:
                    "If you bought RAW File Copy Tool from the purchase page, check your email first because the download link, serial number, and install tutorial are sent there.",
                quickChips: [
                    "Check email",
                    "Download app",
                    "Activate serial",
                ],
                checklist: [
                    "Open the inbox for the email address you used on the purchase page.",
                    "Look for the RAW File Copy Tool email that contains the download link and serial number.",
                    "Download the app, then follow the install tutorial for your device from that email.",
                    "Open the app and enter the serial number from the email to activate it.",
                    "Make sure your internet connection is on during the first activation.",
                ],
                inlineTipTitle: "If the email has not arrived yet",
                inlineTipBody:
                    "Please check your Spam, Promotions, or Updates folders. Once you find the email, save the serial number and open the download or install tutorial info promptly so it does not get missed.",
                note:
                    "RAW File Copy Tool does not use an account or password flow. The main access comes from the purchase email in the form of a download link, serial number, and install tutorial.",
                secondaryTitle: "Once you find the email",
                secondaryHint:
                    "Save the serial number, then use the download link and install tutorial from that email. During the first activation, make sure the device is connected to the internet.",
                productLabels: ["RAW File Copy Tool"],
            },
        },
    },
};

const localeListeners = new Set<() => void>();

function getStoredLocale(): Locale {
    if (typeof window === "undefined") {
        return "id";
    }

    const saved = localStorage.getItem("locale");
    return saved === "id" || saved === "en" ? saved : "id";
}

function subscribeToLocale(listener: () => void) {
    localeListeners.add(listener);
    return () => {
        localeListeners.delete(listener);
    };
}

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
    const locale: Locale = useSyncExternalStore(
        subscribeToLocale,
        getStoredLocale,
        () => "id"
    );

    const setLocale = useCallback((newLocale: Locale) => {
        localStorage.setItem("locale", newLocale);
        localeListeners.forEach((listener) => listener());
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
