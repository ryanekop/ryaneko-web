import type { Locale } from "@/lib/i18n";
import { StoreApiError, type StoreOrderStatus } from "@/lib/software-store";

const id = {
    product: "RAW File Copy Tool", history: "Riwayat pembelian", backProduct: "Kembali ke produk", checkoutTitle: "Selesaikan pembelianmu", checkoutDescription: "Isi data, pilih jumlah device, lalu bayar melalui Mayar. Download dan serial akan tersedia di web serta email setelah pembayaran terverifikasi.",
    buyerDetails: "Data pembeli", name: "Nama lengkap", email: "Email", mobile: "Nomor HP / WhatsApp", instagram: "Username Instagram", os: "Sistem operasi", source: "Tahu dari mana?", select: "Pilih salah satu", instagramHelp: "Contoh: @username", emailHelp: "Gunakan email yang aktif untuk menerima serial dan mengakses riwayat.", packages: "Pilih lisensi", device: "device", total: "Total pembayaran", required: "Semua data wajib diisi.", pay: "Lanjutkan ke pembayaran", paying: "Menyiapkan pembayaran…", paymentProvider: "Pembayaran aman melalui Mayar", resumeHint: "Jika pembayaran sebelumnya masih berlaku, kamu akan melanjutkan pembayaran yang sama. Jika sudah kedaluwarsa, tautan pembayaran diperbarui.", lastOrder: "Lihat pesanan terakhir", loading: "Memuat…", retry: "Coba lagi", unavailable: "Checkout web belum tersedia. Kamu tetap bisa membeli melalui Mayar.", buyMayar: "Beli melalui Mayar", receiptTitle: "Pesananmu", receiptDescription: "Status pembayaran, download, dan serial pembelian tersedia di sini.", date: "Tanggal", licenses: "Jumlah lisensi", orderAmount: "Total", serials: "Serial number", download: "Download aplikasi", copy: "Salin", copied: "Tersalin", copyFailed: "Serial belum berhasil disalin. Pilih teks serial untuk menyalinnya.", checkAgain: "Cek lagi", checking: "Mengecek…", pollingDone: "Pemeriksaan otomatis selesai. Tekan Cek lagi jika kamu baru menyelesaikan pembayaran.", continuePayment: "Lanjutkan pembayaran", buyAgain: "Buat pembayaran lagi", emailNotice: "Email pembelian tetap dikirim. Jika belum terlihat, periksa folder Spam/Junk.", receiptAccessError: "Akses pesanan tidak berlaku atau sudah kedaluwarsa. Buka riwayat pembelian melalui email untuk melihat pesananmu.", historyDescription: "Gunakan email saat pembelian. Kami akan mengirim kode verifikasi untuk membuka riwayat, serial, dan download milikmu.", requestOtp: "Kirim kode verifikasi", sending: "Mengirim…", otpTitle: "Verifikasi email", otpDescription: "Jika email memiliki pembelian, kode verifikasi sudah dikirim. Periksa inbox atau Spam/Junk. Kode berlaku 10 menit.", otp: "Kode verifikasi 6 digit", verify: "Buka riwayat", verifying: "Memverifikasi…", resend: "Kirim ulang kode", resendWait: "Kirim ulang dalam", seconds: "detik", changeEmail: "Ganti email", logout: "Keluar", sessionNote: "Akses riwayat berlaku 30 menit. Keluar setelah selesai jika memakai perangkat bersama.", emptyHistory: "Belum ada pembelian RAW File Copy Tool yang tercatat untuk email ini.", viewOrder: "Lihat pesanan", previous: "Sebelumnya", next: "Berikutnya", page: "Halaman", backHistory: "Kembali ke riwayat", historyEmailLink: "Cari pembelian lewat email", sessionExpired: "Akses riwayat sudah berakhir. Verifikasi email kembali.", genericError: "Permintaan belum berhasil. Periksa koneksi lalu coba lagi.", rateLimited: "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.", otpInvalid: "Kode salah atau sudah kedaluwarsa. Periksa kode atau kirim ulang.", otpAttempts: "Batas percobaan kode tercapai. Kirim kode baru setelah jeda selesai.", storageError: "Izinkan penyimpanan sesi di browser agar pesanan dapat dibuka kembali, lalu coba lagi.", paymentError: "Pembayaran belum dapat dibuat. Coba lagi; jika sebelumnya sudah membayar, cek riwayat melalui email.",
};

const en: Record<keyof typeof id, string> = {
    product: "RAW File Copy Tool", history: "Purchase history", backProduct: "Back to product", checkoutTitle: "Complete your purchase", checkoutDescription: "Enter your details, choose the device count, and pay through Mayar. Your download and serials will be available on the web and by email after payment is verified.",
    buyerDetails: "Buyer details", name: "Full name", email: "Email", mobile: "Phone / WhatsApp number", instagram: "Instagram username", os: "Operating system", source: "How did you hear about us?", select: "Select an option", instagramHelp: "Example: @username", emailHelp: "Use an active email to receive your serials and access purchase history.", packages: "Choose your license", device: "device", total: "Payment total", required: "All details are required.", pay: "Continue to payment", paying: "Preparing payment…", paymentProvider: "Secure payment through Mayar", resumeHint: "If your previous payment is still valid, you will resume the same payment. If it has expired, the payment link will be renewed.", lastOrder: "View last order", loading: "Loading…", retry: "Try again", unavailable: "Web checkout is not available yet. You can still purchase through Mayar.", buyMayar: "Buy through Mayar", receiptTitle: "Your order", receiptDescription: "Find your payment status, download, and purchase serials here.", date: "Date", licenses: "License count", orderAmount: "Total", serials: "Serial numbers", download: "Download app", copy: "Copy", copied: "Copied", copyFailed: "The serial could not be copied. Select the serial text to copy it.", checkAgain: "Check again", checking: "Checking…", pollingDone: "Automatic checking has finished. Select Check again if you have just completed payment.", continuePayment: "Continue payment", buyAgain: "Create payment again", emailNotice: "Your purchase email will still be sent. Check Spam/Junk if you cannot find it.", receiptAccessError: "Order access is invalid or has expired. Open purchase history with your email to view the order.", historyDescription: "Use your purchase email. We will send a verification code to open your history, serials, and downloads.", requestOtp: "Send verification code", sending: "Sending…", otpTitle: "Verify your email", otpDescription: "If this email has purchases, a verification code has been sent. Check your inbox or Spam/Junk. The code is valid for 10 minutes.", otp: "6-digit verification code", verify: "Open history", verifying: "Verifying…", resend: "Resend code", resendWait: "Resend in", seconds: "seconds", changeEmail: "Change email", logout: "Sign out", sessionNote: "History access lasts 30 minutes. Sign out when finished on a shared device.", emptyHistory: "No RAW File Copy Tool purchases are recorded for this email yet.", viewOrder: "View order", previous: "Previous", next: "Next", page: "Page", backHistory: "Back to history", historyEmailLink: "Find purchases by email", sessionExpired: "History access has expired. Verify your email again.", genericError: "The request could not be completed. Check your connection and try again.", rateLimited: "Too many attempts. Wait a moment and try again.", otpInvalid: "The code is incorrect or has expired. Check the code or request a new one.", otpAttempts: "The code attempt limit has been reached. Request a new code after the cooldown.", storageError: "Allow browser session storage so your order can be reopened, then try again.", paymentError: "Payment could not be created. Try again; if you already paid, check your history by email.",
};

export function getStoreCopy(locale: Locale) {
    return locale === "en" ? { ...en, source: "How did you hear about Ryan Eko Apps?" } : { ...id, source: "Darimana kamu mengetahui Ryan Eko Apps?" };
}

export function getCheckoutReviewCopy(locale: Locale) {
    return locale === "en" ? {
        title: "Review your purchase details",
        reminder: "Check your email and WhatsApp number carefully. Your email is used to receive serials and access purchase history.",
        edit: "Go back and edit details", confirm: "Details are correct, continue to payment",
        emailWarning: "Make sure your email is active, correctly spelled, and its inbox is not full. Check Spam/Junk for your purchase email.",
        phoneWarning: "Make sure your WhatsApp number is active and correctly entered.",
    } : {
        title: "Periksa kembali data pembelian",
        reminder: "Pastikan email dan nomor WhatsApp sudah benar dan tidak typo. Email digunakan untuk menerima serial dan mengakses riwayat pembelian.",
        edit: "Kembali, perbaiki data", confirm: "Data sudah benar, lanjut bayar",
        emailWarning: "Pastikan email aktif, tidak typo, dan inbox tidak penuh. Periksa Spam/Junk untuk email pembelian.",
        phoneWarning: "Pastikan nomor WhatsApp aktif dan tidak typo.",
    };
}

export function getUnknownPaymentCopy(locale: Locale) {
    return locale === "id" ? { label: "Status pembayaran tidak tersedia", description: "Catatan pembayaran lama tidak lengkap. Serial dan download pembelian yang tercatat tetap dapat dibuka setelah verifikasi email." } : { label: "Payment status unavailable", description: "The earlier payment record is incomplete. Recorded purchase serials and downloads remain accessible after email verification." };
}

const statusCopy: Record<Locale, Record<StoreOrderStatus, { label: string; description: string }>> = {
    id: {
        pending: { label: "Menunggu pembayaran", description: "Pesanan tersimpan. Selesaikan pembayaran melalui Mayar untuk mendapatkan download dan serial." },
        verifying: { label: "Memverifikasi pembayaran", description: "Kami sedang memeriksa pembayaranmu. Halaman akan diperbarui otomatis." },
        fulfilled: { label: "Pembelian selesai", description: "Download dan serial sudah siap. Simpan serial untuk aktivasi aplikasi." },
        expired: { label: "Pembayaran kedaluwarsa", description: "Tautan pembayaran telah kedaluwarsa. Kembali ke halaman pembelian untuk menyiapkan pembayaran lagi." },
        awaiting_stock: { label: "Menunggu serial", description: "Pembayaran sudah diterima. Serial sedang disiapkan; kamu tidak perlu membayar lagi." },
        payment_error: { label: "Pembayaran perlu diperiksa", description: "Status pembayaran belum dapat dikonfirmasi. Cek lagi atau hubungi kami jika pembayaran sudah dilakukan." },
    },
    en: {
        pending: { label: "Awaiting payment", description: "Your order is saved. Complete payment through Mayar to receive your download and serials." },
        verifying: { label: "Verifying payment", description: "We are checking your payment. This page will update automatically." },
        fulfilled: { label: "Purchase complete", description: "Your download and serials are ready. Keep the serials for app activation." },
        expired: { label: "Payment expired", description: "The payment link has expired. Return to checkout to prepare payment again." },
        awaiting_stock: { label: "Preparing serials", description: "Your payment has been received. Serials are being prepared; you do not need to pay again." },
        payment_error: { label: "Payment needs checking", description: "Payment status could not be confirmed. Check again or contact us if you have already paid." },
    },
};

export function getStoreStatusCopy(status: StoreOrderStatus, locale: Locale) { return statusCopy[locale][status]; }

export function getStoreError(error: unknown, locale: Locale) {
    const copy = getStoreCopy(locale);
    if (!(error instanceof StoreApiError)) return copy.genericError;
    if (error.code === "invalid_otp") return copy.otpInvalid;
    if (error.code === "otp_delivery_failed") return locale === "id" ? "Kode belum dapat dikirim. Tunggu sebentar lalu kirim ulang." : "The code could not be sent. Wait a moment and request it again.";
    if (error.code === "payment_pending_reconciliation") return locale === "id" ? "Pembayaran sebelumnya sedang diperiksa. Tunggu sebentar lalu coba lagi dengan data dan paket yang sama." : "Your previous payment is being checked. Wait a moment and retry with the same details and package.";
    if (error.code === "invalid_customer" || error.code === "invalid_email") return locale === "id" ? "Periksa kembali data yang diisi, lalu coba lagi." : "Check the details you entered and try again.";
    if (error.status === 401) return copy.sessionExpired;
    if (error.status === 429) return copy.rateLimited;
    if (error.code.includes("attempt")) return copy.otpAttempts;
    if (error.code.startsWith("otp_") || error.code === "invalid_code") return copy.otpInvalid;
    if (error.code === "store_disabled" || error.code === "checkout_disabled") return copy.unavailable;
    if (error.code.includes("payment") || error.code === "checkout_unavailable") return copy.paymentError;
    return copy.genericError;
}
