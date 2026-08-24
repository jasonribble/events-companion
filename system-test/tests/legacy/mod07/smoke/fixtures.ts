import { test as base } from '@playwright/test';
import { ChannelContext, bindChannels, bindTestEach } from '@optivem/optivem-testing';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';
import { loadConfiguration } from '../../../../config/configuration-loader.js';
import { EventsCompanionApiDriver } from '../../../../src/testkit/driver/adapter/api/events-companion-api-driver.js';
import { EventsCompanionUiDriver } from '../../../../src/testkit/driver/adapter/ui/events-companion-ui-driver.js';
import { ErpRealDriver } from '../../../../src/testkit/driver/adapter/external/erp/erp-real-driver.js';
import { TaxRealDriver } from '../../../../src/testkit/driver/adapter/external/tax/tax-real-driver.js';
import { ClockRealDriver } from '../../../../src/testkit/driver/adapter/external/clock/clock-real-driver.js';
import { AppContext, UseCaseDsl } from '../../../../src/testkit/dsl/scenario-dsl.js';
import { ChannelType } from '../../../../src/testkit/channel/channel-type.js';

const config = loadConfiguration();

const _test = base.extend<{ app: UseCaseDsl; _eventsCompanionBrowser: Browser }>({
    _eventsCompanionBrowser: async ({}, use) => {
        const browser = await chromium.launch();
        await use(browser);
        await browser.close();
    },
    app: async ({ _eventsCompanionBrowser }, use) => {
        const channel = ChannelContext.get() || ChannelType.API;
        const appContext = new AppContext({
            channelMode: 'dynamic',
            channel,
            eventsCompanionDriverFactory: (ch) => {
                if (ch === ChannelType.UI) {
                    return new EventsCompanionUiDriver(config.eventsCompanion.frontendUrl, _eventsCompanionBrowser);
                }
                return new EventsCompanionApiDriver(config.eventsCompanion.backendApiUrl);
            },
            erpDriver: new ErpRealDriver(config.externalSystems.erp.url),
            clockDriver: new ClockRealDriver(),
            taxDriver: new TaxRealDriver(config.externalSystems.tax.url),
        });
        const app = new UseCaseDsl(appContext);
        await use(app);
        await app.close();
    },
});

const test = Object.assign(_test, { each: bindTestEach(_test) });
const { forChannels } = bindChannels(test);
export { test, forChannels };
export { ChannelType } from '../../../../src/testkit/channel/channel-type.js';
export { expect } from '@playwright/test';
