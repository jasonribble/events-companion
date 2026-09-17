import { test as base } from '@playwright/test';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';
import { loadConfiguration } from '../../../../config/configuration-loader.js';
import type { EventsCompanionDriver } from '../../../../src/testkit/driver/port/events-companion-driver.js';
import type { ErpDriver } from '../../../../src/testkit/driver/port/external/erp/erp-driver.js';
import type { TaxDriver } from '../../../../src/testkit/driver/port/external/tax/tax-driver.js';
import { EventsCompanionApiDriver } from '../../../../src/testkit/driver/adapter/api/events-companion-api-driver.js';
import { EventsCompanionUiDriver } from '../../../../src/testkit/driver/adapter/ui/events-companion-ui-driver.js';
import { ErpRealDriver } from '../../../../src/testkit/driver/adapter/external/erp/erp-real-driver.js';
import { TaxRealDriver } from '../../../../src/testkit/driver/adapter/external/tax/tax-real-driver.js';
import { envOrDefault } from '../../../../src/testkit/common/fallback.js';

process.env.EXTERNAL_SYSTEM_MODE = envOrDefault('EXTERNAL_SYSTEM_MODE', 'real');

const config = loadConfiguration();

// Driver fixtures for API tests
export const apiTest = base.extend<{ eventsCompanionDriver: EventsCompanionDriver; erpDriver: ErpDriver; taxDriver: TaxDriver }>({
    eventsCompanionDriver: async ({}, use) => {
        const driver = new EventsCompanionApiDriver(config.eventsCompanion.backendApiUrl);
        await use(driver);
        await driver.close();
    },
    erpDriver: async ({}, use) => {
        const driver = new ErpRealDriver(config.externalSystems.erp.url);
        await use(driver);
        await driver.close();
    },
    taxDriver: async ({}, use) => {
        const driver = new TaxRealDriver(config.externalSystems.tax.url);
        await use(driver);
        await driver.close();
    },
});

// Driver fixtures for UI tests
export const uiTest = base.extend<{ eventsCompanionDriver: EventsCompanionDriver; erpDriver: ErpDriver; taxDriver: TaxDriver; _eventsCompanionBrowser: Browser }>({
    _eventsCompanionBrowser: async ({}, use) => {
        const browser = await chromium.launch();
        await use(browser);
        await browser.close();
    },
    eventsCompanionDriver: async ({ _eventsCompanionBrowser }, use) => {
        const driver = new EventsCompanionUiDriver(config.eventsCompanion.frontendUrl, _eventsCompanionBrowser);
        await use(driver);
        await driver.close();
    },
    erpDriver: async ({}, use) => {
        const driver = new ErpRealDriver(config.externalSystems.erp.url);
        await use(driver);
        await driver.close();
    },
    taxDriver: async ({}, use) => {
        const driver = new TaxRealDriver(config.externalSystems.tax.url);
        await use(driver);
        await driver.close();
    },
});

export { expect } from '@playwright/test';
