import { test as base } from '@playwright/test';
import { chromium } from 'playwright';
import type { Browser, BrowserContext, Page } from 'playwright';
import { loadConfiguration } from '../../../../config/configuration-loader.js';
import { EventsCompanionApiClient } from '../../../../src/testkit/driver/adapter/api/client/EventsCompanionApiClient.js';
import { ErpRealClient } from '../../../../src/testkit/driver/adapter/external/erp/client/ErpRealClient.js';
import { TaxRealClient } from '../../../../src/testkit/driver/adapter/external/tax/client/TaxRealClient.js';

process.env.EXTERNAL_SYSTEM_MODE = process.env.EXTERNAL_SYSTEM_MODE || 'real';

const config = loadConfiguration();

export const apiTest = base.extend<{ eventsCompanionApiClient: EventsCompanionApiClient; erpClient: ErpRealClient; taxClient: TaxRealClient }>({
    eventsCompanionApiClient: async ({}, use) => {
        await use(new EventsCompanionApiClient(config.eventsCompanion.backendApiUrl));
    },
    erpClient: async ({}, use) => {
        await use(new ErpRealClient(config.externalSystems.erp.url));
    },
    taxClient: async ({}, use) => {
        await use(new TaxRealClient(config.externalSystems.tax.url));
    },
});

export const uiTest = base.extend<{ eventsCompanionPage: Page; eventsCompanionUiUrl: string; _eventsCompanionBrowser: Browser; _eventsCompanionContext: BrowserContext }>({
    eventsCompanionUiUrl: async ({}, use) => {
        await use(config.eventsCompanion.frontendUrl);
    },
    _eventsCompanionBrowser: async ({}, use) => {
        const browser = await chromium.launch();
        await use(browser);
        await browser.close();
    },
    _eventsCompanionContext: async ({ _eventsCompanionBrowser }, use) => {
        const context = await _eventsCompanionBrowser.newContext({ viewport: { width: 1920, height: 1080 } });
        await use(context);
        await context.close();
    },
    eventsCompanionPage: async ({ _eventsCompanionContext }, use) => {
        const page = await _eventsCompanionContext.newPage();
        await use(page);
        await page.close();
    },
});

export { expect } from '@playwright/test';
export { config };
