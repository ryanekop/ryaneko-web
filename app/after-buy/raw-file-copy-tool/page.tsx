import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Check Your Email | RAW File Copy Tool",
    description:
        "Check your purchase email for the RAW File Copy Tool download link, serial number, and installation guide.",
};

export default function AfterBuyRawFileCopyToolPage() {
    return <PurchaseNoticePage variant="rawFileCopyTool" />;
}
