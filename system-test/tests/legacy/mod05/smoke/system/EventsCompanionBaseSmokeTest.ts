import { expect, type TestType } from '@playwright/test';
import type { EventsCompanionDriver } from '../../../../../src/testkit/driver/port/events-companion-driver.js';

// Playwright's TestType is invariant in its fixture shape, so the helper is generic
// over the concrete fixtures and only requires `eventsCompanionDriver` to be among them.
export function runEventsCompanionBaseSmokeTest<TTestArgs extends { eventsCompanionDriver: EventsCompanionDriver }, TWorkerArgs extends object>(
  test: TestType<TTestArgs, TWorkerArgs>,
): void {
  test('shouldBeAbleToGoToEventsCompanion', async ({ eventsCompanionDriver }) => {
    const result = await eventsCompanionDriver.goToEventsCompanion({});
    expect(result.success).toBe(true);
  });
}
