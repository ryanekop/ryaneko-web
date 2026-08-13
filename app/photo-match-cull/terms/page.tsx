import type { Metadata } from "next";

import { PhotoMatchCullLegalPage } from "@/components/photo-match-cull-info";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";

export const metadata: Metadata = {
  title: "Photo Match & Cull Terms & Conditions | Ryan Eko Apps",
  description: "Terms and conditions for using Photo Match & Cull.",
  alternates: { canonical: `${photoMatchCullConfig.siteUrl}/photo-match-cull/terms` },
};

export default function PhotoMatchCullTermsPage() {
  return <PhotoMatchCullLegalPage kind="terms" />;
}
