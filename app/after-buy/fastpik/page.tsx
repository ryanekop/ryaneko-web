import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Fastpik Purchase Info | Ryan Eko Apps",
    description:
        "Instructions for new Fastpik buyers after completing a Mayar purchase.",
};

export default function AfterBuyFastpikPage() {
    return <PurchaseNoticePage variant="fastpik" />;
}
