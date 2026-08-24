import { test as base } from '@playwright/test';
import { chromium } from 'playwright';
import type { Browser, BrowserContext, Page } from 'playwright';
import { loadConfiguration, type TestConfig } from '../../../../config/configuration-loader.js';

process.env.EXTERNAL_SYSTEM_MODE = process.env.EXTERNAL_SYSTEM_MODE || 'real';

const config = loadConfiguration();

// Raw HTTP fixtures for API tests
export const apiTest = base.extend<{ config: TestConfig }>({
    config: async ({}, use) => {
        await use(config);
    },
});

// Raw Playwright fixtures for UI tests
export const uiTest = base.extend<{ config: TestConfig; eventsCompanionPage: Page; _eventsCompanionBrowser: Browser; _eventsCompanionContext: BrowserContext }>({
    config: async ({}, use) => {
        await use(config);
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
