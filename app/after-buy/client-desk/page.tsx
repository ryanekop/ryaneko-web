import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Client Desk Purchase Complete | Ryan Eko Apps",
    description:
        "Your Client Desk purchase is complete. Continue to your package page.",
};

export default function AfterBuyClientDeskPage() {
    return <PurchaseNoticePage variant="clientDesk" />;
}
