import { test, expect } from '@playwright/test';
import { getEventsCompanionUiBaseUrl, setUpEventsCompanionBrowser, tearDownEventsCompanionBrowser, type EventsCompanionBrowser } from '../../base/BaseRawTest.js';

test('shouldBeAbleToGoToEventsCompanion', async () => {
    let eventsCompanionBrowser: EventsCompanionBrowser | null = null;
    try {
        eventsCompanionBrowser = await setUpEventsCompanionBrowser();
        const response = await eventsCompanionBrowser.page.goto(getEventsCompanionUiBaseUrl());

        expect(response?.status()).toBe(200);

        const contentType = response?.headers()['content-type'];
        expect(contentType).toBeDefined();
        expect(contentType).toContain('text/html');

        const pageContent = await eventsCompanionBrowser.page.content();
        expect(pageContent).toContain('<html');
        expect(pageContent).toContain('</html>');
    } finally {
        await tearDownEventsCompanionBrowser(eventsCompanionBrowser);
    }
});
