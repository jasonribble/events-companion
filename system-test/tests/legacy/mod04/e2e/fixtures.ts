import { test as base } from '@playwright/test';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';
import { loadConfiguration } from '../../../../config/configuration-loader.js';
import { EventsCompanionApiClient } from '../../../../src/testkit/driver/adapter/api/client/EventsCompanionApiClient.js';
import { EventsCompanionUiClient } from '../../../../src/testkit/driver/adapter/ui/client/EventsCompanionUiClient.js';
import { ErpRealClient } from '../../../../src/testkit/driver/adapter/external/erp/client/ErpRealClient.js';

process.env.EXTERNAL_SYSTEM_MODE = process.env.EXTERNAL_SYSTEM_MODE ?? 'real';

const config = loadConfiguration();

// Client fixtures for API tests
export const apiTest = base.extend<{ eventsCompanionApiClient: EventsCompanionApiClient; erpClient: ErpRealClient }>({
    eventsCompanionApiClient: async ({}, use) => {
        await use(new EventsCompanionApiClient(config.eventsCompanion.backendApiUrl));
    },
    erpClient: async ({}, use) => {
        await use(new ErpRealClient(config.externalSystems.erp.url));
    },
});

// Client fixtures for UI tests
export const uiTest = base.extend<{ eventsCompanionUiClient: EventsCompanionUiClient; _eventsCompanionBrowser: Browser; erpClient: ErpRealClient }>({
    _eventsCompanionBrowser: async ({}, use) => {
        const browser = await chromium.launch();
        await use(browser);
        await browser.close();
    },
    eventsCompanionUiClient: async ({ _eventsCompanionBrowser }, use) => {
        const client = new EventsCompanionUiClient(config.eventsCompanion.frontendUrl, _eventsCompanionBrowser);
        await use(client);
        await client.close();
    },
    erpClient: async ({}, use) => {
        await use(new ErpRealClient(config.externalSystems.erp.url));
    },
});

export { expect } from '@playwright/test';
export { config };
