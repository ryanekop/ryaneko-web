// Run against a local dev server with NEXT_PUBLIC_SOFTWARE_STORE_ENABLED=true
// and NEXT_PUBLIC_SOFTWARE_STORE_API_URL=<base URL>/api/store.
// node scripts/test-software-checkout.mjs /path/to/playwright/index.mjs [base URL]
// Catalog/payment requests are intercepted; no provider or Telegram traffic is sent.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(pathToFileURL(process.argv[2]).href);
const base = process.argv[3] || 'http://127.0.0.1:4317';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = '/tmp/ryaneko-device-os';
await mkdir(output, { recursive: true });
const catalog = {
    enabled: true, packages: [{ count: 1, price: 109000 }, { count: 2, price: 196000 }, { count: 3, price: 278000 }],
    osOptions: ['Windows 11', 'Mac OS Tahoe (26.0+)', 'Android'], sources: ['Website'],
};
const customer = { name: 'Test Buyer', email: 'buyer@example.test', mobile: '081234567890', instagram: 'buyer', os: 'Windows 11', source: 'Website' };
try {
    for (const viewport of [{ width: 1440, height: 1100 }, { width: 390, height: 844 }]) {
        const context = await browser.newContext({ viewport, serviceWorkers: 'block' });
        await context.addInitScript(() => { if (!localStorage.getItem('locale')) localStorage.setItem('locale', 'id'); });
        const requests = [];
        await context.route('**/*', async (route) => {
            const url = new URL(route.request().url());
            if (url.origin !== base) return route.abort();
            if (url.pathname === '/api/store/recent-purchases') return route.fulfill({ json: { purchases: [], refreshAfter: new Date(Date.now() + 3600000).toISOString(), refreshedAt: null } });
            if (url.pathname !== '/api/store') return route.continue();
            if (route.request().method() === 'GET') return route.fulfill({ json: catalog });
            requests.push({ body: route.request().postDataJSON(), token: route.request().headers().authorization });
            if (route.request().postDataJSON().action === 'order') return route.fulfill({ json: {
                id: '00000000-0000-0000-0000-000000000001', kind: 'checkout', productName: 'RAW File Copy Tool',
                count: 2, amount: 196000, status: 'fulfilled', createdAt: new Date().toISOString(),
                os: 'Windows 11', deviceOs: ['Windows 11', 'Mac OS Tahoe (26.0+)'],
                serials: ['TEST-SERIAL-1', 'TEST-SERIAL-2'], downloads: [{ label: 'Windows', url: 'https://example.test/windows' }, { label: 'macOS', url: 'https://example.test/mac' }],
            } });
            return route.fulfill({ status: 503, json: { code: 'payment_unavailable' } });
        });
        const page = await context.newPage();
        const confirm = () => Promise.all([
            page.waitForResponse(response => response.url() === `${base}/api/store` && response.request().method() === 'POST'),
            page.getByRole('button', { name: 'Data sudah benar, lanjut bayar' }).click(),
        ]);
        await page.goto(`${base}/checkout/raw-file-copy-tool`);
        const os = () => page.locator('select[name^="deviceOs-"]');
        const waitCount = async count => { await page.locator(`#store-os-${count - 1}`).waitFor(); assert.equal(await os().count(), count); };
        await waitCount(1);
        await os().first().selectOption('Windows 11');
        await page.locator('input[name="count"][value="2"]').check();
        await waitCount(2);
        assert.equal(await os().nth(0).inputValue(), 'Windows 11');
        assert.equal(await os().nth(1).inputValue(), '');
        for (const [field, value] of Object.entries(customer)) {
            if (field === 'os') continue;
            const input = page.locator(`#store-${field}`);
            if (field === 'source') await input.selectOption(value); else await input.fill(value);
        }
        await page.locator('button[type="submit"]').click();
        assert.equal(await page.locator('dialog[open]').count(), 0, 'empty second OS prevents submission');
        await os().nth(1).selectOption('Mac OS Tahoe (26.0+)');
        await page.locator('input[name="count"][value="3"]').check();
        await waitCount(3);
        assert.equal(await os().nth(1).inputValue(), 'Mac OS Tahoe (26.0+)');
        assert.equal(await os().nth(2).inputValue(), '');
        await os().nth(2).selectOption('Android');
        await page.screenshot({ path: `${output}/checkout-${viewport.width}.png`, fullPage: true, animations: 'disabled' });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
        const checkbox = page.getByRole('checkbox', { name: 'Semua device menggunakan OS yang sama' });
        await checkbox.check();
        assert.equal(await os().count(), 1);
        await os().first().selectOption('Android');
        await page.locator('button[type="submit"]').click();
        await confirm();
        assert.deepEqual(requests.at(-1).body.customer.deviceOs, ['Android', 'Android', 'Android']);
        await checkbox.uncheck();
        await waitCount(3);
        assert.deepEqual(await os().evaluateAll(selects => selects.map(select => select.value)), ['Android', 'Android', 'Android']);
        await page.locator('input[name="count"][value="1"]').check();
        assert.equal(await os().count(), 1);
        await page.locator('input[name="count"][value="3"]').check();
        await waitCount(3);
        assert.deepEqual(await os().evaluateAll(selects => selects.map(select => select.value)), ['Android', '', '']);
        await os().nth(1).selectOption('Windows 11');
        await os().nth(2).selectOption('Mac OS Tahoe (26.0+)');
        await page.locator('button[type="submit"]').click();
        await page.locator('dialog[open]').waitFor();
        assert.ok((await page.locator('dialog').innerText()).includes('Device 3: Mac OS Tahoe (26.0+)'));
        await confirm();
        assert.deepEqual(requests.at(-1).body.customer.deviceOs, ['Android', 'Windows 11', 'Mac OS Tahoe (26.0+)']);
        assert.equal(requests.at(-1).body.customer.os, 'Android');
        await page.reload();
        await waitCount(3);
        assert.deepEqual(await os().evaluateAll(selects => selects.map(select => select.value)), ['Android', 'Windows 11', 'Mac OS Tahoe (26.0+)']);

        // A submitted legacy draft must retry with its original token, without superseding it.
        await page.evaluate(customer => sessionStorage.setItem('raw-file-copy-checkout-draft', JSON.stringify({ customer, count: 2, token: 'a'.repeat(43), submitted: true })), customer);
        await page.reload();
        await waitCount(2);
        assert.deepEqual(await os().evaluateAll(selects => selects.map(select => select.value)), ['Windows 11', 'Windows 11']);
        await page.locator('button[type="submit"]').click();
        await confirm();
        assert.equal(requests.at(-1).token, `Bearer ${'a'.repeat(43)}`);
        assert.equal(requests.at(-1).body.supersedesToken, undefined);
        await os().nth(1).selectOption('Android');
        await page.locator('button[type="submit"]').click();
        await confirm();
        assert.notEqual(requests.at(-1).token, `Bearer ${'a'.repeat(43)}`);
        assert.equal(requests.at(-1).body.supersedesToken, 'a'.repeat(43));
        await page.evaluate(() => localStorage.setItem('locale', 'en'));
        await page.reload();
        await page.getByRole('checkbox', { name: 'All devices use the same OS' }).waitFor();
        assert.ok((await page.locator('label[for="store-os-0"]').innerText()).includes('Operating system'));
        await page.goto(`${base}/after-buy/raw-file-copy-tool#orderId=00000000-0000-0000-0000-000000000001&token=${'a'.repeat(43)}`);
        await page.getByText('Device 2: Mac OS Tahoe (26.0+)').waitFor();
        assert.equal(await page.locator('a[href="https://example.test/windows"]').count(), 1);
        assert.equal(await page.locator('a[href="https://example.test/mac"]').count(), 1);
        await page.screenshot({ path: `${output}/receipt-${viewport.width}.png`, fullPage: true, animations: 'disabled' });
        console.log(`PASS: ${viewport.width}px package changes, required OS, same OS, review, draft recovery, retry tokens, English labels`);
        await context.close();
    }
} finally {
    await browser.close();
}
