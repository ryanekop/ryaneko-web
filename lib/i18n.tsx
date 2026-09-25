"use client";

import React, { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Locale = "id" | "en";

interface PurchaseRedirectTranslation {
    title: string;
    description: string;
}

interface RawFileCopyAfterBuyTranslation {
    title: string;
    description: string;
    spamPrefix: string;
    spamLabel: string;
    spamSuffix: string;
    supportPrompt: string;
    supportLink: string;
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

interface CustomDomainOptionTranslation {
    extension: string;
    price: string;
    title: string;
    description: string;
    badge: string;
}

interface CustomDomainExampleTranslation {
    domain: string;
    label: string;
    description: string;
}

interface CustomDomainPageTranslation {
    badge: string;
    title: string;
    subtitle: string;
    heroChips: string[];
    optionsTitle: string;
    optionsDescription: string;
    domainOptions: CustomDomainOptionTranslation[];
    recommendationTitle: string;
    recommendationBody: string;
    structureTitle: string;
    structureDescription: string;
    structureExamples: CustomDomainExampleTranslation[];
    freedomNoteTitle: string;
    freedomNoteBody: string;
    registrationTitle: string;
    registrationDescription: string;
    registrationFields: string[];
    templateTitle: string;
    templateDescription: string;
    templateLines: string[];
    copyButtonLabel: string;
    copiedButtonLabel: string;
    passwordNoteTitle: string;
    passwordNoteBody: string;
    addressNote: string;
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
        redirectCommon: {
            redirectPrefix: string;
            redirectSuffix: string;
            fallbackHint: string;
            linkLabels: {
                fastpik: string;
                clientDesk: string;
            };
        };
        fastpik: PurchaseRedirectTranslation;
        clientDesk: PurchaseRedirectTranslation;
        bundle: PurchaseRedirectTranslation;
        rawFileCopyTool: RawFileCopyAfterBuyTranslation;
    };
    rawFileCopyToolPage: RawFileCopyToolPageTranslation;
    customDomainPage: CustomDomainPageTranslation;
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
            redirectCommon: {
                redirectPrefix: "Dialihkan dalam",
                redirectSuffix: "detik...",
                fallbackHint: "Jika tidak otomatis terbuka, pilih halaman paket:",
                linkLabels: {
                    fastpik: "Buka paket Fastpik",
                    clientDesk: "Buka paket Client Desk",
                },
            },
            fastpik: {
                title: "Pembelian atau upgrade Fastpik berhasil",
                description: "Kamu akan diarahkan ke halaman paket Fastpik.",
            },
            clientDesk: {
                title: "Pembelian atau upgrade Client Desk berhasil",
                description: "Kamu akan diarahkan ke halaman paket Client Desk.",
            },
            bundle: {
                title: "Pembelian atau upgrade bundle berhasil",
                description: "Kamu akan diarahkan ke halaman paket Client Desk. Halaman paket Fastpik juga tersedia di bawah.",
            },
            rawFileCopyTool: {
                title: "Cek email kamu",
                description:
                    "Pembelian RAW File Copy Tool berhasil. Link download, serial number, dan panduan instalasi dikirim ke email yang kamu pakai saat pembelian.",
                spamPrefix: "Belum ada di inbox? Cek folder ",
                spamLabel: "Spam/Junk",
                spamSuffix: ".",
                supportPrompt: "Butuh bantuan?",
                supportLink: "Hubungi kami.",
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
            afterBuyButtonLabel: "Sudah beli? Cek email",
            backHomeLabel: "Kembali ke home",
        },
        customDomainPage: {
            badge: "Informasi Custom Domain",
            title: "Panduan memilih domain untuk Fastpik dan Client Desk",
            subtitle:
                "Halaman ini menjelaskan pilihan domain, estimasi biaya tahunan, contoh struktur domain utama dan subdomain, serta data yang perlu disiapkan untuk pendaftaran domain baru.",
            heroChips: [
                "Domain utama",
                "Subdomain app",
                "Data pendaftaran",
            ],
            optionsTitle: "Pilihan domain dan estimasi biaya",
            optionsDescription:
                "Harga di bawah ini adalah perkiraan berdasarkan opsi yang biasa dipakai. Harga final bisa berubah mengikuti provider domain.",
            domainOptions: [
                {
                    extension: ".my.id",
                    price: "20rb/tahun",
                    title: "Paling murah",
                    description:
                        "Bisa dipilih kalau ingin biaya paling rendah, tapi tidak direkomendasikan karena kesannya kurang profesional untuk bisnis.",
                    badge: "Tidak disarankan",
                },
                {
                    extension: ".web.id",
                    price: "50rb/tahun",
                    title: "Rekomendasi hemat",
                    description:
                        "Pilihan yang masih terjangkau dan sudah cukup rapi untuk dipakai sebagai domain utama vendor.",
                    badge: "Rekomendasi",
                },
                {
                    extension: ".com",
                    price: "200rb-300rb/tahun",
                    title: "Umum dan profesional",
                    description:
                        "Cocok kalau ingin domain yang terasa familiar, mudah diingat, dan umum dipakai untuk bisnis.",
                    badge: "Profesional",
                },
                {
                    extension: ".id",
                    price: "200rb-300rb/tahun",
                    title: "Identitas Indonesia",
                    description:
                        "Cocok kalau ingin domain yang terlihat resmi dan kuat untuk brand lokal Indonesia.",
                    badge: "Premium lokal",
                },
            ],
            recommendationTitle: "Saran pemilihan domain",
            recommendationBody:
                "Kalau ingin hemat tapi tetap terlihat rapi, .web.id adalah pilihan yang aman. .my.id memang paling murah, tetapi sebaiknya dihindari untuk kebutuhan brand karena bisa terlihat seperti domain murahan.",
            structureTitle: "Contoh struktur domain",
            structureDescription:
                "Setiap website tetap memakai nama di awal domain. Domain utama dipakai untuk brand vendor, lalu Fastpik dan Client Desk memakai subdomain masing-masing.",
            structureExamples: [
                {
                    domain: "xxxxx.web.id",
                    label: "Domain utama",
                    description: "Dipakai sebagai alamat utama vendor.",
                },
                {
                    domain: "client.xxxxx.web.id",
                    label: "Client Desk",
                    description: "Awalan client bisa dipakai untuk dashboard Client Desk.",
                },
                {
                    domain: "pilih.xxxxx.web.id",
                    label: "Fastpik",
                    description: "Awalan pilih bisa dipakai untuk halaman pemilihan foto Fastpik.",
                },
            ],
            freedomNoteTitle: "Nama bebas dipilih",
            freedomNoteBody:
                "Awalan subdomain dan nama domain tidak harus mengikuti contoh di atas. Nama vendor dan awalan seperti client atau pilih bisa diganti sesuai kebutuhan brand.",
            registrationTitle: "Data yang perlu disiapkan",
            registrationDescription:
                "Kalau domain mau diproses, siapkan data berikut untuk kebutuhan pendaftaran domain baru di provider domain.",
            registrationFields: [
                "Nama Lengkap Pribadi",
                "Nama Vendor",
                "Alamat Website Fastpik",
                "Alamat Website Clientdesk",
                "Email",
                "Password Baru",
                "Alamat",
                "Kode Pos",
                "No Telepon",
            ],
            templateTitle: "Template data untuk dikirim",
            templateDescription:
                "Template ini bisa dipakai agar data yang dikirim sudah lengkap dan mudah dicek sebelum pendaftaran domain.",
            templateLines: [
                "Nama Lengkap Pribadi:",
                "Nama Vendor:",
                "Alamat Website Fastpik:",
                "Alamat Website Clientdesk:",
                "Email:",
                "Password Baru:",
                "Alamat:",
                "Kode Pos:",
                "No Telepon:",
            ],
            copyButtonLabel: "Salin",
            copiedButtonLabel: "Tersalin",
            passwordNoteTitle: "Catatan password",
            passwordNoteBody:
                "Gunakan password baru khusus untuk pendaftaran domain, jangan memakai password yang sama dengan email, bank, atau akun penting lain.",
            addressNote:
                "Pastikan email tidak salah. Untuk alamat, minimal sertakan jalan, kota, dan provinsi.",
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
            redirectCommon: {
                redirectPrefix: "Redirecting in",
                redirectSuffix: "seconds...",
                fallbackHint: "If you are not redirected, choose a package page:",
                linkLabels: {
                    fastpik: "Open Fastpik packages",
                    clientDesk: "Open Client Desk packages",
                },
            },
            fastpik: {
                title: "Your Fastpik purchase or upgrade was successful",
                description: "You will be redirected to your Fastpik package page.",
            },
            clientDesk: {
                title: "Your Client Desk purchase or upgrade was successful",
                description: "You will be redirected to your Client Desk package page.",
            },
            bundle: {
                title: "Your bundle purchase or upgrade was successful",
                description: "You will be redirected to the Client Desk package page. The Fastpik package page is also linked below.",
            },
            rawFileCopyTool: {
                title: "Check your email",
                description:
                    "Your RAW File Copy Tool purchase was successful. The download link, serial number, and installation guide were sent to the email address you used at checkout.",
                spamPrefix: "Not in your inbox? Check your ",
                spamLabel: "Spam/Junk",
                spamSuffix: " folder.",
                supportPrompt: "Need help?",
                supportLink: "Contact us.",
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
            afterBuyButtonLabel: "Already bought it? Check email",
            backHomeLabel: "Back to home",
        },
        customDomainPage: {
            badge: "Custom Domain Info",
            title: "A domain guide for Fastpik and Client Desk",
            subtitle:
                "This page explains domain choices, yearly cost estimates, example main-domain and subdomain structures, and the details needed to register a new domain.",
            heroChips: [
                "Main domain",
                "App subdomains",
                "Registration details",
            ],
            optionsTitle: "Domain options and estimated costs",
            optionsDescription:
                "The prices below are estimates based on common options. Final pricing can change depending on the domain provider.",
            domainOptions: [
                {
                    extension: ".my.id",
                    price: "20rb/year",
                    title: "Lowest cost",
                    description:
                        "Available if the lowest yearly cost is the priority, but it is not recommended because it can look less professional for a business.",
                    badge: "Not recommended",
                },
                {
                    extension: ".web.id",
                    price: "50rb/year",
                    title: "Budget-friendly pick",
                    description:
                        "Still affordable and clean enough to use as the main domain for a vendor brand.",
                    badge: "Recommended",
                },
                {
                    extension: ".com",
                    price: "200rb-300rb/year",
                    title: "Common and professional",
                    description:
                        "A good fit if you want a familiar, easy-to-remember domain that is widely used for businesses.",
                    badge: "Professional",
                },
                {
                    extension: ".id",
                    price: "200rb-300rb/year",
                    title: "Indonesian identity",
                    description:
                        "A good fit if you want a domain that feels official and strong for a local Indonesian brand.",
                    badge: "Local premium",
                },
            ],
            recommendationTitle: "Domain recommendation",
            recommendationBody:
                "If you want a lower cost while still looking tidy, .web.id is a safe choice. .my.id is the cheapest, but it is better to avoid it for brand use because it can feel too cheap.",
            structureTitle: "Example domain structure",
            structureDescription:
                "Each website still uses a name at the beginning of the domain. The main domain is used for the vendor brand, while Fastpik and Client Desk use their own subdomains.",
            structureExamples: [
                {
                    domain: "xxxxx.web.id",
                    label: "Main domain",
                    description: "Used as the vendor's main address.",
                },
                {
                    domain: "client.xxxxx.web.id",
                    label: "Client Desk",
                    description: "The client prefix can be used for the Client Desk dashboard.",
                },
                {
                    domain: "pilih.xxxxx.web.id",
                    label: "Fastpik",
                    description: "The pilih prefix can be used for the Fastpik photo selection page.",
                },
            ],
            freedomNoteTitle: "Names are flexible",
            freedomNoteBody:
                "The subdomain prefix and domain name do not have to follow the examples above. The vendor name and prefixes like client or pilih can be changed to match the brand.",
            registrationTitle: "Details to prepare",
            registrationDescription:
                "If the domain should be processed, prepare these details for the new domain registration at the domain provider.",
            registrationFields: [
                "Full Personal Name",
                "Vendor Name",
                "Fastpik Website Address",
                "Clientdesk Website Address",
                "Email",
                "New Password",
                "Address",
                "Postal Code",
                "Phone Number",
            ],
            templateTitle: "Details template to send",
            templateDescription:
                "Use this template so the submitted details are complete and easy to check before domain registration.",
            templateLines: [
                "Full Personal Name:",
                "Vendor Name:",
                "Fastpik Website Address:",
                "Clientdesk Website Address:",
                "Email:",
                "New Password:",
                "Address:",
                "Postal Code:",
                "Phone Number:",
            ],
            copyButtonLabel: "Copy",
            copiedButtonLabel: "Copied",
            passwordNoteTitle: "Password note",
            passwordNoteBody:
                "Use a new password specifically for domain registration. Do not reuse a password from email, banking, or other important accounts.",
            addressNote:
                "Make sure the email is correct. For the address, include at least the street, city, and province.",
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
