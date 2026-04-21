import type { Metadata } from "next";

import { PurchaseNoticePage } from "@/components/purchase-notice-page";

export const metadata: Metadata = {
    title: "Client Desk Purchase Info | Ryan Eko Apps",
    description:
        "Instructions for new Client Desk buyers after completing a Mayar purchase.",
};

export default function AfterBuyClientDeskPage() {
    return <PurchaseNoticePage variant="clientDesk" />;
}
