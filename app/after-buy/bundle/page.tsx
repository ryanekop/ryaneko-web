import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Bundle Purchase Info | Ryan Eko Apps",
    description:
        "Instructions for new Client Desk & Fastpik bundle buyers after completing a purchase.",
};

export default function AfterBuyBundlePage() {
    return <PurchaseNoticePage variant="bundle" />;
}
