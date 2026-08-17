import type { Metadata } from "next";

import { LinksLandingPage } from "@/components/links-landing-page";

export const metadata: Metadata = {
  title: "Link Ryan Eko Apps",
  description:
    "Order aplikasi, download update, dan temukan kanal resmi Ryan Eko Apps.",
  openGraph: {
    title: "Ryan Eko Apps",
    description: "Mempermudah workflow fotografer dan videografer 🚀",
    images: ["https://ryanekoapp.web.id/links-ryaneko-logo.webp"],
  },
};

export default function LinksPage() {
  return <LinksLandingPage />;
}
