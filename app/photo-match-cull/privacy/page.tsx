import type { Metadata } from "next";

import { PhotoMatchCullLegalPage } from "@/components/photo-match-cull-info";
import { photoMatchCullConfig } from "@/lib/photo-match-cull";

export const metadata: Metadata = {
  title: "Photo Match & Cull Privacy Policy | Ryan Eko Apps",
  description: "Photo Match & Cull privacy policy covering local files, Google Drive, purchases, and user data.",
  alternates: { canonical: `${photoMatchCullConfig.siteUrl}/photo-match-cull/privacy` },
};

export default function PhotoMatchCullPrivacyPage() {
  return <PhotoMatchCullLegalPage kind="privacy" />;
}
