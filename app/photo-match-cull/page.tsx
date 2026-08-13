import type { Metadata } from "next";

import { PhotoMatchCullMarketing } from "@/components/photo-match-cull-marketing";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";

const title = "Photo Match & Cull | RAW/JPEG Workflow for iPhone and iPad";
const description = "Match selected JPEG filenames with RAW files, copy or move matching files, and organize photos into multiple folders directly on iPhone and iPad.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${photoMatchCullConfig.siteUrl}/photo-match-cull` },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${photoMatchCullConfig.siteUrl}/photo-match-cull`,
    siteName: "Ryan Eko Apps",
    images: [{ url: `${photoMatchCullConfig.siteUrl}/photo-match-cull-og.png`, width: 1536, height: 1024, alt: "Photo Match & Cull for iPhone and iPad" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${photoMatchCullConfig.siteUrl}/photo-match-cull-og.png`] },
};

export default function PhotoMatchCullPage() {
  return <PhotoMatchCullMarketing />;
}
