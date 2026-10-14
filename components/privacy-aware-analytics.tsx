"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Links entering these pages use full navigation so an existing recorder cannot persist.
export function PrivacyAwareAnalytics({ websiteId }: { websiteId: string }) {
    const pathname = usePathname();
    if (pathname.startsWith("/checkout/") || pathname.startsWith("/purchase-history") ||
        pathname.startsWith("/after-buy/raw-file-copy-tool")) return null;
    return <>
        <Script defer src="https://umami.ryanekoapp.web.id/script.js" data-website-id={websiteId} strategy="afterInteractive" />
        <Script defer src="https://umami.ryanekoapp.web.id/recorder.js" data-website-id={websiteId}
            data-sample-rate="0.15" data-mask-level="moderate" data-max-duration="300000" strategy="afterInteractive" />
    </>;
}
