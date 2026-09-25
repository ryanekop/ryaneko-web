import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Fastpik Purchase Complete | Ryan Eko Apps",
    description:
        "Your Fastpik purchase is complete. Continue to your package page.",
};

export default function AfterBuyFastpikPage() {
    return <PurchaseNoticePage variant="fastpik" />;
}
