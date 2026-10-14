"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Check, CircleCheck, Clock3, Copy, Download, Loader2, RefreshCw, ShieldCheck } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { PurchaseConfetti } from "@/components/purchase-confetti";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getStoreCopy, getStoreError, getStoreStatusCopy, getUnknownPaymentCopy } from "@/lib/software-store-i18n";
import { safeStoreUrl, StoreApiError, storeDate, storeMoney, storeRequest, type ReceiptAccess, type StoreReceipt } from "@/lib/software-store";

export function SoftwareStoreShell({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
    const { locale } = useI18n();
    const copy = getStoreCopy(locale);
    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <header className="border-b border-border bg-background/90">
                <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold sm:text-lg">
                        <Image src="/ryaneko-logo.png" alt="" width={32} height={32} className="rounded-lg" />
                        Ryan Eko Apps
                    </Link>
                    <div className="flex items-center gap-1 sm:gap-2"><LanguageToggle /><ThemeToggle /></div>
                </div>
            </header>
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <Link href="/raw-file-copy-tool" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />{copy.backProduct}</Link>
                    <Link href="/purchase-history" className="font-medium underline underline-offset-4 hover:text-primary">{copy.history}</Link>
                </div>
                <div className="mb-8 max-w-2xl">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">{copy.product}</p>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                    {description && <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>}
                </div>
                {children}
            </main>
            <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">Ryan Eko Apps</footer>
        </div>
    );
}

export function StoreErrorNotice({ children }: { children: ReactNode }) {
    return <p role="alert" className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-900 dark:text-red-200">{children}</p>;
}

export function SoftwareReceiptCard({ receipt }: { receipt: StoreReceipt }) {
    const { locale } = useI18n();
    const copy = getStoreCopy(locale);
    const status = receipt.paymentStatusKnown === false ? getUnknownPaymentCopy(locale) : getStoreStatusCopy(receipt.status, locale);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [copyError, setCopyError] = useState(false);
    const fulfilled = receipt.status === "fulfilled";
    const delivered = fulfilled || receipt.kind === "legacy";
    const paymentUrl = receipt.status === "pending" ? safeStoreUrl(receipt.checkoutUrl) : null;
    const downloads = receipt.downloads.map((download) => ({ ...download, url: safeStoreUrl(download.url) })).filter((download) => download.url);

    useEffect(() => {
        if (copiedIndex === null) return;
        const timeout = window.setTimeout(() => setCopiedIndex(null), 2500);
        return () => window.clearTimeout(timeout);
    }, [copiedIndex]);

    async function copySerial(serial: string, index: number) {
        try {
            await navigator.clipboard.writeText(serial);
            setCopiedIndex(index);
            setCopyError(false);
        } catch {
            setCopyError(true);
        }
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className={`flex items-start gap-3 border-b border-border p-5 sm:p-6 ${fulfilled ? "bg-emerald-500/10" : "bg-muted/40"}`}>
                {fulfilled ? <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700 dark:text-emerald-300" /> : <Clock3 className="mt-0.5 h-6 w-6 shrink-0 text-muted-foreground" />}
                <div aria-live="polite"><h2 className="font-semibold">{status.label}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{status.description}</p></div>
            </div>
            <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold">{receipt.productName}</h3>
                <dl className="my-5 grid gap-4 text-sm sm:grid-cols-2">
                    <div><dt className="text-muted-foreground">{copy.date}</dt><dd className="mt-1 font-medium">{storeDate(receipt.createdAt, locale)}</dd></div>
                    <div><dt className="text-muted-foreground">{copy.orderAmount}</dt><dd className="mt-1 font-medium">{storeMoney(receipt.amount, locale)}</dd></div>
                    <div><dt className="text-muted-foreground">{copy.licenses}</dt><dd className="mt-1 font-medium">{receipt.count} {copy.device}</dd></div>
                    {receipt.os && <div><dt className="text-muted-foreground">{copy.os}</dt><dd className="mt-1 font-medium">{receipt.os}</dd></div>}
                </dl>
                {paymentUrl && <Button asChild size="lg" className="w-full sm:w-auto"><a href={paymentUrl} rel="noreferrer">{copy.continuePayment}</a></Button>}
                {receipt.status === "expired" && <Button asChild size="lg"><Link href="/checkout/raw-file-copy-tool">{copy.buyAgain}</Link></Button>}
                {delivered && (
                    <div className="space-y-6 border-t border-border pt-5">
                        <div>
                            <h4 className="mb-3 text-sm font-semibold">{copy.serials}</h4>
                            <div className="space-y-2">
                                {receipt.serials.map((serial, index) => (
                                    <div key={`${serial}-${index}`} className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-border bg-muted/30 p-3">
                                        <code className="min-w-0 select-all break-all text-sm font-semibold">{serial}</code>
                                        <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={() => void copySerial(serial, index)} aria-label={`${copy.copy} ${copy.serials} ${index + 1}`}>
                                            {copiedIndex === index ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
                                            {copiedIndex === index ? copy.copied : copy.copy}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            {copyError && <p role="status" className="mt-2 text-sm text-muted-foreground">{copy.copyFailed}</p>}
                        </div>
                        {downloads.length > 0 && <div>
                            <h4 className="mb-3 text-sm font-semibold">{copy.download}</h4>
                            <div className="flex flex-wrap gap-2">{downloads.map((download) => <Button asChild key={`${download.label}-${download.url}`}><a href={download.url!} target="_blank" rel="noopener noreferrer"><Download className="mr-2 h-4 w-4" />{download.label}</a></Button>)}</div>
                        </div>}
                        <p className="flex items-start gap-2 text-xs leading-6 text-muted-foreground"><ShieldCheck className="mt-1 h-4 w-4 shrink-0" />{copy.emailNotice}</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export function SoftwareOrderReceiptPage({ access }: { access: ReceiptAccess }) {
    const { locale } = useI18n();
    const copy = getStoreCopy(locale);
    const [receipt, setReceipt] = useState<StoreReceipt | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [accessExpired, setAccessExpired] = useState(false);
    const [pollingDone, setPollingDone] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const { orderId, token } = access;

    useEffect(() => {
        const controller = new AbortController();
        const startedAt = Date.now();
        let timer: number | undefined;
        async function poll() {
            let stop = false;
            try {
                const result = await storeRequest<StoreReceipt>({ action: "order", orderId, refresh: true }, token, controller.signal);
                if (controller.signal.aborted) return;
                setReceipt(result);
                setError(null);
                setAccessExpired(false);
                stop = ["fulfilled", "expired", "payment_error"].includes(result.status);
            } catch (requestError) {
                if (controller.signal.aborted) return;
                setError(requestError);
                if (requestError instanceof StoreApiError && requestError.status === 401) {
                    setAccessExpired(true);
                    stop = true;
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
            if (controller.signal.aborted || stop) return;
            if (Date.now() - startedAt >= 120000) { setPollingDone(true); return; }
            timer = window.setTimeout(() => { setLoading(true); void poll(); }, 5000);
        }
        void poll();
        return () => { controller.abort(); if (timer !== undefined) window.clearTimeout(timer); };
    }, [orderId, token, refresh]);

    return (
        <SoftwareStoreShell title={copy.receiptTitle} description={copy.receiptDescription}>
            {receipt?.status === "fulfilled" && <PurchaseConfetti />}
            <div className="mx-auto max-w-2xl space-y-4">
                {error !== null && <StoreErrorNotice>{accessExpired ? copy.receiptAccessError : getStoreError(error, locale)}</StoreErrorNotice>}
                {receipt && !accessExpired && <SoftwareReceiptCard receipt={receipt} />}
                {loading && !receipt && <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{copy.loading}</p>}
                {pollingDone && <p className="text-sm leading-6 text-muted-foreground">{copy.pollingDone}</p>}
                {!accessExpired && receipt?.status !== "fulfilled" && <Button type="button" variant="outline" disabled={loading} onClick={() => { setLoading(true); setPollingDone(false); setRefresh((value) => value + 1); }}><RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />{loading ? copy.checking : copy.checkAgain}</Button>}
                <Link href="/purchase-history" className="block text-sm font-medium underline underline-offset-4 hover:text-primary">{copy.historyEmailLink}</Link>
            </div>
        </SoftwareStoreShell>
    );
}
