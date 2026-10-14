"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StoreToast } from "@/components/store-toast";
import { useI18n } from "@/lib/i18n";
import { getRecentPurchases, storeMoney, type RecentPurchase } from "@/lib/software-store";

const hour = 60 * 60 * 1000;
const dismissedKey = "raw-purchase-toast-dismissed";
const seenKey = "raw-purchase-toast-seen";

export function RecentPurchaseToast({ paused }: { paused: boolean }) {
    const { locale } = useI18n();
    const [current, setCurrent] = useState<RecentPurchase | null>(null);
    const purchases = useRef<RecentPurchase[]>([]);
    const seen = useRef(new Set<string>());
    const dismissed = useRef(false);
    const nextDisplay = useRef(0);

    useEffect(() => {
        try {
            dismissed.current = window.sessionStorage.getItem(dismissedKey) === "true";
            const saved: unknown = JSON.parse(window.sessionStorage.getItem(seenKey) || "[]");
            if (Array.isArray(saved)) seen.current = new Set(saved.filter((item): item is string => typeof item === "string"));
        } catch { /* Toasts still work when session storage is unavailable. */ }
        nextDisplay.current = Date.now() + 8000;
        const controller = new AbortController();
        let refreshTimer: number | undefined;
        let refreshAt = 0;
        let loading = false;
        async function refresh() {
            if (document.hidden || dismissed.current || loading || controller.signal.aborted) return;
            loading = true;
            try {
                const result = await getRecentPurchases(controller.signal);
                if (controller.signal.aborted) return;
                purchases.current = result.purchases;
                const requestedRefresh = Date.parse(result.refreshAfter);
                refreshAt = Number.isFinite(requestedRefresh) ? Math.max(Date.now() + 1000, requestedRefresh) : Date.now() + hour;
            } catch {
                refreshAt = Date.now() + hour;
            } finally {
                loading = false;
                if (!controller.signal.aborted) scheduleRefresh();
            }
        }
        function scheduleRefresh() {
            window.clearTimeout(refreshTimer);
            if (!document.hidden && !dismissed.current) refreshTimer = window.setTimeout(() => void refresh(), Math.max(1000, refreshAt - Date.now()));
        }
        function visibilityChanged() {
            if (document.hidden) window.clearTimeout(refreshTimer);
            else if (Date.now() >= refreshAt) void refresh();
            else scheduleRefresh();
        }
        if (!dismissed.current) void refresh();
        document.addEventListener("visibilitychange", visibilityChanged);
        return () => {
            controller.abort();
            window.clearTimeout(refreshTimer);
            document.removeEventListener("visibilitychange", visibilityChanged);
        };
    }, []);

    useEffect(() => {
        let hideTimer: number | undefined;
        const tick = window.setInterval(() => {
            if (paused || document.hidden || dismissed.current) return;
            if (Date.now() < nextDisplay.current) return;
            const purchase = purchases.current.find((item) => !seen.current.has(item.id));
            if (!purchase) return;
            seen.current.add(purchase.id);
            try { window.sessionStorage.setItem(seenKey, JSON.stringify([...seen.current].slice(-500))); } catch { /* In-memory deduplication remains available. */ }
            nextDisplay.current = Date.now() + 25000;
            setCurrent(purchase);
            window.clearTimeout(hideTimer);
            hideTimer = window.setTimeout(() => setCurrent(null), 6000);
        }, 250);
        // Hide an interrupted toast before resuming, so its display timer cannot become orphaned.
        function hide() { setCurrent(null); }
        const resetTimer = window.setTimeout(hide, 0);
        document.addEventListener("visibilitychange", hide);
        return () => {
            window.clearInterval(tick);
            window.clearTimeout(hideTimer);
            window.clearTimeout(resetTimer);
            document.removeEventListener("visibilitychange", hide);
        };
    }, [paused]);

    function dismiss() {
        dismissed.current = true;
        setCurrent(null);
        try { window.sessionStorage.setItem(dismissedKey, "true"); } catch { /* Dismissal still lasts while this page is mounted. */ }
    }

    return <AnimatePresence>{current && !paused && <StoreToast key="purchase-toast" tone="purchase" verification="Transaction Verified by Mayar.ID" onClose={dismiss} closeLabel={locale === "id" ? "Tutup notifikasi pembelian" : "Dismiss purchase notifications"}>
        {locale === "id"
            ? `${current.name} (${current.email}) baru saja membeli Produk ${current.productName}, senilai ${storeMoney(current.amount, locale)}`
            : `${current.name} (${current.email}) just purchased ${current.productName} for ${storeMoney(current.amount, locale)}`}
    </StoreToast>}</AnimatePresence>;
}
