import type { Metadata } from "next";
import { SoftwareCheckout } from "@/components/software-checkout";

export const metadata: Metadata = {
    title: "Checkout | RAW File Copy Tool",
    description: "Purchase RAW File Copy Tool and receive your download and serial numbers.",
    robots: { index: false, follow: false },
    referrer: "no-referrer",
};

export default function RawFileCopyCheckoutPage() {
    return <SoftwareCheckout />;
}
