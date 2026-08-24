import { test, expect } from '@playwright/test';
import { getEventsCompanionApiBaseUrl } from '../../base/BaseRawTest.js';

test('shouldBeAbleToGoToEventsCompanion', async () => {
    const response = await fetch(`${getEventsCompanionApiBaseUrl()}/health`);
    expect(response.status).toBe(200);
});
