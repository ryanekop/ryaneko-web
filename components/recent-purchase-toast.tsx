"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StoreToast } from "@/components/store-toast";
import { useI18n } from "@/lib/i18n";
import { getRecentPurchases, storeMoney, type RecentPurchase } from "@/lib/software-store";

const hour = 60 * 60 * 1000;
const seenKey = "raw-purchase-toast-seen";

export function RecentPurchaseToast({ paused }: { paused: boolean }) {
    const { locale } = useI18n();
    const [current, setCurrent] = useState<RecentPurchase | null>(null);
    const purchases = useRef<RecentPurchase[]>([]);
    const seen = useRef(new Set<string>());
    const nextDisplay = useRef(0);
    const toastInFlight = useRef(false);
    const hideTimer = useRef<number | undefined>(undefined);

    const closeCurrent = useCallback(() => {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = undefined;
        setCurrent(null);
    }, []);

    function exitComplete() {
        if (!toastInFlight.current) return;
        toastInFlight.current = false;
        nextDisplay.current = Date.now() + 10000;
    }

    useEffect(() => {
        try {
            const saved: unknown = JSON.parse(window.sessionStorage.getItem(seenKey) || "[]");
            if (Array.isArray(saved)) seen.current = new Set(saved.filter((item): item is string => typeof item === "string"));
        } catch { /* Toasts still work when session storage is unavailable. */ }
        nextDisplay.current = Date.now() + 8000;
        const controller = new AbortController();
        let refreshTimer: number | undefined;
        let refreshAt = 0;
        let loading = false;
        async function refresh() {
            if (document.hidden || loading || controller.signal.aborted) return;
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
            if (!document.hidden) refreshTimer = window.setTimeout(() => void refresh(), Math.max(1000, refreshAt - Date.now()));
        }
        function visibilityChanged() {
            if (document.hidden) window.clearTimeout(refreshTimer);
            else if (Date.now() >= refreshAt) void refresh();
            else scheduleRefresh();
        }
        void refresh();
        document.addEventListener("visibilitychange", visibilityChanged);
        return () => {
            controller.abort();
            window.clearTimeout(refreshTimer);
            document.removeEventListener("visibilitychange", visibilityChanged);
        };
    }, []);

    useEffect(() => {
        const tick = window.setInterval(() => {
            if (paused || document.hidden || toastInFlight.current) return;
            if (Date.now() < nextDisplay.current) return;
            const purchase = purchases.current.find((item) => !seen.current.has(item.id));
            if (!purchase) return;
            seen.current.add(purchase.id);
            try { window.sessionStorage.setItem(seenKey, JSON.stringify([...seen.current].slice(-500))); } catch { /* In-memory deduplication remains available. */ }
            toastInFlight.current = true;
            setCurrent(purchase);
            window.clearTimeout(hideTimer.current);
            hideTimer.current = window.setTimeout(closeCurrent, 6000);
        }, 250);
        // Hide an interrupted toast before resuming, so its display timer cannot become orphaned.
        function hide() { closeCurrent(); }
        const resetTimer = window.setTimeout(hide, 0);
        document.addEventListener("visibilitychange", hide);
        return () => {
            window.clearInterval(tick);
            window.clearTimeout(hideTimer.current);
            window.clearTimeout(resetTimer);
            document.removeEventListener("visibilitychange", hide);
        };
    }, [paused, closeCurrent]);

    return <AnimatePresence onExitComplete={exitComplete}>{current && !paused && <StoreToast key="purchase-toast" tone="purchase" verification="Transaction Verified by Mayar.ID" onClose={closeCurrent} closeLabel={locale === "id" ? "Tutup notifikasi ini" : "Dismiss this notification"}>
        {locale === "id"
            ? `${current.name} (${current.email}) baru saja membeli Produk ${current.productName}, senilai ${storeMoney(current.amount, locale)}`
            : `${current.name} (${current.email}) just purchased ${current.productName} for ${storeMoney(current.amount, locale)}`}
    </StoreToast>}</AnimatePresence>;
}
