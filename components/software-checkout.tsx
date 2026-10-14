"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertTriangle, ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";
import { CheckoutReviewDialog, type CheckoutReview } from "@/components/checkout-review-dialog";

import { SoftwareStoreShell, StoreErrorNotice } from "@/components/software-order-receipt";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getStoreCopy, getStoreError, getCheckoutReviewCopy } from "@/lib/software-store-i18n";
import { createCheckoutToken, getReceiptPath, getStoreCatalog, readCheckoutDraft, receiptAccessFromUrl, safeStoreUrl, saveCheckoutDraft, saveReceiptAccess, softwareStoreEnabled, StoreApiError, storeMoney, storeRequest, type CheckoutDraft, type LicenseCount, type StoreCatalog, type StoreCheckoutResponse, type StoreCustomer } from "@/lib/software-store";

const emptyCustomer: StoreCustomer = { name: "", email: "", mobile: "", instagram: "", os: "", source: "" };
const inputClassName = "mt-2 w-full rounded-xl border border-input bg-background px-3 py-3 text-base shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

export function SoftwareCheckout() {
    const { locale } = useI18n();
    const copy = getStoreCopy(locale);
    const reviewCopy = getCheckoutReviewCopy(locale);
    const [review, setReview] = useState<CheckoutReview | null>(null);
    const paymentInFlight = useRef(false);
    const [customer, setCustomer] = useState<StoreCustomer>(emptyCustomer);
    const [count, setCount] = useState<LicenseCount>(1);
    const [draft, setDraft] = useState<CheckoutDraft | null>(null);
    const [catalog, setCatalog] = useState<StoreCatalog | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [storageError, setStorageError] = useState(false);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        async function load() {
            try {
                const result = await getStoreCatalog(controller.signal);
                if (controller.signal.aborted) return;
                setCatalog(result);
                setError(null);
                const saved = readCheckoutDraft();
                if (saved) {
                    setDraft(saved);
                    setCustomer(saved.customer);
                    setCount(saved.count);
                }
            } catch (requestError) {
                if (!controller.signal.aborted) setError(requestError);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        void load();
        return () => controller.abort();
    }, [reload]);

    const available = softwareStoreEnabled && catalog?.enabled === true;
    const selectedPackage = catalog?.packages.find((item) => item.count === count);
    const lastOrder = draft?.orderId ? getReceiptPath({ orderId: draft.orderId, token: draft.token }) : null;
    const reconciliationRequired = draft?.reconciliationRequired === true;

    function updateCustomer(field: keyof StoreCustomer, value: string) {
        setCustomer((current) => ({ ...current, [field]: value }));
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (paymentInFlight.current || !available || !selectedPackage || !event.currentTarget.reportValidity()) return;
        const normalized: StoreCustomer = {
            name: customer.name.trim(), email: customer.email.trim().toLowerCase(), mobile: customer.mobile.trim(),
            instagram: customer.instagram.trim(), os: customer.os, source: customer.source,
        };
        setReview({ customer: normalized, count, amount: selectedPackage.price });
    }

    async function confirmPayment() {
        if (!review || paymentInFlight.current || !available) return;
        paymentInFlight.current = true;
        setSubmitting(true);
        setError(null);
        setStorageError(false);
        const normalized = review.customer;
        const count = review.count as LicenseCount;
        setReview(null);
        let nextDraft: CheckoutDraft;
        try {
            const previous = draft || readCheckoutDraft();
            const samePurchase = previous?.count === count && JSON.stringify(previous.customer) === JSON.stringify(normalized);
            const superseded = previous?.supersededCheckout || (previous?.submitted || previous?.orderId ? {
                customer: previous.customer, count: previous.count, token: previous.token, orderId: previous.orderId,
            } : undefined);
            nextDraft = samePurchase ? previous! : {
                customer: normalized, count, token: createCheckoutToken(),
                ...(superseded ? { supersedesToken: superseded.token, supersededCheckout: superseded } : {}),
            };
            nextDraft = { ...nextDraft, submitted: true };
            saveCheckoutDraft(nextDraft);
        } catch {
            setStorageError(true);
            setSubmitting(false);
            paymentInFlight.current = false;
            return;
        }
        setDraft(nextDraft);
        try {
            const result = await storeRequest<StoreCheckoutResponse>({ action: "checkout", customer: normalized, count, ...(nextDraft.supersedesToken ? { supersedesToken: nextDraft.supersedesToken } : {}) }, nextDraft.token);
            const returnedAccess = receiptAccessFromUrl(result.receiptUrl);
            if (!returnedAccess || returnedAccess.orderId !== result.orderId || ![nextDraft.token, nextDraft.supersedesToken].includes(returnedAccess.token)) throw new Error("Invalid receipt access");
            const access = returnedAccess;
            saveReceiptAccess(access);
            const savedDraft: CheckoutDraft = access.token === nextDraft.token ? {
                ...nextDraft, token: access.token, orderId: result.orderId, supersedesToken: undefined, supersededCheckout: undefined, reconciliationRequired: false,
            } : {
                ...nextDraft.supersededCheckout!, token: access.token, orderId: result.orderId, submitted: true, reconciliationRequired: false,
            };
            saveCheckoutDraft(savedDraft);
            setDraft(savedDraft);
            if (["fulfilled", "verifying", "awaiting_stock"].includes(result.status)) {
                window.location.assign(getReceiptPath(access));
                return;
            }
            const paymentUrl = safeStoreUrl(result.checkoutUrl);
            if (!paymentUrl) throw new Error("Invalid payment URL");
            window.location.assign(paymentUrl);
        } catch (requestError) {
            const uncertain = !(requestError instanceof StoreApiError) || requestError.code === "payment_pending_reconciliation" || requestError.code === "payment_redirect_unsupported" || (requestError.status >= 500 && !["checkout_disabled", "payment_unavailable"].includes(requestError.code));
            if (uncertain) {
                const recoverable = { ...nextDraft, reconciliationRequired: true };
                try { saveCheckoutDraft(recoverable); } catch { /* The in-memory token still allows a safe retry. */ }
                setDraft(recoverable);
            }
            setError(requestError);
            setSubmitting(false);
            paymentInFlight.current = false;
        }
    }

    return (
        <SoftwareStoreShell title={copy.checkoutTitle} description={copy.checkoutDescription}>
            <CheckoutReviewDialog review={review} busy={submitting} onCancel={() => setReview(null)} onConfirm={() => void confirmPayment()} />
            {loading ? <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{copy.loading}</p> : !available ? (
                <div className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6">
                    <p className="text-sm leading-7 text-muted-foreground">{copy.unavailable}</p>
                    {error !== null && <StoreErrorNotice>{getStoreError(error, locale)}</StoreErrorNotice>}
                    <div className="flex flex-wrap gap-3"><Button asChild><a href="https://ryaneko.myr.id/pl/raw-file-copy-tool" rel="noreferrer">{copy.buyMayar}</a></Button>{error !== null && <Button variant="outline" onClick={() => { setLoading(true); setReload((value) => value + 1); }}>{copy.retry}</Button>}</div>
                </div>
            ) : (
                <form onSubmit={(event) => void submit(event)} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <fieldset disabled={submitting || reconciliationRequired} className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                        <legend className="sr-only">{copy.buyerDetails}</legend>
                        <h2 className="text-lg font-semibold">{copy.buyerDetails}</h2>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">{copy.required}</p>
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <label className="text-sm font-medium sm:col-span-2" htmlFor="store-name">{copy.name}<input id="store-name" name="name" autoComplete="name" required minLength={2} maxLength={120} value={customer.name} onChange={(event) => updateCustomer("name", event.target.value)} className={inputClassName} /></label>
                            <label className="text-sm font-medium sm:col-span-2" htmlFor="store-email"><span className="inline-flex items-center gap-2"><Mail aria-hidden="true" className="h-4 w-4" />{copy.email}</span><input id="store-email" name="email" type="email" autoComplete="email" required maxLength={254} value={customer.email} onChange={(event) => updateCustomer("email", event.target.value)} className={inputClassName} aria-describedby="store-email-help" /><span id="store-email-help" className="mt-2 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-normal leading-5 text-amber-900 dark:text-amber-100"><AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{reviewCopy.emailWarning}</span></label>
                            <label className="text-sm font-medium" htmlFor="store-mobile">{copy.mobile}<input id="store-mobile" name="mobile" type="tel" autoComplete="tel" required minLength={8} maxLength={24} pattern="[+0-9 \(\)\-]{8,24}" value={customer.mobile} onChange={(event) => updateCustomer("mobile", event.target.value)} className={inputClassName} aria-describedby="store-mobile-help" /><span id="store-mobile-help" className="mt-2 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs font-normal leading-5 text-amber-900 dark:text-amber-100"><AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{reviewCopy.phoneWarning}</span></label>
                            <label className="text-sm font-medium" htmlFor="store-instagram">{copy.instagram}<input id="store-instagram" name="instagram" autoComplete="off" required maxLength={31} pattern="@?[A-Za-z0-9._]{1,30}" value={customer.instagram} onChange={(event) => updateCustomer("instagram", event.target.value)} className={inputClassName} aria-describedby="store-instagram-help" /><span id="store-instagram-help" className="mt-2 block text-xs font-normal leading-5 text-muted-foreground">{copy.instagramHelp}</span></label>
                            <label className="text-sm font-medium" htmlFor="store-os">{copy.os}<select id="store-os" name="os" required value={customer.os} onChange={(event) => updateCustomer("os", event.target.value)} className={inputClassName}><option value="">{copy.select}</option>{catalog.osOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
                            <label className="text-sm font-medium" htmlFor="store-source">{copy.source}<select id="store-source" name="source" required value={customer.source} onChange={(event) => updateCustomer("source", event.target.value)} className={inputClassName}><option value="">{copy.select}</option>{catalog.sources.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
                        </div>
                    </fieldset>
                    <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                        <fieldset disabled={submitting || reconciliationRequired}>
                            <legend className="mb-4 text-lg font-semibold">{copy.packages}</legend>
                            <div className="space-y-3">{catalog.packages.map((item) => (
                                <label key={item.count} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${item.count === count ? "border-emerald-500 bg-emerald-500/10" : "border-border hover:bg-muted/40"}`}>
                                    <input type="radio" name="count" value={item.count} checked={item.count === count} onChange={() => setCount(item.count)} className="h-4 w-4 accent-emerald-600" required />
                                    <span className="flex-1 text-sm font-semibold">{item.count} {copy.device}</span><span className="text-sm font-medium">{storeMoney(item.price, locale)}</span>
                                </label>
                            ))}</div>
                        </fieldset>
                        <div className="flex items-center justify-between gap-2 border-t border-border pt-4"><span className="text-sm text-muted-foreground">{copy.total}</span><span className="text-lg font-bold">{storeMoney(selectedPackage?.price ?? null, locale)}</span></div>
                        {error !== null && <StoreErrorNotice>{getStoreError(error, locale)}</StoreErrorNotice>}
                        {storageError && <StoreErrorNotice>{copy.storageError}</StoreErrorNotice>}
                        {reconciliationRequired && <p className="text-xs leading-6 text-muted-foreground">{locale === "id" ? "Pembayaran sebelumnya sedang diperiksa. Coba lagi dengan data dan paket yang sama." : "Your previous payment is being checked. Retry with the same details and package."}</p>}
                        <Button type="submit" size="lg" disabled={submitting || !selectedPackage} className="w-full">{submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}{submitting ? copy.paying : copy.pay}</Button>
                        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" />{copy.paymentProvider}</p>
                        <p className="text-xs leading-6 text-muted-foreground">{copy.resumeHint}</p>
                        {lastOrder && <Link href={lastOrder} className="block text-center text-sm font-medium underline underline-offset-4">{copy.lastOrder}</Link>}
                    </div>
                </form>
            )}
        </SoftwareStoreShell>
    );
}
