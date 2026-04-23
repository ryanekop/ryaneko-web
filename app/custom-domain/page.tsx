import type { Metadata } from "next";

import { CustomDomainInfoPage } from "@/components/custom-domain-info-page";

export const metadata: Metadata = {
    title: "Custom Domain Info | Ryan Eko Apps",
    description:
        "Information about custom domain options, subdomain structure, and registration details for Fastpik and Client Desk clients.",
};

export default function CustomDomainPage() {
    return <CustomDomainInfoPage />;
}
