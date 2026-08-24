import { randomUUID } from 'node:crypto';
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import { loadConfiguration, type TestConfig } from '../../../../config/configuration-loader.js';

export interface EventsCompanionBrowser {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export function getConfiguration(): TestConfig {
  return loadConfiguration();
}

export function getEventsCompanionApiBaseUrl(config: TestConfig = getConfiguration()): string {
  return config.eventsCompanion.backendApiUrl;
}

export function getEventsCompanionUiBaseUrl(config: TestConfig = getConfiguration()): string {
  return config.eventsCompanion.frontendUrl;
}

export function getErpBaseUrl(config: TestConfig = getConfiguration()): string {
  return config.externalSystems.erp.url;
}

export function getTaxBaseUrl(config: TestConfig = getConfiguration()): string {
  return config.externalSystems.tax.url;
}

export function createUniqueSku(baseSku: string): string {
  const suffix = randomUUID().substring(0, 8);
  return `${baseSku}-${suffix}`;
}

export async function setUpEventsCompanionBrowser(): Promise<EventsCompanionBrowser> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  return { browser, context, page };
}

export async function tearDownEventsCompanionBrowser(eventsCompanionBrowser: EventsCompanionBrowser | null): Promise<void> {
  if (!eventsCompanionBrowser) return;
  await eventsCompanionBrowser.page.close().catch(() => {});
  await eventsCompanionBrowser.context.close().catch(() => {});
  await eventsCompanionBrowser.browser.close().catch(() => {});
}
