import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "RAW File Copy Tool Purchase Info | Ryan Eko Apps",
    description:
        "Instructions for RAW File Copy Tool buyers after completing a purchase.",
};

export default function AfterBuyRawFileCopyToolPage() {
    return <PurchaseNoticePage variant="rawFileCopyTool" />;
}
