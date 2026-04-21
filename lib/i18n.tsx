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

interface RawFileCopyFeatureTranslation {
    title: string;
    description: string;
}

interface RawFileCopyStepTranslation {
    title: string;
    description: string;
}

interface RawFileCopySocialCardTranslation {
    title: string;
    description: string;
    cta: string;
}

interface RawFileCopyToolPageTranslation {
    badge: string;
    overviewBadge: string;
    highlightsBadge: string;
    workflowBadge: string;
    instagramBadge: string;
    previewTitle: string;
    heroTitle: string;
    heroDescription: string;
    heroChips: string[];
    platformLabel: string;
    platforms: string[];
    problemTitle: string;
    problemBody: string;
    aboutTitle: string;
    aboutBody: string;
    formatTitle: string;
    formats: string[];
    featuresTitle: string;
    features: RawFileCopyFeatureTranslation[];
    workflowTitle: string;
    workflowSteps: RawFileCopyStepTranslation[];
    extraFeaturesTitle: string;
    extraFeaturesIntro: string;
    extraFeatures: string[];
    updateTitle: string;
    updateBadge: string;
    updateVersionLabel: string;
    updateSummary: string;
    updateHighlights: string[];
    socialTitle: string;
    socialDescription: string;
    socialFallbackTitle: string;
    socialFallbackDescription: string;
    socialCards: RawFileCopySocialCardTranslation[];
    finalCtaTitle: string;
    finalCtaDescription: string;
    buyButtonLabel: string;
    updateButtonLabel: string;
    afterBuyButtonLabel: string;
    backHomeLabel: string;
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
    rawFileCopyToolPage: RawFileCopyToolPageTranslation;
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
        rawFileCopyToolPage: {
            badge: "RAW Workflow Tool",
            overviewBadge: "Overview",
            highlightsBadge: "Product highlights",
            workflowBadge: "Workflow",
            instagramBadge: "Instagram",
            previewTitle: "Preview produk",
            heroTitle:
                "Filter file JPEG/RAW berdasarkan teks, lalu copy atau move hasilnya dalam hitungan detik.",
            heroDescription:
                "RAW File Copy Tool membantu fotografer mempercepat workflow setelah klien selesai memilih foto. Masukkan daftar nama file, referensi folder JPEG, atau sumber lain, lalu aplikasi akan mencari file yang cocok dan menyalin atau memindahkannya ke folder tujuan tanpa ribet.",
            heroChips: [
                "Copy & Move",
                "Text / JPEG / Google Drive",
                "Photographer-ready",
            ],
            platformLabel: "Tersedia untuk",
            platforms: ["macOS", "Windows", "Android"],
            problemTitle: "Solusi cepat untuk workflow seleksi file RAW",
            problemBody:
                "Daripada cari file satu per satu dari ribuan foto, kamu bisa pakai teks input atau daftar referensi untuk memfilter file yang cocok. Cocok untuk alur kerja setelah klien memilih JPEG dan kamu perlu menyiapkan file RAW untuk proses edit berikutnya.",
            aboutTitle: "Apa Itu RAW File Copy Tool?",
            aboutBody:
                "Ini adalah aplikasi yang dirancang untuk membaca daftar nama file, list JPEG, atau referensi lain, lalu mencocokkan file JPEG/RAW berdasarkan teks. Setelah ketemu, file yang cocok bisa langsung disalin atau dipindahkan ke folder tujuan yang kamu pilih.",
            formatTitle: "Format yang didukung",
            formats: ["ARW", "CR2", "CR3", "NEF", "NRW", "RAF", "RW2", "ORF", "PEF", "DNG", "JPG"],
            featuresTitle: "Fitur unggulan",
            features: [
                {
                    title: "Pencarian super cepat",
                    description:
                        "Mencocokkan file berdasarkan input teks dengan dukungan format RAW populer dan JPEG.",
                },
                {
                    title: "Multi-platform",
                    description:
                        "Tersedia untuk macOS, Windows, dan Android agar workflow bisa tetap jalan di perangkat yang kamu pakai.",
                },
                {
                    title: "Mode Copy & Move",
                    description:
                        "Pilih apakah file yang cocok ingin disalin ke folder baru atau langsung dipindahkan.",
                },
                {
                    title: "Update checker",
                    description:
                        "Bisa cek pembaruan supaya kamu lebih mudah tetap memakai versi terbaru aplikasi.",
                },
                {
                    title: "Aman & presisi",
                    description:
                        "Hanya file yang cocok dengan input yang diproses, jadi workflow lebih rapi dan minim salah ambil file.",
                },
                {
                    title: "Interface simpel",
                    description:
                        "Desainnya langsung fokus ke pekerjaan utama tanpa langkah yang bertele-tele.",
                },
            ],
            workflowTitle: "Cara kerja 3 langkah",
            workflowSteps: [
                {
                    title: "Pilih folder sumber RAW",
                    description:
                        "Tentukan folder tempat semua file RAW atau file asalmu berada sebelum proses dimulai.",
                },
                {
                    title: "Pilih folder tujuan",
                    description:
                        "Tentukan lokasi hasil file yang akan disalin atau dipindah agar output langsung rapi.",
                },
                {
                    title: "Masukkan list lalu jalankan",
                    description:
                        "Masukkan daftar nama file, teks pilihan klien, atau referensi lain, lalu jalankan mode copy atau move.",
                },
            ],
            extraFeaturesTitle: "Fitur tambahan dari aplikasi",
            extraFeaturesIntro:
                "Beberapa fitur praktis yang sudah muncul di resource aplikasi dan membuat workflow lebih fleksibel:",
            extraFeatures: [
                "Text List",
                "JPEG Folder",
                "Google Drive",
                "Search in Subfolders",
                "Keep folder structure",
                "Folder picker mengingat folder terakhir",
            ],
            updateTitle: "Update v2.7.2",
            updateBadge: "Update terbaru",
            updateVersionLabel: "Apa yang baru di v2.7.2",
            updateSummary:
                "Versi ini fokus pada perbaikan tampilan dan pengalaman penggunaan, terutama untuk ukuran window minimum, mode portrait/landscape, dan kestabilan layout.",
            updateHighlights: [
                "Perbaikan dan optimasi ukuran minimum window untuk mode landscape dan portrait.",
                "Toggle portrait/landscape ditambahkan ke menu bar.",
                "Input mode picker sekarang rata kanan tanpa stretching.",
                "Perbaikan enforcement minimum size window menggunakan NSWindowDelegate.",
            ],
            socialTitle: "Lihat demo / postingan",
            socialDescription:
                "Dua postingan singkat ini bisa bantu kasih gambaran cepat soal cara kerja dan value dari RAW File Copy Tool.",
            socialFallbackTitle: "Buka langsung di Instagram",
            socialFallbackDescription:
                "Fallback ini tetap bisa dipakai kalau browser memblokir embed atau script Instagram belum termuat.",
            socialCards: [
                {
                    title: "Workflow lebih cepat",
                    description:
                        "Sortir file dari list pilihan klien tidak perlu lagi makan waktu berjam-jam. RAW File Copy Tool bisa bantu copy atau move file otomatis hanya dari list teks.",
                    cta: "Lihat di Instagram",
                },
                {
                    title: "Filter file otomatis",
                    description:
                        "Aplikasi ini bisa bantu baca input list, mendeteksi nomor file, mengenali file ganda, dan mempercepat pencarian RAW dari kumpulan file yang besar.",
                    cta: "Lihat di Instagram",
                },
            ],
            finalCtaTitle: "Siap mempercepat workflow RAW kamu?",
            finalCtaDescription:
                "Pakai halaman ini sebagai pintu utama informasi produk, lalu arahkan user ke pembelian, update terbaru, atau panduan setelah pembelian sesuai kebutuhan mereka.",
            buyButtonLabel: "Beli RAW File Copy Tool",
            updateButtonLabel: "Info Update v2.7.2",
            afterBuyButtonLabel: "Sudah beli? Lihat panduan",
            backHomeLabel: "Kembali ke home",
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
        rawFileCopyToolPage: {
            badge: "RAW Workflow Tool",
            overviewBadge: "Overview",
            highlightsBadge: "Product highlights",
            workflowBadge: "Workflow",
            instagramBadge: "Instagram",
            previewTitle: "Product preview",
            heroTitle:
                "Filter JPEG/RAW files by text, then copy or move the matched results in seconds.",
            heroDescription:
                "RAW File Copy Tool helps photographers speed up the workflow after clients finish selecting photos. Enter a file list, use a JPEG reference folder, or pull from another source, then let the app match the right files and send them to your destination folder without the tedious manual work.",
            heroChips: [
                "Copy & Move",
                "Text / JPEG / Google Drive",
                "Photographer-ready",
            ],
            platformLabel: "Available on",
            platforms: ["macOS", "Windows", "Android"],
            problemTitle: "A faster way to handle selected RAW files",
            problemBody:
                "Instead of hunting files one by one across thousands of images, you can use text input or a reference list to filter the matching files. It is built for the stage after your client picks JPEGs and you need the corresponding RAW files ready for editing.",
            aboutTitle: "What Is RAW File Copy Tool?",
            aboutBody:
                "This app is designed to read file-name lists, JPEG references, or other sources, then match JPEG/RAW files based on text. Once the files are found, the app can copy or move the matched results into the destination folder you choose.",
            formatTitle: "Supported formats",
            formats: ["ARW", "CR2", "CR3", "NEF", "NRW", "RAF", "RW2", "ORF", "PEF", "DNG", "JPG"],
            featuresTitle: "Key features",
            features: [
                {
                    title: "Fast matching",
                    description:
                        "Match files using text-based input with support for popular RAW formats and JPEG.",
                },
                {
                    title: "Multi-platform",
                    description:
                        "Available for macOS, Windows, and Android so the workflow can stay consistent across devices.",
                },
                {
                    title: "Copy & Move modes",
                    description:
                        "Choose whether the matched files should be copied into a new folder or moved directly.",
                },
                {
                    title: "Update checker",
                    description:
                        "Makes it easier to stay on the latest version of the app.",
                },
                {
                    title: "Safe & precise",
                    description:
                        "Only files that match your input are processed, helping you avoid messy manual selection.",
                },
                {
                    title: "Simple interface",
                    description:
                        "The layout stays focused on the main job so you can start using it quickly.",
                },
            ],
            workflowTitle: "How it works in 3 steps",
            workflowSteps: [
                {
                    title: "Choose the RAW source folder",
                    description:
                        "Select the folder that contains your RAW files or source files before the process starts.",
                },
                {
                    title: "Choose the destination folder",
                    description:
                        "Pick the location where the copied or moved results should end up.",
                },
                {
                    title: "Enter the list and run",
                    description:
                        "Paste the file list, selected text, or another reference, then run the app in copy or move mode.",
                },
            ],
            extraFeaturesTitle: "Extra features from the app",
            extraFeaturesIntro:
                "These practical workflow helpers already show up in the product resources and make the tool more flexible:",
            extraFeatures: [
                "Text List",
                "JPEG Folder",
                "Google Drive",
                "Search in Subfolders",
                "Keep folder structure",
                "Folder picker remembers the last location",
            ],
            updateTitle: "Update v2.7.2",
            updateBadge: "Latest update",
            updateVersionLabel: "What is new in v2.7.2",
            updateSummary:
                "This release focuses on UI and usability refinements, especially around minimum window size, portrait/landscape behavior, and layout stability.",
            updateHighlights: [
                "Fixed and optimized minimum window size for both landscape and portrait modes.",
                "Added a portrait/landscape toggle to the menu bar.",
                "Input mode picker is now right-aligned without stretching.",
                "Improved minimum window size enforcement using NSWindowDelegate.",
            ],
            socialTitle: "See demo / posts",
            socialDescription:
                "These two short posts give a quick feel for the workflow and value of RAW File Copy Tool.",
            socialFallbackTitle: "Open on Instagram",
            socialFallbackDescription:
                "These fallback links are still usable if the browser blocks embeds or the Instagram script has not loaded yet.",
            socialCards: [
                {
                    title: "Faster file workflow",
                    description:
                        "Stop spending hours matching client selections by hand. RAW File Copy Tool helps copy or move the right files automatically from a text list.",
                    cta: "View on Instagram",
                },
                {
                    title: "Automatic RAW filtering",
                    description:
                        "The app can parse file lists, detect duplicates, recognize partial numbers, and speed up RAW matching across large folders.",
                    cta: "View on Instagram",
                },
            ],
            finalCtaTitle: "Ready to speed up your RAW workflow?",
            finalCtaDescription:
                "Use this page as the main product entry point, then guide visitors to purchase, update info, or post-purchase instructions based on what they need next.",
            buyButtonLabel: "Buy RAW File Copy Tool",
            updateButtonLabel: "Update Info v2.7.2",
            afterBuyButtonLabel: "Already bought it? View guide",
            backHomeLabel: "Back to home",
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
