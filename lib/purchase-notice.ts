export type PurchaseNoticeVariant =
    | "fastpik"
    | "clientDesk"
    | "bundle"
    | "rawFileCopyTool";

export type PurchaseRedirectVariant = Exclude<PurchaseNoticeVariant, "rawFileCopyTool">;

const packageUrls = {
    fastpik: "https://fastpik.id/id/profile/package",
    clientDesk: "https://clientdesk.id/id/settings/account?section=package",
} as const;

export const purchaseRedirectConfig = {
    fastpik: {
        redirectUrl: packageUrls.fastpik,
        linkProducts: ["fastpik"],
    },
    clientDesk: {
        redirectUrl: packageUrls.clientDesk,
        linkProducts: ["clientDesk"],
    },
    bundle: {
        redirectUrl: packageUrls.clientDesk,
        linkProducts: ["clientDesk", "fastpik"],
    },
} as const satisfies Record<PurchaseRedirectVariant, {
    redirectUrl: string;
    linkProducts: readonly (keyof typeof packageUrls)[];
}>;

export { packageUrls };
