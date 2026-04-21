import { Boxes, BriefcaseBusiness, Download, Sparkles } from "lucide-react";

export type PurchaseNoticeVariant =
    | "fastpik"
    | "clientDesk"
    | "bundle"
    | "rawFileCopyTool";

export const purchaseNoticeConfig = {
    fastpik: {
        icon: Sparkles,
        panelClassName:
            "border-emerald-500/20 bg-emerald-500/8 text-emerald-700 dark:text-emerald-300",
        iconClassName:
            "bg-emerald-500/12 text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-300",
    },
    clientDesk: {
        icon: BriefcaseBusiness,
        panelClassName:
            "border-sky-500/20 bg-sky-500/8 text-sky-700 dark:text-sky-300",
        iconClassName:
            "bg-sky-500/12 text-sky-700 dark:bg-sky-400/12 dark:text-sky-300",
    },
    bundle: {
        icon: Boxes,
        panelClassName:
            "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        iconClassName:
            "bg-amber-500/15 text-amber-700 dark:bg-amber-400/12 dark:text-amber-300",
    },
    rawFileCopyTool: {
        icon: Download,
        imageSrc: "/raw-file-copy-tool.png",
        imageAlt: "RAW File Copy Tool",
        panelClassName:
            "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
        iconClassName:
            "bg-orange-500/12 text-orange-700 dark:bg-orange-400/12 dark:text-orange-300",
    },
} as const;
