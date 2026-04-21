import type { Metadata } from "next";

import { RawFileCopyToolPage } from "@/components/raw-file-copy-tool-page";

export const metadata: Metadata = {
    title: "RAW File Copy Tool | Ryan Eko Apps",
    description:
        "Filter JPEG and RAW files based on text input, then copy or move the matched results across macOS, Windows, and Android.",
};

export default function RawFileCopyToolLandingPage() {
    return <RawFileCopyToolPage />;
}
