import type { Metadata } from "next";
import { SoftwarePurchaseHistory } from "@/components/software-purchase-history";

export const metadata: Metadata = {
    title: "Purchase History | Ryan Eko Apps",
    description: "Find your RAW File Copy Tool purchases, downloads, and serials using your purchase email.",
    robots: { index: false, follow: false },
    referrer: "no-referrer",
};

export default function PurchaseHistoryPage() {
    return <SoftwarePurchaseHistory />;
}
