import { apiTest as test, expect } from '../fixtures.js';

test('shouldBeAbleToGoToEventsCompanion', async ({ eventsCompanionApiClient }) => {
    const result = await eventsCompanionApiClient.health().checkHealth();
    expect(result.success).toBe(true);
});
