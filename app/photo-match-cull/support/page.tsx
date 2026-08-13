import type { Metadata } from "next";

import { PhotoMatchCullSupport } from "@/components/photo-match-cull-info";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";

export const metadata: Metadata = {
  title: "Photo Match & Cull Support | Ryan Eko Apps",
  description: "Find common solutions and contact Ryan Eko Apps for help with Photo Match & Cull.",
  alternates: { canonical: `${photoMatchCullConfig.siteUrl}/photo-match-cull/support` },
};

export default function PhotoMatchCullSupportPage() {
  return <PhotoMatchCullSupport />;
}
