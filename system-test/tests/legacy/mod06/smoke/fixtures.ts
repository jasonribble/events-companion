import { test as base } from '@playwright/test';
import { ChannelContext, bindChannels, bindTestEach } from '@optivem/optivem-testing';
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
import { ChannelType } from '../../../../src/testkit/channel/channel-type.js';

process.env.EXTERNAL_SYSTEM_MODE = process.env.EXTERNAL_SYSTEM_MODE || 'real';

const config = loadConfiguration();

const _test = base.extend<{ eventsCompanionDriver: EventsCompanionDriver; erpDriver: ErpDriver; taxDriver: TaxDriver; _eventsCompanionBrowser: Browser }>({
    _eventsCompanionBrowser: async ({}, use) => {
        const browser = await chromium.launch();
        await use(browser);
        await browser.close();
    },
    eventsCompanionDriver: async ({ _eventsCompanionBrowser }, use) => {
        const channel = ChannelContext.get() || ChannelType.API;
        let driver: EventsCompanionDriver;
        if (channel === ChannelType.UI) {
            driver = new EventsCompanionUiDriver(config.eventsCompanion.frontendUrl, _eventsCompanionBrowser);
        } else {
            driver = new EventsCompanionApiDriver(config.eventsCompanion.backendApiUrl);
        }
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

const test = Object.assign(_test, { each: bindTestEach(_test) });
const { forChannels } = bindChannels(test);
export { test, forChannels };
export { ChannelType } from '../../../../src/testkit/channel/channel-type.js';
export { expect } from '@playwright/test';
