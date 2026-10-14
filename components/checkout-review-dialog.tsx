"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getStoreCopy, getCheckoutReviewCopy } from "@/lib/software-store-i18n";
import { storeMoney, type StoreCustomer } from "@/lib/software-store";

export interface CheckoutReview {
    customer: StoreCustomer;
    count: number;
    amount: number;
}

export function CheckoutReviewDialog({ review, busy, onCancel, onConfirm }: {
    review: CheckoutReview | null;
    busy: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const { locale } = useI18n();
    const copy = getStoreCopy(locale);
    const text = getCheckoutReviewCopy(locale);
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog || !review) return;
        const previousFocus = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus();
        };
    }, [review]);

    return <dialog ref={ref} aria-labelledby="checkout-review-title" aria-describedby="checkout-review-description"
        onCancel={(event) => { event.preventDefault(); if (!busy) onCancel(); }}
        onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-5 text-foreground shadow-xl backdrop:bg-black/50 sm:p-6">
        {review && <>
            <h2 id="checkout-review-title" className="text-xl font-bold">{text.title}</h2>
            <p id="checkout-review-description" className="mt-3 flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm leading-6 text-amber-900 dark:text-amber-100">
                <AlertTriangle aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />{text.reminder}
            </p>
            <dl className="my-5 space-y-4 text-sm">
                <div><dt className="flex items-center gap-2 text-muted-foreground"><Mail aria-hidden="true" className="h-4 w-4" />{copy.email}</dt><dd className="mt-1 break-all font-semibold">{review.customer.email}</dd></div>
                <div><dt className="flex items-center gap-2 text-muted-foreground"><Phone aria-hidden="true" className="h-4 w-4" />{copy.mobile}</dt><dd className="mt-1 break-all font-semibold">{review.customer.mobile}</dd></div>
                <div><dt className="text-muted-foreground">{copy.name}</dt><dd className="mt-1 break-words font-medium">{review.customer.name}</dd></div>
                <div><dt className="text-muted-foreground">{copy.os}</dt><dd className="mt-1 font-medium">{review.customer.os}</dd></div>
                <div className="flex justify-between gap-3 border-t border-border pt-4"><dt>{review.count} {copy.device}</dt><dd className="font-bold">{storeMoney(review.amount, locale)}</dd></div>
            </dl>
            <div className="flex flex-col gap-3 sm:flex-row">
                <Button autoFocus type="button" variant="outline" disabled={busy} onClick={onCancel} className="h-auto min-h-11 whitespace-normal">{text.edit}</Button>
                <Button type="button" disabled={busy} onClick={onConfirm} className="h-auto min-h-11 whitespace-normal">{busy ? copy.paying : text.confirm}</Button>
            </div>
        </>}
    </dialog>;
}
