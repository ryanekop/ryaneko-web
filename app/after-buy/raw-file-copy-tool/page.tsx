import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Your Purchase | RAW File Copy Tool",
    description:
        "View your RAW File Copy Tool purchase, download, and serial numbers, or find your purchase email.",
    robots: { index: false, follow: false },
    referrer: "no-referrer",
};

export default function AfterBuyRawFileCopyToolPage() {
    return <PurchaseNoticePage variant="rawFileCopyTool" />;
}
