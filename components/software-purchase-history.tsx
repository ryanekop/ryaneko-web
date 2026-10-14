"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, History, Loader2, Mail, MailSearch, PencilLine, RefreshCw } from "lucide-react";

import { SoftwareReceiptCard, SoftwareStoreShell, StoreErrorNotice } from "@/components/software-order-receipt";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getStoreCopy, getStoreError, getStoreStatusCopy, getUnknownPaymentCopy } from "@/lib/software-store-i18n";
import { clearHistorySession, readHistorySession, saveHistorySession, StoreApiError, storeDate, storeMoney, storeRequest, type StoreHistoryResponse, type StoreHistorySession, type StoreOrderSummary, type StoreReceipt } from "@/lib/software-store";

const inputClassName = "mt-2 w-full rounded-xl border border-input bg-background px-3 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

export function SoftwarePurchaseHistory() {
    const { locale } = useI18n();
    const copy = getStoreCopy(locale);
    const [booting, setBooting] = useState(true);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [requested, setRequested] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [session, setSession] = useState<StoreHistorySession | null>(null);
    const [history, setHistory] = useState<StoreHistoryResponse | null>(null);
    const [receipt, setReceipt] = useState<StoreReceipt | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<StoreOrderSummary | null>(null);
    const [busy, setBusy] = useState<"otp" | "verify" | "history" | "detail" | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [sessionExpired, setSessionExpired] = useState(false);
    const controllerRef = useRef<AbortController | null>(null);
    const cooldownActive = remaining > 0;

    useEffect(() => {
        const controller = new AbortController();
        controllerRef.current = controller;
        async function restore() {
            const saved = await Promise.resolve(readHistorySession());
            if (controller.signal.aborted) return;
            if (!saved) { setBooting(false); return; }
            setSession(saved);
            setEmail(saved.email);
            try {
                const result = await storeRequest<StoreHistoryResponse>({ action: "history", page: 1 }, saved.token, controller.signal);
                if (!controller.signal.aborted) setHistory(result);
            } catch (requestError) {
                if (controller.signal.aborted) return;
                if (requestError instanceof StoreApiError && requestError.status === 401) {
                    clearHistorySession(); setSession(null); setSessionExpired(true);
                } else setError(requestError);
            } finally {
                if (!controller.signal.aborted) setBooting(false);
            }
        }
        void restore();
        return () => controllerRef.current?.abort();
    }, []);

    useEffect(() => {
        if (!cooldownActive) return;
        const interval = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
        return () => window.clearInterval(interval);
    }, [cooldownActive]);

    useEffect(() => {
        if (!session) return;
        const timeout = window.setTimeout(() => {
            controllerRef.current?.abort();
            clearHistorySession(); setSession(null); setHistory(null); setReceipt(null); setSelectedOrder(null); setCode(""); setRequested(false); setBusy(null); setSessionExpired(true);
        }, Math.max(0, Date.parse(session.expiresAt) - Date.now()));
        return () => window.clearTimeout(timeout);
    }, [session]);

    function beginRequest() {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        return controller;
    }

    function endSession(expired = false) {
        controllerRef.current?.abort();
        clearHistorySession(); setSession(null); setHistory(null); setReceipt(null); setSelectedOrder(null); setCode(""); setRequested(false); setBusy(null); setError(null); setSessionExpired(expired);
    }

    async function requestOtp(event?: FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        if (busy || remaining > 0) return;
        const controller = beginRequest();
        const normalizedEmail = email.trim().toLowerCase();
        setBusy("otp"); setError(null); setSessionExpired(false);
        try {
            const result = await storeRequest<{ message: string; cooldownSeconds: number }>({ action: "otp-request", email: normalizedEmail }, undefined, controller.signal);
            if (controller.signal.aborted) return;
            setEmail(normalizedEmail); setRequested(true); setCode(""); setRemaining(Math.max(60, result.cooldownSeconds || 60));
        } catch (requestError) {
            if (controller.signal.aborted) return;
            setError(requestError);
            if (requestError instanceof StoreApiError && requestError.status === 429) setRemaining(Math.max(60, requestError.retryAfterSeconds || 60));
        } finally {
            if (!controller.signal.aborted) setBusy(null);
        }
    }

    async function verifyOtp(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (busy || !/^[0-9]{6}$/.test(code)) return;
        const controller = beginRequest();
        let verified = false;
        setBusy("verify"); setError(null);
        try {
            const result = await storeRequest<{ sessionToken: string; expiresAt: string }>({ action: "otp-verify", email, code }, undefined, controller.signal);
            if (controller.signal.aborted) return;
            const nextSession = { email, token: result.sessionToken, expiresAt: result.expiresAt };
            try { saveHistorySession(nextSession); } catch { /* History remains usable in memory when session storage is unavailable. */ }
            setSession(nextSession); setCode(""); setRequested(false); setSessionExpired(false);
            verified = true;
            const data = await storeRequest<StoreHistoryResponse>({ action: "history", page: 1 }, nextSession.token, controller.signal);
            if (!controller.signal.aborted) setHistory(data);
        } catch (requestError) {
            if (controller.signal.aborted) return;
            if (verified && requestError instanceof StoreApiError && requestError.status === 401) endSession(true);
            else setError(requestError);
        } finally {
            if (!controller.signal.aborted) setBusy(null);
        }
    }

    async function loadPage(page: number) {
        if (!session || busy) return;
        const controller = beginRequest();
        setBusy("history"); setError(null);
        try {
            const result = await storeRequest<StoreHistoryResponse>({ action: "history", page }, session.token, controller.signal);
            if (!controller.signal.aborted) { setHistory(result); setReceipt(null); setSelectedOrder(null); }
        } catch (requestError) {
            if (controller.signal.aborted) return;
            if (requestError instanceof StoreApiError && requestError.status === 401) endSession(true);
            else setError(requestError);
        } finally {
            if (!controller.signal.aborted) setBusy(null);
        }
    }

    async function viewOrder(order: StoreOrderSummary) {
        if (!session || busy) return;
        const controller = beginRequest();
        setBusy("detail"); setError(null);
        try {
            const result = await storeRequest<StoreReceipt>({ action: "detail", ...(order.kind === "legacy" ? { purchaseId: order.id } : { orderId: order.id }) }, session.token, controller.signal);
            if (!controller.signal.aborted) { setReceipt(result); setSelectedOrder(order); }
        } catch (requestError) {
            if (controller.signal.aborted) return;
            if (requestError instanceof StoreApiError && requestError.status === 401) endSession(true);
            else setError(requestError);
        } finally {
            if (!controller.signal.aborted) setBusy(null);
        }
    }

    return (
        <SoftwareStoreShell title={copy.history} titleIcon={<History aria-hidden="true" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />} description={!session ? copy.historyDescription : undefined}>
            <div className="mx-auto max-w-2xl space-y-4">
                {sessionExpired && <StoreErrorNotice>{copy.sessionExpired}</StoreErrorNotice>}
                {error !== null && <StoreErrorNotice>{getStoreError(error, locale)}</StoreErrorNotice>}
                {booting ? <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{copy.loading}</p> : !session ? (
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                        {!requested ? <form onSubmit={(event) => void requestOtp(event)} className="space-y-5">
                            <label className="block text-sm font-medium" htmlFor="history-email"><span className="flex items-center gap-2"><Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" />{copy.email}</span><input id="history-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy !== null} className={inputClassName} /></label>
                            <Button type="submit" size="lg" className="w-full" disabled={busy !== null || remaining > 0}>{busy === "otp" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{busy === "otp" ? copy.sending : remaining > 0 ? `${copy.resendWait} ${remaining} ${copy.seconds}` : copy.requestOtp}</Button>
                        </form> : <div>
                            <h2 className="flex items-center gap-2 text-lg font-semibold"><Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" />{copy.otpTitle}</h2>
                            <p className="mt-2 break-all text-sm font-medium">{email}</p>
                            <div className="mt-3 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-100">
                                <MailSearch aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold leading-6">{copy.otpHelpTitle}</h3>
                                    <p className="mt-1 text-sm leading-6">{copy.otpDescription}</p>
                                </div>
                            </div>
                            <form onSubmit={(event) => void verifyOtp(event)} className="mt-5 space-y-4">
                                <label className="block text-sm font-medium" htmlFor="history-otp">{copy.otp}<input id="history-otp" name="code" type="text" inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6}" minLength={6} maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, ""))} disabled={busy !== null} className={`${inputClassName} text-center font-mono text-2xl tracking-[0.4em]`} /></label>
                                <Button type="submit" size="lg" className="w-full" disabled={busy !== null || code.length !== 6}>{busy === "verify" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{busy === "verify" ? copy.verifying : copy.verify}</Button>
                            </form>
                            <div className="mt-4 flex flex-wrap justify-between gap-2">
                                <Button type="button" variant="ghost" className="gap-2" disabled={busy !== null || remaining > 0} onClick={() => void requestOtp()}><RefreshCw aria-hidden="true" className="h-4 w-4 shrink-0" />{remaining > 0 ? `${copy.resendWait} ${remaining} ${copy.seconds}` : copy.resend}</Button>
                                <Button type="button" variant="ghost" className="gap-2" disabled={busy !== null} onClick={() => { setRequested(false); setCode(""); setError(null); }}><PencilLine aria-hidden="true" className="h-4 w-4 shrink-0" />{copy.changeEmail}</Button>
                            </div>
                        </div>}
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4"><div className="min-w-0"><p className="break-all text-sm font-semibold">{session.email}</p><p className="mt-1 max-w-md text-xs leading-6 text-muted-foreground">{copy.sessionNote}</p></div><Button type="button" variant="outline" size="sm" onClick={() => endSession()}>{copy.logout}</Button></div>
                        {receipt ? <div className="space-y-4">
                            <Button type="button" variant="ghost" onClick={() => { setReceipt(null); setSelectedOrder(null); setError(null); }} disabled={busy !== null}><ArrowLeft className="mr-2 h-4 w-4" />{copy.backHistory}</Button>
                            <SoftwareReceiptCard receipt={receipt} />
                            {receipt.status !== "fulfilled" && selectedOrder && <Button type="button" variant="outline" disabled={busy !== null} onClick={() => void viewOrder(selectedOrder)}><RefreshCw className={`mr-2 h-4 w-4 ${busy === "detail" ? "animate-spin" : ""}`} />{busy === "detail" ? copy.checking : copy.checkAgain}</Button>}
                        </div> : <div className="space-y-4">
                            {busy !== null && <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{copy.loading}</p>}
                            {!history && busy === null && <Button type="button" variant="outline" onClick={() => void loadPage(1)}>{copy.retry}</Button>}
                            {history?.orders.length === 0 && <p className="rounded-2xl border border-border bg-card p-6 text-sm leading-7 text-muted-foreground">{copy.emptyHistory}</p>}
                            {history?.orders.map((order) => <article key={`${order.kind}-${order.id}`} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-semibold">{order.productName}</h2><span className={`rounded-full px-3 py-1 text-xs font-medium ${order.status === "fulfilled" && order.paymentStatusKnown !== false ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200" : "bg-muted text-muted-foreground"}`}>{order.paymentStatusKnown === false ? getUnknownPaymentCopy(locale).label : getStoreStatusCopy(order.status, locale).label}</span></div>
                                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"><span>{storeDate(order.createdAt, locale)}</span><span>{order.count} {copy.device}</span><span>{storeMoney(order.amount, locale)}</span></div>
                                <Button type="button" variant="outline" size="sm" className="mt-4" disabled={busy !== null} onClick={() => void viewOrder(order)}>{copy.viewOrder}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </article>)}
                            {history && (history.page > 1 || history.hasMore) && <div className="flex items-center justify-between gap-3"><Button type="button" variant="outline" size="sm" disabled={busy !== null || history.page <= 1} onClick={() => void loadPage(history.page - 1)}>{copy.previous}</Button><span className="text-xs text-muted-foreground">{copy.page} {history.page}</span><Button type="button" variant="outline" size="sm" disabled={busy !== null || !history.hasMore} onClick={() => void loadPage(history.page + 1)}>{copy.next}</Button></div>}
                        </div>}
                    </div>
                )}
            </div>
        </SoftwareStoreShell>
    );
}
