import { uiTest as test, expect } from '../fixtures.js';

test('shouldBeAbleToGoToEventsCompanion', async ({ eventsCompanionPage, eventsCompanionUiUrl }) => {
    const response = await eventsCompanionPage.goto(eventsCompanionUiUrl);
    expect(response?.status()).toBe(200);
});
