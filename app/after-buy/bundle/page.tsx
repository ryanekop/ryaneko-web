import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Bundle Purchase Complete | Ryan Eko Apps",
    description:
        "Your Client Desk and Fastpik bundle purchase is complete. Continue to your package pages.",
};

export default function AfterBuyBundlePage() {
    return <PurchaseNoticePage variant="bundle" />;
}
