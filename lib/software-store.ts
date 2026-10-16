export type LicenseCount = 1 | 2 | 3;
export type StoreOrderStatus = "pending" | "verifying" | "fulfilled" | "expired" | "awaiting_stock" | "payment_error";

export interface StoreCustomer {
    name: string;
    email: string;
    mobile: string;
    instagram: string;
    os: string;
    deviceOs?: string[];
    source: string;
}

export interface StoreCatalog {
    enabled: boolean;
    packages: { count: LicenseCount; price: number }[];
    osOptions: string[];
    sources: string[];
}

export interface StoreOrderSummary {
    id: string;
    kind: "checkout" | "legacy";
    productName: string;
    createdAt: string;
    count: number;
    amount: number | null;
    status: StoreOrderStatus;
    os: string | null;
    deviceOs?: string[] | null;
    paymentStatusKnown?: boolean;
}

export interface StoreReceipt extends StoreOrderSummary {
    serials: string[];
    downloads: { label: string; url: string }[];
    checkoutUrl?: string | null;
}

interface CheckoutSelection {
    customer: StoreCustomer;
    count: LicenseCount;
    token: string;
    orderId?: string;
}

export interface CheckoutDraft extends CheckoutSelection {
    submitted?: boolean;
    supersedesToken?: string;
    supersededCheckout?: CheckoutSelection;
    reconciliationRequired?: boolean;
}

export interface ReceiptAccess {
    orderId: string;
    token: string;
}

export interface StoreHistorySession {
    email: string;
    token: string;
    expiresAt: string;
}

export interface StoreCheckoutResponse {
    orderId: string;
    checkoutUrl: string | null;
    receiptUrl: string;
    status: StoreOrderStatus;
    expiresAt: string;
}

export interface StoreHistoryResponse {
    orders: StoreOrderSummary[];
    hasMore: boolean;
    page: number;
}

export const softwareStoreEnabled = process.env.NEXT_PUBLIC_SOFTWARE_STORE_ENABLED === "true";
export const softwareStoreApiUrl = process.env.NEXT_PUBLIC_SOFTWARE_STORE_API_URL || "https://license.ryanekoapp.web.id/api/store";

export interface RecentPurchase {
    id: string;
    name: string;
    email: string;
    amount: number;
    productName: "RAW File Copy Tool";
}

export interface RecentPurchasesResponse {
    purchases: RecentPurchase[];
    refreshedAt: string | null;
    refreshAfter: string;
}

export async function getRecentPurchases(signal?: AbortSignal): Promise<RecentPurchasesResponse> {
    const response = await fetch(`${softwareStoreApiUrl.replace(/\/$/, "")}/recent-purchases`, { cache: "no-store", credentials: "omit", signal });
    const result = await readApiResponse<RecentPurchasesResponse>(response);
    if (!Array.isArray(result.purchases) || typeof result.refreshAfter !== "string") throw new Error("Invalid purchase feed");
    return {
        ...result,
        purchases: result.purchases.filter((item) => item && typeof item.id === "string" && typeof item.name === "string" && typeof item.email === "string" && item.productName === "RAW File Copy Tool" && Number.isFinite(item.amount) && item.amount > 0).slice(0, 20),
    };
}

const draftKey = "raw-file-copy-checkout-draft";
const receiptKey = "raw-file-copy-receipt-access";
const sessionKey = "raw-file-copy-history-session";
const tokenPattern = /^[A-Za-z0-9_-]{43}$/;
const orderIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class StoreApiError extends Error {
    constructor(public status: number, public code: string, public retryAfterSeconds?: number) {
        super(code);
        this.name = "StoreApiError";
    }
}

async function readApiResponse<T>(response: Response): Promise<T> {
    let payload: Record<string, unknown>;
    try {
        payload = await response.json();
    } catch {
        throw new StoreApiError(response.status, "invalid_response");
    }
    if (!response.ok) {
        throw new StoreApiError(
            response.status,
            typeof payload.code === "string" ? payload.code : "request_failed",
            typeof payload.retryAfterSeconds === "number" ? payload.retryAfterSeconds : undefined,
        );
    }
    return payload as T;
}

export async function getStoreCatalog(signal?: AbortSignal): Promise<StoreCatalog> {
    const response = await fetch(softwareStoreApiUrl, { cache: "no-store", credentials: "omit", signal });
    return readApiResponse<StoreCatalog>(response);
}

export async function storeRequest<T>(body: Record<string, unknown>, token?: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(softwareStoreApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(body),
        cache: "no-store",
        credentials: "omit",
        signal,
    });
    return readApiResponse<T>(response);
}

function readSessionStorage<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
        const value = window.sessionStorage.getItem(key);
        return value ? JSON.parse(value) as T : null;
    } catch {
        return null;
    }
}

function writeSessionStorage(key: string, value: unknown) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function createCheckoutToken(): string {
    const bytes = window.crypto.getRandomValues(new Uint8Array(32));
    return window.btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

export function readCheckoutDraft(): CheckoutDraft | null {
    const draft = readSessionStorage<CheckoutDraft>(draftKey);
    if (!draft || !tokenPattern.test(draft.token) || ![1, 2, 3].includes(draft.count)) return null;
    if (!draft.customer || ["name", "email", "mobile", "instagram", "os", "source"].some((key) => typeof draft.customer[key as keyof StoreCustomer] !== "string")) return null;
    if (draft.customer.deviceOs !== undefined && (!Array.isArray(draft.customer.deviceOs) || draft.customer.deviceOs.length !== draft.count || draft.customer.deviceOs.some((os) => typeof os !== "string"))) return null;
    return draft;
}

export function saveCheckoutDraft(draft: CheckoutDraft) {
    writeSessionStorage(draftKey, draft);
}

export function saveReceiptAccess(access: ReceiptAccess) {
    writeSessionStorage(receiptKey, access);
}

export function getReceiptPath(access: ReceiptAccess) {
    const fragment = new URLSearchParams({ orderId: access.orderId, token: access.token });
    return `/after-buy/raw-file-copy-tool#${fragment.toString()}`;
}

export function receiptAccessFromUrl(url: string): ReceiptAccess | null {
    try {
        const parsed = new URL(url, window.location.origin);
        if (parsed.pathname !== "/after-buy/raw-file-copy-tool" && parsed.pathname !== "/after-buy/raw-file-copy-tool/") return null;
        const fragment = new URLSearchParams(parsed.hash.slice(1));
        const orderId = fragment.get("orderId");
        const token = fragment.get("token");
        return orderId && token && orderIdPattern.test(orderId) && tokenPattern.test(token) ? { orderId, token } : null;
    } catch { return null; }
}

export function captureReceiptAccess(): ReceiptAccess | null {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const orderId = fragment.get("orderId");
    const token = fragment.get("token");
    if (fragment.has("token")) {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
        if (!orderId || !token || !orderIdPattern.test(orderId) || !tokenPattern.test(token)) return null;
        const access = { orderId, token };
        try { saveReceiptAccess(access); } catch { /* The current page can still use the token when storage is unavailable. */ }
        return access;
    }
    const saved = readSessionStorage<ReceiptAccess>(receiptKey);
    return saved && orderIdPattern.test(saved.orderId) && tokenPattern.test(saved.token) ? saved : null;
}

export function readHistorySession(): StoreHistorySession | null {
    const session = readSessionStorage<StoreHistorySession>(sessionKey);
    return session && typeof session.email === "string" && typeof session.token === "string" && Date.parse(session.expiresAt) > Date.now() ? session : null;
}

export function saveHistorySession(session: StoreHistorySession) {
    writeSessionStorage(sessionKey, session);
}

export function clearHistorySession() {
    try { window.sessionStorage.removeItem(sessionKey); } catch { /* The in-memory session is cleared by the caller. */ }
}

export function safeStoreUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" && !parsed.username && !parsed.password ? parsed.href : null;
    } catch {
        return null;
    }
}

export function storeMoney(value: number | null, locale: "id" | "en") {
    return value === null ? (locale === "id" ? "Tidak tersedia" : "Not available") : new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export function storeDate(value: string, locale: "id" | "en") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? (locale === "id" ? "Tidak tersedia" : "Not available") : new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
}
